import { Job } from "../domain/model/job";

// todo: move to actual database
const jobs: Job[] = []

export function saveJob(job: Job) {
    jobs.push(job)
}