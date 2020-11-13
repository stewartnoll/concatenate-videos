import { v4 as uuid } from "uuid"

import { CreateJobRequest, CreateJobResponse, Job, Status } from "./model/job";
import { saveJob } from "../repository/jobRepository"

export async function createJob(createJobRequest: CreateJobRequest): Promise<CreateJobResponse> {
    const job: Job = new Job(uuid(), createJobRequest.sourceVideoUrls, createJobRequest.destination, Status.pending)
    await saveJob(job)
    return new CreateJobResponse(job.id)
}