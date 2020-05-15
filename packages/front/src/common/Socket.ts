import SocketIOClient from 'socket.io-client'

const SOCKET_SV = '192.168.0.19:3020'

let socket: SocketIOClient.Socket

export function create() {
  socket = SocketIOClient(SOCKET_SV)
}

export function emit(event: any, payload: any) {
  try {
    socket.emit(event, payload)
  } catch (e) {
    console.error(e)
  }
}

/*
socket.on('connect', function () {
  console.log('socket connected')
})

socket.on('disconnect', function () {
  console.log('socket disconnected')
})

socket.on('frame', function (data: any) {
  console.log('got frame')
  if (!imgElement.current) return
  imgElement.current.src = data
})
*/
