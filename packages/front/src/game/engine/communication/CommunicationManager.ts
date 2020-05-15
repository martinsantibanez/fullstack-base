import { EventHandler } from './EventHandler'
import WebSocketClient from './WebSocketClient'
import * as Msg from '@p/types/communication/ServerMessageName'
import { roomCreated, roomJoined, playerJoined, roomStarted, move, readerTurn } from './incoming/Room'

export default class CommunicationManager {
  client: WebSocketClient
  requestHandlers: IncomingEventDictionary

  constructor() {
    this.client = new WebSocketClient(this)
    this.requestHandlers = {}
    this._registerRequests()
  }

  _registerRequests() {
    this.requestHandlers[Msg.ROOM_CREATED] = roomCreated
    this.requestHandlers[Msg.ROOM_JOINED] = roomJoined
    this.requestHandlers[Msg.PLAYER_JOINED] = playerJoined
    this.requestHandlers[Msg.ROOM_STARTED] = roomStarted
    this.requestHandlers[Msg.MOVE] = move
    this.requestHandlers[Msg.READER_TURN] = readerTurn
  }

  sendMessage(type: string, payload: any = {}) {
    if (this.client.connected) {
      console.log('[SEND][' + type + ']:', payload)
      this.client.emit(type, payload)
    } else {
      console.error('Client not connected')
    }
  }

  handleMessage(type: string, payload: any) {
    console.log('[GOT][' + type + ']:', payload)
    const handler = this.requestHandlers[type]
    if (!handler) {
      console.error('No handler for', type)
    } else {
      handler(payload)
    }
    /*const message = new ServerMessage(rawMessage)
    const handler = this.requestHandlers[message.id]
    if (handler == null) {
      //console.log('No handler for: ' + message.id);
    } else {
      //console.log('Handled [' + message.id + ']: ' + handler.constructor.name);
      handler.handle(message)
    }*/
  }

  handleOpenConnection = (): void => {
    console.log('Connected') // Setups
  }

  handleCloseConnection = (): void => {
    console.log('Disconnected') // Cleanups
  }

  handleConnectionError = (): void => {
    console.error('Error connecting')
  }

  connect(host: string, port: number, secure: boolean): Promise<void> {
    const connectionURL = (secure ? 'wss' : 'ws') + '://' + host + ':' + port
    return this.client.connect(connectionURL)
  }
}

interface IncomingEventDictionary {
  [id: string]: EventHandler
}
