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

GET /job/{jobId}/status
{
    status: "pending"
}