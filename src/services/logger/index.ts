// We can .... and probably should use this to log to a service like Sentry or LogRocket, maybe datadog?
const logger = {
    log: (message: string, ...rest: unknown[]) => {
        console.log(message, ...rest);
    },
    error: (message: string, ...rest: unknown[]) => {
        console.error(message, ...rest);
    },
    info: (message: string, ...rest: unknown[]) => {
        console.info(message, ...rest);
    },
    warn: (message: string, ...rest: unknown[]) => {
        console.warn(message, ...rest);
    }
}

export default logger;