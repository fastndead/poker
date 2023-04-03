
import express, { Express, NextFunction, Request, Response } from 'express'
import session from 'express-session'
import path from 'path'
import cors from 'cors'
import { Server, Socket } from 'socket.io'

const isDev = process.env.NODE_ENV !== 'production'
const port = 8080

const app: Express = express()

const users: Record<string, Player> = {}

const rooms: Record<string, {[key: string]: Player}> = {}

const createNewUser = (name: string, id: string) => {
  users[id] = {
    id: id,
    value: null,
    name: name,
  }

  return users[id]
}

const createRoom = (name:string) => {
  rooms[name] = {}
}

app.use(cors(
  {
    // todo добавить развилку:
    // origin в проде будет отличася от локалхоста
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
))
app.use(express.static(path.join(__dirname, '..')))
const sessionMiddleware = session({
  secret: 'changeit',
  resave: false,
  saveUninitialized: true,
})

app.use(sessionMiddleware)
app.use(express.json()) 
app.get('/*', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'))
})

app.post('/mynameis', (req: Request, res: Response) => {
  const name = req.body.name
  const sessionId = req.session.id

  createNewUser(name, sessionId)

  res.send(200)
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
  value?: string,
}

export type Player = {
  id: string,
  value: string | null 
  name: string,
}

io.on('connection', (socket) => {
  const sessionId = socket.request.session.id

  
  socket.on('mynameis', ({ name }: {name: string}) => {
    createNewUser(name, sessionId)
    socket.emit('mynameis', { name })
  })

  socket.on('reveal', () => {
    socket.rooms.forEach((roomName) => {
      if (rooms[roomName]) {
        socket.broadcast.to(roomName).emit('reveal')
      }
    })
  })


  socket.on('join', ({ roomName }: {roomName: string}) => {
    if (!users[sessionId]) {
      createNewUser('anon', sessionId)
    }

    if (!rooms[roomName]) {
      createRoom(roomName)
    }
    const room = rooms[roomName] 
    room[sessionId] = users[sessionId]

    socket.join(roomName)
    const serializedRoom = Object.keys(room).filter((key) => key !== sessionId).map((key) => room[key])
    socket.emit('initial_state', { players: [...serializedRoom] })

    socket.broadcast.to(roomName).emit('new_player', { player: users[sessionId] })
  })

  socket.on('vote', ({ voteValue }: {voteValue: string}) => {
    socket.rooms.forEach((roomName) => {
      if (rooms[roomName]) {
        rooms[roomName][sessionId].value = voteValue
      }
      socket.broadcast.to(roomName).emit('player_voted', { value: voteValue, playerId: sessionId })
    })
  })

  socket.on('show_all', () => {
    socket.rooms.forEach((roomName) => {
      io.in(roomName).emit('show_all')
    })
  })

  socket.on('does_room_exist', ({ roomId }) => {
    if (rooms[roomId]) {
      socket.emit('does_room_exist', { doesRoomExist: true })
    } else {
      socket.emit('does_room_exist', { doesRoomExist: false })
    }
  })

  socket.on('reset', () => {
    socket.rooms.forEach((roomName) => {
      if (rooms[roomName]) {
        Object.keys(rooms[roomName]).forEach((id) => {
          rooms[roomName][id].value = null
        })
      }
      io.in(roomName).emit('reset')
    })
  })

  socket.on('leave', ({ roomId }: {roomId: string}) => {
    if (rooms[roomId]){
      delete rooms[roomId][sessionId]
      socket.broadcast.to(roomId).emit('player_disconnect', { playerId: sessionId })
    }
  })

  socket.on('disconnecting', () => {
    if (users[sessionId]) {
      socket.rooms.forEach((roomName) => {
        if (rooms[roomName]){
          delete rooms[roomName][sessionId]
          socket.broadcast.to(roomName).emit('player_disconnect', { playerId: sessionId })
        }
      })
      delete users[sessionId]
    }
  })
})
