import React from 'react'
import ReduxCounter from './redux'
import UseReducerWithClass from './redux/ReduxWithoutNPM'
import UnstatedCounter from './unstated'
import ChroxCounter from './chrox'
import UnstatedNextCounter from './unstated-next'

function App() {
  return (
    <div>
      <ReduxCounter />
      <UseReducerWithClass />
      <UnstatedCounter />
      <ChroxCounter />
      <UnstatedNextCounter />
    </div>
  )
}

export default App
