import got from "got"
import { createWriteStream, existsSync, mkdirSync } from "fs"
import ffmpeg from "fluent-ffmpeg"
import { Job } from "./model/job"

// borrowed code, started with answers here, https://stackoverflow.com/questions/46752428/do-i-need-await-fs-createwritestream-in-pipe-method-in-node
function writeFile(url: string, destinationFile: string) {
    return new Promise<void>(resolve => {
        const writeStream = got.stream(url).pipe(createWriteStream(destinationFile))
        writeStream.on('finish', resolve)
    })
}

function jobDirectory(job: Job): string {
    return `${job.destination.directory}/${job.id}`
}

async function downloadVideos(job: Job): Promise<string[]> {
    const jobDir = jobDirectory(job)
    if (!existsSync(jobDir)){
        mkdirSync(jobDir, { recursive: true});
    }
    let fileIndex = 0
    const filePaths:string[] = []
    await Promise.all(job.sourceVideoUrls.map(url => {
        const filePath = `${jobDir}/${fileIndex++}.mp4`
        filePaths.push(filePath)
        writeFile(url, filePath)
    }))
    return filePaths
}

function mergeFiles(job: Job, filePaths: string[]) {
    return new Promise<void>((resolve, reject) => {
        // merge videos (https://www.npmjs.com/package/fluent-ffmpeg#mergetofilefilename-tmpdir-concatenate-multiple-inputs)
        let command = ffmpeg(filePaths[0])
        filePaths.slice(1).forEach(filePath => {
            command = command.input(filePath)
        })
        command
            .on('error', function(err) {
                console.log('An error occurred: ' + err.message);
                reject(err)
            })
            .on('end', function() {
                console.log('Merging finished !');
                resolve()
            })
            .mergeToFile(`${jobDirectory(job)}/merged.mp4`);
    })
}

// would be much better to have an event driven approach where download 
// and merge are seperated out into retriable units of work
// ideally download would be decomposed further as well
export async function processVideos(job: Job) {
        // download videos
        const filePaths = await downloadVideos(job)
        console.log(`downloaded ${job.sourceVideoUrls.length} files`)
    
        // merge files
        await mergeFiles(job, filePaths)
}