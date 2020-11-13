import { v4 as uuid } from "uuid"

import { CreateJobRequest, CreateJobResponse } from "./model/job";

export async function createJob(createJobRequest: CreateJobRequest): Promise<CreateJobResponse> {
    // persist job
    return new CreateJobResponse(uuid())
}