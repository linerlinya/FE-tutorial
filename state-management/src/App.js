import React from 'react'
import ReduxCounter from './redux'
import UseReducerWithClass from './redux/ReduxWithoutNPM'
import UnstatedCounter from './unstated'
import ChroxCounter from './chrox'
import UnstatedNextCounter from './unstated-next'

import MobxCounter from './mobx'

function App() {
  return (
    <div>
      <ReduxCounter />
      <UseReducerWithClass />
      <UnstatedCounter />
      <ChroxCounter />
      <UnstatedNextCounter />

      <MobxCounter />
    </div>
  )
}

export default App
