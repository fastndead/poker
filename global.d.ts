import { Session, SessionOptions } from 'express-session'

declare module '*.svg' {
  const content: string
  export default  content
}

declare module 'http' {
    interface IncomingMessage {
        session: Session & {
            authenticated: boolean
        }
    }
}

declare type Middleware = (req: IncomingMessage, res: ServerResponse, next: () => void) => void;

declare module 'express-session' {
  export default (options: SessionOptions) => Middleware
}

