import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import Rosco from './Rosco'
import GameManager from './engine/GameManager'
import PlayerList from './components/PlayerList'
import ActionContainer from './components/ActionContainer'
import { connect } from 'react-redux'
import { setPlayerName, getPlayerName, getCurrentRoom, getPlaying, State, getTurnType, getWordToRead, TurnType, DispatchFn } from './store'
import CreatePlayer from './components/CreatePlayer'
import { RoomStatus } from '@p/types/Room'
import RoomLobby from './RoomLobby'
import Definition from './components/Definition'
declare const window: any

async function getStream() {
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
      height: { min: 576, ideal: 720, max: 1080 }
    }
  }
  return navigator.mediaDevices.getUserMedia(constraints)
}

type BaseProps = {}
const mapStateToProps = (state: State, ownProps: BaseProps) => {
  return {
    playerName: getPlayerName(state),
    playing: getPlaying(state),
    room: getCurrentRoom(state),
    turnType: getTurnType(state),
    word: getWordToRead(state)
  }
}
const mapDispatchToProps = (dispatch: DispatchFn) => {
  return {
    setPlayerName: (name: string) => dispatch(setPlayerName(name))
  }
}
type RouteParams = {
  roomId: string
}
type Props = BaseProps &
  RouteComponentProps<RouteParams> &
  ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>

class GameRoom extends React.Component<Props> {
  componentDidMount() {}
  joinRoom(playerName: string) {
    const { roomId } = this.props.match.params
    if (!roomId) return
    this.props.setPlayerName(playerName)
    GameManager.getGame().action.joinRoom({ playerName, roomId })
  }

  render() {
    const { playerName, playing, room, turnType, word } = this.props
    console.log(playerName, room)
    if (!playerName || !room) return <CreatePlayer onSubmit={(name) => this.joinRoom(name)} />
    if (room?.status === RoomStatus.Created) return <RoomLobby />
    return (
      <div>
        <h2>Turno de {playing?.name}</h2>
        {/*<video autoPlay ref={videoElement} style={{ width: '100%', height: '100%' }}></video>*/}
        <Rosco />
        <ActionContainer />
        {turnType === TurnType.Reader && !!word && <Definition word={word} />}
        {/*<PlayerList />*/}
        {/*{!videoStarted && <button onClick={startVideo}>Start video</button>}*/}
        {/*<div className="select">
        <label htmlFor="videoSource">Video source: </label>
        <select id="videoSource"></select>
      </div>*/}
      </div>
    )
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GameRoom)
) /*
      }
      socket.emit('frame', payload)
    }, 100)
    return () => clearInterval(interval)
  }, [videoStarted])*/

/* OLD : Video - TODO

  //const videoElement = useRef<HTMLVideoElement>(null)
  /*useEffect(() => {
    if (!videoStarted) return

    const canvas = document.createElement('canvas')
    canvas.width = 576
    canvas.height = 1024
    const context = canvas.getContext('2d')

    const interval = setInterval(function () {
      if (!context) return
      context.drawImage(videoElement.current as any, 0, 0, canvas.width, canvas.height)
      /*const payload = {
        img: canvas.toDataURL('image/webp'),
        roomId: roomId*/

/* componentDidMount:::
    const div = videoElement.current
    if (!div) return
  startVideo = async () => {
    if (!videoElement.current) return
    const stream = await getStream()
    window.stream = stream // make stream available to console
    /*videoSelect.selectedIndex = [...videoSelect.options].findIndex(
      (option) => option.text === stream.getVideoTracks()[0].label
    )
    console.log('videostart')*/
//setVideoStarted(true)
//videoElement.current.srcObject = stream*/
