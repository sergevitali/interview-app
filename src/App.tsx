import Styles from './App.module.scss'
import styled from 'styled-components'
import HomePage from './app/containers/HomePage'

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
function App() {
  return (
    <div className={Styles.App}>
      <AppContainer>
        <HomePage />
      </AppContainer>
    </div>
  )
}

export default App
