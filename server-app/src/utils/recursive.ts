// Exponential-is backoff retry function decorator
export const logarithmicRetry = async <T>(fn: (attempt: number) => Promise<T>, maxRetries = 3, multiplier = 5) => {
    return new Promise<T>(async (resolve, reject) => {
        const retry = async (attempt: number) => {
            try {
                const result = await fn(attempt)
                resolve(result)
            } catch (error) {
                if (attempt > maxRetries) {
                    reject(error)
                } else {
                    await new Promise((resolve) => setTimeout(resolve, (attempt + 1) * multiplier))
                    retry(attempt + 1)
                }
            }
        }

        try {
            return retry(0)
        } catch (error) {
            reject('Max retries reached')
        }
    })
}