import { Session, SessionOptions } from 'express-session'
import { IncomingMessage, ServerResponse } from 'http'

declare module 'http' {
    interface IncomingMessage {
        session: Session & {
            authenticated: boolean
        }
    }
}

declare type Middleware = (req: IncomingMessage, res: ServerResponse, next: () => void) => void;

declare module 'express-session' {
  const content: (options: SessionOptions) => Middleware
  export default content
}
