import getFileExtension from "./get-file-extension"
import formatFileSize from "./format-file-size"

export type OpenFileOptions = {
    types: string[]
    maxSizeInBytes?: number
    minSizeInBytes?: number
    closedWindowCheckDelay?: number
}

type Resolve = (value: any) => any
type Reject = (error: any) => any

type HandleFileChangeOptions = {
    event: Event
    types: string[]
    resolve: Resolve
    reject: Reject
    maxSizeInBytes?: number
    minSizeInBytes?: number
}

export class NoFileSelectedError extends Error {
    constructor($fileInput: HTMLInputElement) {
        super(`No File Selected: ${JSON.stringify($fileInput)}`)
    }
}

export class InvalidFileTypeError extends Error {
    public constructor(requiredTypes: string[], receivedType: string) {
        super(`Invalid File Type Selected! Requires: "${requiredTypes.join(", ")}" but received: "${receivedType}`)
    }
}

export class FileTooSmallError extends Error {
    public constructor(minSizeInBytes: number, fileSizeInBytes: number) {
        const formattedFileMinSize = formatFileSize({ fileSizeInBytes: minSizeInBytes })
        const formattedFileSize = formatFileSize({ fileSizeInBytes: fileSizeInBytes })
        super(`File is too small - should be at least ${formattedFileMinSize} but was only ${formattedFileSize}`)
    }
}

export class FileTooLargeError extends Error {
    public constructor(maxSizeInBytes: number, fileSizeInBytes: number) {
        const formattedFileMaxSize = formatFileSize({ fileSizeInBytes: maxSizeInBytes })
        const formattedFileSize = formatFileSize({ fileSizeInBytes: fileSizeInBytes })
        super(`File is too large! Maximum allowed size is ${formattedFileMaxSize}, but the provided file size is ${formattedFileSize}.`)
    }
}

export class UserClosedWindowError extends Error {
    constructor() {
        super("User closed file selection window without selecting a file.")
    }
}

function handleFileChange({
    event,
    minSizeInBytes,
    maxSizeInBytes,
    types,
    resolve,
    reject,
}: HandleFileChangeOptions) {
    const $fileInput = event.target as HTMLInputElement

    if (!$fileInput.files || $fileInput.files.length === 0) {
        return reject(
            new NoFileSelectedError($fileInput)
        )
    }

    const file = $fileInput.files[0]

    let isValidFileType = false

    for (const type of types) {
        if (file.type.startsWith(type.split("/")[0]) || file.name.endsWith(type)) {
            isValidFileType = true
        }
    }

    if (!isValidFileType) {
        const fileExtension = getFileExtension({ fileName: file.name })
        return reject(
            new InvalidFileTypeError(types, fileExtension)
        )
    }

    if (minSizeInBytes) {
        if (file.size < minSizeInBytes) {
            return reject(
                new FileTooSmallError(file.size, minSizeInBytes)
            )
        }
    }

    if (maxSizeInBytes) {
        if (file.size > maxSizeInBytes) {
            return reject(
                new FileTooLargeError(file.size, maxSizeInBytes)
            )
        }
    }

    $fileInput.remove()

    return resolve(file)
}

const defaultOptions = {
    types: [ "*" ],
    closedWindowCheckDelay: 10000
}

function openFile({
    types,
    maxSizeInBytes,
    minSizeInBytes,
    closedWindowCheckDelay = defaultOptions.closedWindowCheckDelay
}: OpenFileOptions = defaultOptions): Promise<File> {
    return new Promise((resolve, reject) => {
        function cleanup() {
            isFileInputRemoved = true
            $fileInput.removeEventListener("change", handleFileSelection)
            $fileInput.remove()
        }

        function handleFileSelection(event: Event) {
            if (!isFileInputRemoved) {
                handleFileChange({
                    event: event,
                    types: types,
                    minSizeInBytes: minSizeInBytes,
                    maxSizeInBytes: maxSizeInBytes,
                    resolve: resolve,
                    reject: reject
                })
            }

            cleanup()
        }

        const $fileInput = document.createElement("input")
        let isFileInputRemoved = false

        $fileInput.type = "file"
        $fileInput.accept = types.join(",")

        setTimeout(() => {
            if (!isFileInputRemoved) {
                cleanup()

                return reject(
                    new UserClosedWindowError()
                )
            }
        }, closedWindowCheckDelay)

        $fileInput.addEventListener("change", handleFileSelection)
        $fileInput.click()
    })
}

export default openFile