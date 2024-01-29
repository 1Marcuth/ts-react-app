export type SaveImageOptions = {
    source: string
    fileName: string
}

export class ImageSaveError extends Error {
    constructor(source: string) {
        super(`Failed to fetch image from ${source}`)
    }
}

async function saveImage({
    source,
    fileName
}: SaveImageOptions): Promise<void> {
    const response = await fetch(source)

    if (!response.ok) {
        throw new ImageSaveError(source)
    }

    const blob = await response.blob()
    const blobUrl = URL.createObjectURL(blob)
    const $link = document.createElement("a")

    $link.href = blobUrl
    $link.download = fileName
    $link.click()
    $link.remove()

    URL.revokeObjectURL(blobUrl)
}

export default saveImage