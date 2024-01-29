export type CreateImageOptions = {
    source: string
}

type Resolve = (value: any) => any
type Reject = (error: any) => any

type HandleImageLoadOptions = {
    image: HTMLImageElement
    resolve: Resolve
}

type HandleImageErrorOptions = {
    source: string
    event: Event | string
    reject: Reject
}

export class ImageLoadError extends Error {
    constructor(source: string, event: Event | string) {
        super(`Failed to load image at ${source}: ${event}`)
        this.name = "ImageLoadError"
    }
}

function handleImageLoad({
    image,
    resolve
}: HandleImageLoadOptions): void {
    return resolve(image)
}

function handleImageError({
    source,
    event,
    reject
}: HandleImageErrorOptions): void {
    return reject(
        new ImageLoadError(source, event)
    )
}

function createImage({
    source
}: CreateImageOptions): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image()

        image.src = source

        image.onload = () => {
            return handleImageLoad({
                image: image,
                resolve: resolve
            })
        }
        
        image.onerror = (event) => {
            return handleImageError({
                source: source,
                event: event,
                reject: reject,
            })
        }
    })
}

export default createImage