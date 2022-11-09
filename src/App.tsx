import FormDemo from './components/FormDemo'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
      }}
    >
      <Container>
        <FormDemo />
      </Container>
    </Box>
  )
}

export default App
