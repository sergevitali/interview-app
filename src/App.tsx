import Styles from './App.module.scss'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import {
  fetchData,
  flattenLocationsHeaders,
  flattenLocationsValues,
  Person
} from './Utils/utils'
import LoginForm from './Components/LoginForm'

function App() {
  const [people, setPeople] = useState<Person[]>([])
  const [locationsHeaders, setLocationHeaders] = useState<string[]>([])
  const [locationValues, setLocationValues] = useState<any[]>()

  const [showLoginForm, setShowLoginForm] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [reFetch, setRefetch] = useState<boolean>(false)

  useEffect(() => {
    let mounted = true

    const fetchPeople = async () => {
      fetchData()
        .then((data) => {
          if (mounted) {
            setPeople(data)
            setLocationHeaders(
              flattenLocationsHeaders(data.map(({ location }) => location))
            )
            setLocationValues(
              flattenLocationsValues(data.map(({ location }) => location))
            )
            setLoading(false)
          }
        })
        .catch((err) => console.error(err))
    }

    fetchPeople()

    return () => {
      mounted = false
    }
  }, [reFetch])

  if (loading) {
    return <Box>Loading</Box>
  }

  if (people) {
    return (
      <Box className={Styles.App}>
        <h1>This is an app</h1>
        <Button
          variant="contained"
          className={Styles.button}
          onClick={() => setShowLoginForm(!showLoginForm)}
        >
          Login Form Toggle
        </Button>
        {showLoginForm && <LoginForm />}
        {!showLoginForm && (
          <>
            <Button
              variant="contained"
              className={Styles.button}
              onClick={() => setRefetch(!reFetch)}
            >
              Hello World
            </Button>
            {people?.map((person, personIdx) => (
              <p key={personIdx}>{person.name.first}</p>
            ))}
            {locationValues && (
              <table>
                <thead>
                  <tr>
                    {Object.keys(locationValues[0]).map((key) => (
                      <th key={key + 'head'}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {locationValues?.map((location, idx) => (
                    <tr key={idx + 'tr'}>
                      {Object.values(location).map((value, inx) => (
                        <td key={idx + 'td' + inx}>{'value'}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </Box>
    )
  }

  return <p>Error while getting the data</p>
}

export default App
