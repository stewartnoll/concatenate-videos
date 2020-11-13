import { v4 as uuid } from "uuid"
import got from "got"
import { createWriteStream, existsSync, mkdirSync } from "fs"

import { CreateJobRequest, CreateJobResponse, GetJobStatusResponse, Job, Status } from "./model/job";
import { saveJob, getJob, getNextPendingJob, updateStatus } from "../repository/jobRepository"

export async function createJob(createJobRequest: CreateJobRequest): Promise<CreateJobResponse> {
    const job: Job = new Job(uuid(), createJobRequest.sourceVideoUrls, createJobRequest.destination, Status.pending)
    await saveJob(job)
    return new CreateJobResponse(job.id)
}

export async function getStatus(id: string): Promise<GetJobStatusResponse> {
    const job = await getJob(id)
    if (!job) {
        // todo improve error handling
        throw new Error(`job ${id} is not found`)
    }
    return new GetJobStatusResponse(Status[job.status])
}

// borrowed code, started with answers here, https://stackoverflow.com/questions/46752428/do-i-need-await-fs-createwritestream-in-pipe-method-in-node
function writeFile(url: string, destinationFile: string) {
    return new Promise<void>(resolve => {
        const writeStream = got.stream(url).pipe(createWriteStream(destinationFile))
        writeStream.on('finish', resolve)
    })
}

async function downloadVideos(job: Job) {
    const jobDirectory = `${job.destination.directory}/${job.id}`
    if (!existsSync(jobDirectory)){
        mkdirSync(jobDirectory, { recursive: true});
    }
    let fileIndex = 0
    await Promise.all(job.sourceVideoUrls.map(url => 
        writeFile(url, `${jobDirectory}/${fileIndex++}.mp4`)))
}

export async function processNextJob() {
    // todo: would need this to be transactional
    const job = await getNextPendingJob()
    if (!job) {
        console.log('no jobs to process')
        return
    }
    console.log(`processing job ${job.id}`)
    await updateStatus(job.id, Status.inProgress)

    // download videos
    await downloadVideos(job)
    console.log(`downloaded ${job.sourceVideoUrls.length} files`)

    // merge videos
    // persist

    // await updateStatus(job.id, Status.done)
}