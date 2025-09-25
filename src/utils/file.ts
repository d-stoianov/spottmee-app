export const dataURLtoFile = (dataUrl: string, filename: string): File => {
    const arr = dataUrl.split(',')
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png'
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
}

export const downloadFileFromURL = async (
    fileUrl: string,
    fileName: string
) => {
    try {
        const response = await fetch(fileUrl)
        const blob = await response.blob()

        const url = window.URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url

        link.download = fileName

        document.body.appendChild(link)
        link.click()

        link.remove()
        window.URL.revokeObjectURL(url)
    } catch (error) {
        console.error('Failed to download file:', error)
    }
}
