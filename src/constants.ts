
const isDev = process.env.NODE_ENV !== 'production'
export const apiBaseUrl = isDev ? 'http://localhost:8080' : '/'
