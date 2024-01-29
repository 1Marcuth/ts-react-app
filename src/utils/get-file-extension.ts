export type GetFileExtensionOptions = {
    fileName: string
}

class FileExtensionNotFoundError extends Error {
    public constructor(fileName: string) {
        super(`The file "${fileName}" does not have an extension.`)
    }
}

function getFileExtension({
    fileName
}: GetFileExtensionOptions): string {
    const match = fileName.match(/\.([^.]+)$/)

    if (!match) {
        throw new FileExtensionNotFoundError(fileName)
    }
    
    const fileExtension = match[1]

    return fileExtension
}

export default getFileExtension