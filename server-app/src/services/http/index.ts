type HttpClient<T> = {
    GET: (url: string) => Promise<T>,
    POST: (url: string, body: any) => Promise<T>,
    PUT: (url: string, body: any) => Promise<T>,
    DELETE: (url: string) => Promise<T>,
    // More things like.... set headers and such
}

const failurePossibility = 0.75 // 75% chance of failure
const randomDelay = () => Math.floor(Math.random() * 1000) // random delay between 0 and 1000 ms

const fakeHttpProcess = async <T>(url: string, fakeResult: T) => {
    return new Promise<T>((resolve, reject) => {
        setTimeout(() => {
            if(Math.random() < failurePossibility) {
                reject(0)
            } else {
                resolve(fakeResult || 1 as T)
            }
        }, randomDelay())
    }
)}

// fake HTTP client that might randomly fail
const getHttpClient = <T>(): HttpClient<T> => ({
    POST: async (url: string, body: T) => {
        return fakeHttpProcess<T>(url, body)
    }
} as HttpClient<T>)

export default getHttpClient