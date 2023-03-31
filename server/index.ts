
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
  value?: string,
}

export type Player = {
  id: string,
  value: string | null 
  name: string,
}

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

io.on('connection', (socket) => {
  const sessionId = socket.request.session.id

  
  socket.on('mynameis', ({ name }: {name: string}) => {
    createNewUser(name || 'anon', sessionId)
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

  socket.on('reset', () => {
    socket.rooms.forEach((roomName) => {
      if (rooms[roomName]) {
        console.log(roomName)
        console.log(rooms)
        Object.keys(rooms[roomName]).forEach((id) => {
          rooms[roomName][id].value = null
        })
      }
      io.in(roomName).emit('reset')
    })
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
