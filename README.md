# Concatenate Videos

#### Running the application


#### API Call Flow
POST /jobs
{
    sourceVideoUrls: ["", ""]
    destination: {
        filePath: ""
    }
}
returns
{
    "id": "<job id>"
    "status": "<url to status of job>"
}

GET /job/{jobId}/status
returns
{
    status: "pending"
}

### borrowed code
in-process loop borrowed from here: https://stackoverflow.com/questions/36904430/how-to-have-my-nodejs-app-run-in-a-loop-for-ever