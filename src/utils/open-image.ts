import fileToDataUrl from "./file-to-data-url"
import createImage from "./create-image"
import openFile from "./open-file"

type ImageSize = {
    width: number
    height: number
}

export type OpenImageOptions = {
    acceptedExtensions?: string[]
    maxSize?: ImageSize
    minSize?: ImageSize
    minFileSizeInBytes?: number
    maxFileSizeInBytes?: number
    closedWindowCheckDelay?: number
}

export class ImageTooSmallError extends Error {
    constructor(minSize: ImageSize) {
        super(`The selected image is too small. The minimum size allowed is ${minSize.width}x${minSize.height}.`)
    }
}

export class ImageTooLargeError extends Error {
    constructor(maxSize: ImageSize) {
        super(`The selected image is too large. The maximum size allowed is ${maxSize.width}x${maxSize.height}.`)
    }
}

const defaultOptions = {
    acceptedExtensions: [ "image/*" ]
}

async function openImage({
    acceptedExtensions = [ "image/*" ],
    maxSize,
    minSize,
    minFileSizeInBytes,
    maxFileSizeInBytes,
    closedWindowCheckDelay
} : OpenImageOptions = defaultOptions): Promise<HTMLImageElement> {
    const file = await openFile({
        types: acceptedExtensions,
        maxSizeInBytes: maxFileSizeInBytes,
        minSizeInBytes: minFileSizeInBytes,
        closedWindowCheckDelay: closedWindowCheckDelay
    })

    const fileDataUrl = await fileToDataUrl({ file: file })

    const image = await createImage({ source: fileDataUrl })

    if (minSize) {
        if (image.width < minSize.width || image.height < minSize.height) {
            throw new ImageTooSmallError(minSize)
        }
    }

    if (maxSize) {
        if (image.width > maxSize.width || image.height > maxSize.height) {
            throw new ImageTooLargeError(maxSize)
        }
    }

    return image
}

export default openImage