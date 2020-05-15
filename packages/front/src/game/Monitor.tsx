import React, { useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import socketIOClient, { Socket } from 'socket.io-client'
import Rosco from './Rosco'
declare const window: any

/*async function getStream() {
  if (window.stream) {
    window.stream.getTracks().forEach((track: any) => {
      track.stop()
    })
  }
  //const videoSource = videoSelect.value
  const videoSource = undefined
  const constraints = {
    video: {
      deviceId: videoSource ? { exact: videoSource } : undefined,
      width: { min: 1024, ideal: 1280, max: 1920 },
      height: { min: 576, ideal: 720, max: 1080 },
    },
  }
  return navigator.mediaDevices.getUserMedia(constraints)
}*/
let socket: SocketIOClient.Socket
export default function Monitor() {
  const { roomId } = useParams()
  const imgElement = useRef<HTMLImageElement>(null)
  useEffect(() => {
    const host = '192.168.0.19:3020'
    socket = socketIOClient(host)
    console.log('emit roomId', roomId)
    socket.emit('room', roomId)
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
  }, [roomId])

  return (
    <div>
      <Rosco />
      <img src="" id="frame" style={{ width: 576, height: 1024 }} ref={imgElement} alt="Stream" />
      Monitor welcome to {roomId}
    </div>
  )
}
