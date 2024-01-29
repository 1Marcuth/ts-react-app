export type FileToDataUrlOptions = {
    file: File
}

type Resolve = (value: any) => any
type Reject = (error: any) => any

type HandleFileReaderLoadOptions = {
    event: ProgressEvent<FileReader>
    resolve: Resolve
    reject: Reject
}

type HandleFileReaderErrorOptions = {
    event: ProgressEvent<FileReader>
    reject: Reject
}

export class TargetNotFoundError extends Error {
    constructor(event: Event) {
        super("Not found target of event: " + JSON.stringify(event))
        this.name = "TargetNotFoundError"
    }
}

export class FileDataNotFoundError extends Error {
    constructor(event: Event) {
        super("Not found data of event: " + JSON.stringify(event))
        this.name = "DataNotFoundError"
    }
}

function handleFileReaderLoad({
    event,
    resolve,
    reject
}: HandleFileReaderLoadOptions) {
    const target = event.target

    if (!target) {
        return reject(
            new TargetNotFoundError(event)
        )
    }

    const data = event.target.result

    if (!data) {
        return reject(
            new FileDataNotFoundError(event)
        )
    }

    return resolve(data as string)
}

function handleFileReaderError({
    event,
    reject
}: HandleFileReaderErrorOptions) {
    if (event.target?.error) {
        return reject(event.target.error)
    } else {
        return reject(
            new Error("Unknown FileReader error occurred.")
        )
    }
}

function fileToDataUrl({ file }: FileToDataUrlOptions): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = (event) => {
            return handleFileReaderLoad({
                event: event,
                resolve: resolve,
                reject: reject
            })
        }

        reader.onerror = (event) => {
            return handleFileReaderError({
                event: event,
                reject: reject
            })
        }

        reader.readAsDataURL(file)
    })
}

export default fileToDataUrl