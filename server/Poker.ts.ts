import { Server, Socket } from 'socket.io'

export class Poker {
  #rooms: {[socketId: string]: User[]} = {}
  #io: Server

  constructor(io: Server) {
    this.#io = io
  }

  joinRoom(roomName: string, socket: Socket, user: User) {
    socket.join(roomName)

    if(this.#rooms[roomName]) {
      this.#rooms[roomName].push(user) 
    } else {
      this.#rooms[roomName] = [user] 
    }
  }

  deleteRoom(roomName: string){
    this.#io.in(roomName).socketsLeave(roomName)
  }

  getRoommates(roomName: string) {
    return this.#rooms[roomName]
  }
}

export class User {
  #socketId: string
  name: string
  hasVoted: boolean
  vote: string

  constructor(name: string, socketId:string) {
    this.name = name
    this.#socketId = socketId
  }

  doVote(vote: string) {
    this.vote = vote
    this.hasVoted = true
  }

  getSocketId () {
    return this.#socketId
  }

}
