import express, { Express, Request, Response } from 'express';
import path from 'path';
import cors from 'cors'
import { Server } from 'socket.io'

const isDev = process.env.NODE_ENV !== 'production'

const port = 8080;

const app: Express = express();

app.use(cors())
app.use(express.static(path.join(__dirname)));

app.get('/*', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

io.on('connection', () => {
  pingTenTimes()
})

async function sleep(time: number) {
  await new Promise((resolve) => setTimeout(resolve, time))
}

async function pingTenTimes() {
  for (let i = 0; i < 10; i++) {
    io.emit('ping', 'ping')
    await sleep(1000)
  }
}

