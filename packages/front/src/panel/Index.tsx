import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import SearchRae from './SearchRae'

export default function PanelIndex() {
  const match = useRouteMatch()
  return (
    <div>
      <Route path={`${match.path}/search`}>
        <SearchRae />
      </Route>
    </div>
  )
}
