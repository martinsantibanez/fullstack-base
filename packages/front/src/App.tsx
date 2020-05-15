import React from 'react'
import './assets/style/main.scss'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import GameIndex from './game/Index'
import PanelIndex from './panel/Index'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/panel">
            <PanelIndex />
          </Route>
          <Route path="/game">
            <GameIndex />
          </Route>
          <Route exact path="/">
            <Redirect to="/game" />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
