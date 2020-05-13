import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import MovieDetail from './containers/MovieDetail'
import MovieList from './containers/MovieList'

export default function App () {
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/movies/:movieId'>
            <MovieDetail />
          </Route>
          <Route path='/:page'>
            <MovieList />
          </Route>
          <Route path='/'>
            <MovieList />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
