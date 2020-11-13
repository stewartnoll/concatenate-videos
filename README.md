# Concatenate Videos

#### Running the application


#### API Call Flow

POST /job
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