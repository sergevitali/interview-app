import Styles from './App.module.scss'
import Button from '@mui/material/Button'

function App() {
  return (
    <div className={Styles.App}>
      <h1>This is an app</h1>
      <Button variant="contained" className={Styles.button}>
        Hello World
      </Button>
    </div>
  )
}

export default App
