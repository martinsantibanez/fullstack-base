import React, { Component } from 'react'
import { Route, withRouter, RouteComponentProps } from 'react-router-dom'
import GameRoom from './GameRoom'
import Monitor from './Monitor'
import CreateRoom from './CreateRoom'
import GameManager from './engine/GameManager'
import { Provider } from 'react-redux'
import store from './store'
import './Index.scss'
import Header from './components/Header'

type State = {
  isLoaded: boolean
  isLoading: boolean
  error: string
}
type Props = RouteComponentProps
const initialState: State = {
  isLoaded: false,
  isLoading: true,
  error: ''
}
class GameIndex extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = initialState
  }
  async componentDidMount() {
    try {
      const game = GameManager.getGame()
      await game.loadGame(store.dispatch, store.getState)
      this.setState({
        isLoaded: true,
        isLoading: false
      })
      /*game.uiManager.onGameStop = () => {
            this.setState({
              error: 'Game has stoppped!'
            })
          }*/
      //debug
      const win: any = window
      win.mainGame = game
    } catch (err) {
      this.setState({
        error: err
      })
    }
  }
  render() {
    const { match } = this.props
    if (!this.state.isLoaded) return <div>Loading...</div>
    return (
      <div className="game-main">
        <Header />
        <div className="game-content">
          <Provider store={store}>
            <Route exact path={`${match.path}`}>
              <CreateRoom />
            </Route>
            <Route path={`${match.path}/room/:roomId`}>
              <GameRoom />
            </Route>
            <Route path={`${match.path}/monitor/:roomId`}>
              <Monitor />
            </Route>
          </Provider>
        </div>
      </div>
    )
  }
}

export default withRouter(GameIndex)
