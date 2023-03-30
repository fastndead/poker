
import express, { Express, NextFunction, Request, Response } from 'express'
import session from 'express-session'
import path from 'path'
import cors from 'cors'
import { Server, Socket } from 'socket.io'

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

export type Card = {
  isRevealed: boolean,
  value?: string,
}

export type Player = {
  id: string,
  card: Card
  name: string,
}

const users: Record<string, Player> = {}

const rooms: Record<string, {[key: string]: Player}> = {}

const DEFAULT_CARD = {
  isRevealed: false,
}

const createNewUser = (name: string, id: string) => {
  users[id] = {
    id: id,
    card: DEFAULT_CARD,
    name: name,
  }

  return users[id]
}

const createRoom = (name:string): {[key: string]: Player} => {
  if (!rooms[name]) {
    rooms[name] = {}
  }
  return rooms[name]
}

io.on('connection', (socket) => {

  socket.on('mynameis', ({ name }: {name: string}) => {
    createNewUser(name || 'anon', socket.request.session.id)
  })


  socket.on('join', ({ roomName }: {roomName: string}) => {
    const sessionId = socket.request.session.id
    if (!users[sessionId]) {
      createNewUser('anon', sessionId)
    }

    const room = createRoom(roomName)
    room[sessionId] = users[sessionId]

    socket.join(roomName)
    const serializedRoom = Object.keys(room).filter((key) => key !== sessionId).map((key) => room[key])
    socket.emit('initial_state', { players: [...serializedRoom] })


    socket.broadcast.to(roomName).emit('new_player', { player: users[sessionId] })
  })

  socket.on('vote', ({ voteValue }: {voteValue: string}) => {
    const sessionId = socket.request.session.id
    socket.rooms.forEach((roomName) => {
      if (rooms[roomName]) {
        rooms[roomName][sessionId].card.value = voteValue
      }
      socket.broadcast.to(roomName).emit('player_voted', { value: voteValue, playerId: sessionId })
    })

  })

  socket.on('disconnecting', (reason) => {
    const sessionId = socket.request.session.id
    if (users[sessionId]) {
      socket.rooms.forEach((roomName) => {
        if (rooms[roomName]){
          delete rooms[roomName][sessionId]

          socket.broadcast.to(roomName).emit('player_disconnect', { playerId: sessionId })
        }
      })
    }
  })
})
