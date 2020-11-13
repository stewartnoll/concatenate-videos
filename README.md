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