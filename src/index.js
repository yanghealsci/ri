import { AppContainer } from 'react-hot-loader'
import Home from 'pages/Home'

function App (props) {
  return (
    <Home />
  )
}

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept(App, () => {
    render(App)
  })
}