export class Destination {
    constructor(public fileUrl: string) { }
}

export class CreateJobRequest {
    constructor(public sourceVideoUrls:string[], public destination: Destination) { }
}

export class CreateJobResponse {
    constructor(public id: string) {}
}