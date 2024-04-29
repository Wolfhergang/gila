// fake queue service with a singleton
const queues: Record<string, Queue<any>> = {}

type Queue<T> = {
    content: unknown[]
    resolver: (payload: T) => void
}

export const addToQueue = async (queueId: string, object: unknown) => {
    // add to queue
    if(!queues[queueId]) throw new Error('Queue not found')

    queues[queueId].content.push(object)

    return true
}

export const popFromQueue = async (queueId: string): Promise<unknown> => {
    // remove from queue
    if(!queues[queueId]) throw new Error('Queue not found')

    return queues[queueId].content.shift()
}

export const getQueue = async <T>(queueId: string, resolver: (payload: T) => void): Promise<Queue<T>> => {
    const queue = queues[queueId]
    
    if(queue) return queue
    
    queues[queueId] = {
        content: [],
        resolver
    }

    return queues[queueId]
}

export const processQueues = async () => {
    for(const queueId in queues) {
        const queue = queues[queueId]

        while(queue.content.length) {
            const payload = queue.content.shift()

            await queue.resolver(payload)
        }
    }
}