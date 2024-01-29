export type SaveFileOptions = {
    content: string
    fileName: string
    mediaType?: string
}

export class DownloadInterruptedError extends Error {
    public constructor(fileName: string, mediaType: string) {
        super(`Download of ${mediaType}/${fileName} was interrupted!`)
    }
}

const defaultOptions = {
    mediaType: "text/plain"
}

function saveFile({
    content,
    fileName,
    mediaType = defaultOptions.mediaType
}: SaveFileOptions) {
    return new Promise((resolve, reject) => {
        const blob = new Blob([content], { type: mediaType })
        const $link = document.createElement("a")
        const urlData = window.URL.createObjectURL(blob)

        $link.href = urlData
        $link.download = fileName

        $link.addEventListener("click", () => {
            setTimeout(() => {
                URL.revokeObjectURL(urlData)
                $link.remove()
                return resolve(null)
            }, 0)
        })

        $link.click()

        let mouseUpFired = false

        document.body.addEventListener("mouseup", () => {
            mouseUpFired = true
        })

        setTimeout(() => {
            if (!mouseUpFired) {
                URL.revokeObjectURL(urlData)
                $link.remove()

                return reject(
                    new DownloadInterruptedError(fileName, mediaType)
                )
            }
        }, 1500)
    })
}

export default saveFile