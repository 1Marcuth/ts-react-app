export type FormatFileSizeOptions = {
    fileSizeInBytes: number
}

function formatFileSize({
    fileSizeInBytes
}: FormatFileSizeOptions): string {
    const kb = 1024
    const mb = kb * 1024
    const gb = mb * 1024

    if (fileSizeInBytes < kb) {
        return fileSizeInBytes + " Bytes"
    } else if (fileSizeInBytes < mb) {
        return (fileSizeInBytes / kb).toFixed(2) + " KB"
    } else if (fileSizeInBytes < gb) {
        return (fileSizeInBytes / mb).toFixed(2) + " MB"
    } else {
        return (fileSizeInBytes / gb).toFixed(2) + " GB"
    }
}

export default formatFileSize