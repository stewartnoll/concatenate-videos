import { Request, Response } from 'express'

import { CreateJobRequest } from "../domain/model/job";
import * as jobService from '../domain/jobService'

// todo: auth attribution
export async function createJob(req: Request, res: Response) {
    // todo: API model validation
    // todo: error handling
    const createJobRequest: CreateJobRequest = req.body
    const respone = await jobService.createJob(createJobRequest)
    res.status(201).send({
        id: respone.id,
        status: `/jobs/${respone.id}/status`
    })
}

export async function getStatus(req: Request, res: Response) {
    // todo: error handling
    const jobId = req.params.id
    const jobStatusResponse = await jobService.getStatus(jobId)
    res.status(200).send(jobStatusResponse)
}