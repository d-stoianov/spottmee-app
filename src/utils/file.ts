import JSZip from 'jszip'

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

export const downloadFilesIntoZip = async (
    files: { url: string; name: string }[]
) => {
    const zip = new JSZip()
    const folder = zip.folder('photos') // optional folder

    // fetch all photos and add to zip
    await Promise.all(
        files.map(async (file) => {
            try {
                const response = await fetch(file.url)
                if (!response.ok) throw new Error('Failed to fetch photo')
                const blob = await response.blob()
                folder?.file(file.name, blob)
            } catch (err) {
                console.error('Error fetching file', file.name, err)
            }
        })
    )

    // generate ZIP as blob
    const content = await zip.generateAsync({ type: 'blob' })

    // create a temporary download link
    const url = URL.createObjectURL(content)
    const a = document.createElement('a')
    a.href = url
    a.download = 'photos.zip'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}
