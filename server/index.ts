
import express, { Express, NextFunction, Request, Response } from 'express'
import session from 'express-session'
import path from 'path'
import cors from 'cors'
import { Server } from 'socket.io'

const port = 8080

const app: Express = express()

app.use(cors())
app.use(express.static(path.join(__dirname, '..')))
const sessionMiddleware = session({
  secret: 'changeit',
  resave: false,
  saveUninitialized: true,
})

app.use(sessionMiddleware)

app.get('/*', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'))
})

const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})

const io = new Server(server, {
  cors: {
    // todo добавить развилку:
    // origin в проде будет отличася от локалхоста
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
})

io.engine.use(sessionMiddleware)

const users: Record<string, string> = {}

const rooms: Record<string, string[]> = {}

io.on('connection', (socket) => {

  socket.on('mynameis', ({ name }: {name: string}) => {
    users[socket.request.session.id] = name
  })


  socket.on('join', ({ roomName }: {roomName: string}) => {
    const name = users[socket.request.session.id] || 'anonymous'
    if(rooms[roomName]) {
      socket.broadcast.in(roomName).emit('new_member', { name })
    }

    socket.join(roomName)
  })

  socket.on('create_room', ({ roomName }: {roomName:string}) => {
    if(rooms[roomName]) {
      socket.to(socket.id).emit('create_room', { error: 'Room already exists' })
      return
    }

    rooms[roomName] = [socket.request.session.id]
    socket.join(roomName)
  })
})
