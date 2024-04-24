import fs from 'fs'

export const writeToFile = async (path: string, data: string) => {
    return new Promise((resolve, reject) => {
        fs.writeFile
        (path, data, (err) => {
            if (err) reject(err)
            resolve(true)
        })
    }
    )
}

export const readFromFile = async (path: string) => {
    return new Promise((resolve, reject
    ) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) reject(err)
            resolve(data)
        }
        )
    }
    )
}

export const appendToFile = async (path: string, data: string) => {
    return new Promise((resolve, reject) => {
        fs.appendFile(path, data, (err) => {
            if (err) reject(err)
            resolve(true)
        })
    }
    )
}

export const prependToFile = async (path: string, data: string) => {
    const fileContent = await readFromFile(path)

    await writeToFile(path, data + fileContent)

    return true
}