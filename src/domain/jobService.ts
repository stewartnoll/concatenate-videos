import { v4 as uuid } from "uuid"

import { CreateJobRequest, CreateJobResponse, GetJobStatusResponse, Job, Status } from "./model/job";
import { saveJob, getJob } from "../repository/jobRepository"

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