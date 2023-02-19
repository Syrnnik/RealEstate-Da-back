import AdonisServer from '@ioc:Adonis/Core/Server'
import { Server } from 'socket.io'
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from 'Contracts/webSocket'

class WebSocketService {
  public io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>
  private booted: boolean = false

  public boot() {
    /**
     * Ignore multiple calls to the boot method
     */
    if (this.booted)
      return

    this.booted = true
    this.io = new Server(AdonisServer.instance!, {
      cors: {
        origin: '*'
      }
    })
  }
}

export default new WebSocketService()
