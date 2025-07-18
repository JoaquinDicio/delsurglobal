const uploadsService = {

    uploadImage: async (file) => {
        const preset = "del_sur_global"

        const name = "dqfentswp"

        const url = `https://api.cloudinary.com/v1_1/${name}/upload`;

        const fd = new FormData()
        fd.append('file', file)
        fd.append('upload_preset', preset)

        try {

            const response = await fetch(url, { method: 'POST', body: fd })

            const data = await response.json()

            console.log('Imagen subida:', data.url)

            return data.url

        } catch (error) {

            console.log('Error subiedo la imagen:', error)

            throw new Error('Error subiendo la imagen')

        }
    }
}

export default uploadsService