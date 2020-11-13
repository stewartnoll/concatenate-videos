import { Request, Response } from 'express'

import { CreateJobRequest } from "../domain/model/job";
import * as jobService from '../domain/jobService'

// todo: auth attribution
export async function createJob(req: Request, res: Response) {
    // todo: API model validation
    const createJobRequest: CreateJobRequest = req.body
    const respone = await jobService.createJob(createJobRequest)
    res.status(201).send({
        id: respone.id,
        status: `/job/${respone.id}/status`
    })
}