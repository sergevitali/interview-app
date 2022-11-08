import Styles from './App.module.scss'
import Box from '@mui/material/Box'
import HomePage from './app/containers/HomePage'

function App() {
  return (
    <Box className={Styles.App}>
      <HomePage />
    </Box>
  )
}

export default App
