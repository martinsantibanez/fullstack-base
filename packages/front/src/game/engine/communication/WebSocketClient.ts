import SocketIOClient from 'socket.io-client'
import CommunicationManager from './CommunicationManager'
import Wildcard from 'socketio-wildcard'
import * as Messages from '@p/types/communication/ClientMessageName'

export default class WebSocketClient {
  connected: boolean
  socket?: SocketIOClient.Socket
  requestManager: CommunicationManager
  constructor(requestManager: CommunicationManager) {
    this.connected = false
    this.requestManager = requestManager
  }

  emit(type: string, payload: any) {
    if (this.connected && this.socket != null) {
      this.socket.emit(type, payload)
    } else {
      console.error('Trying to emit' + type + ' while not connected')
    }
  }

  connect(connectionURL: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket = SocketIOClient(connectionURL)
      const patch = Wildcard(SocketIOClient.Manager)
      patch(this.socket)
      this.socket.on(Messages.CONNECT, () => {
        this.connected = true
        this.requestManager.handleOpenConnection()
        resolve()
      })

      this.socket.on(Messages.DISCONNECT, () => {
        this.connected = false
        //this.messageHandler.handleCloseConnection()
      })

      this.socket.on('*', (req: any) => {
        this.requestManager.handleMessage(req.data[0], req.data[1])
      })

      /*this.socket.onerror = (evt) => {
        if (!this.connected) {
          reject('Cannot connect to host')
        }
        this.connected = false
        //this.messageHandler.handleConnectionError()
      }*/
    })
  }
}
