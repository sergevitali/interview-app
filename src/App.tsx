import Styles from './App.module.scss'
import Button from '@mui/material/Button'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Box } from '@mui/material'

const URL = 'https://randomuser.me/api/?results=20'

type Person = {
  name: {
    first: string
  }
  location: Location
}

type Location = any

const fetchData = async (): Promise<Person[]> => {
  try {
    return await axios
      .get(URL, {
        headers: {
          'Content-type': 'application/json'
        }
      })
      .then((response) => response.data.results)
  } catch (error) {
    throw new Error('No data found')
  }
}

const recursiveFlat = (object: Location, array: string[], mainKey?: string) => {
  Object.entries(object).forEach(([key, value]) => {
    if (typeof value !== 'object') {
      if (mainKey) {
        array.push(mainKey + '-' + key)
      } else {
        array.push(key)
      }
    } else {
      recursiveFlat(value, array, key)
    }
  })
}

const flattenLocationsHeaders = (locations: Location[]): any => {
  const flattenedLocationsHeaders: string[] = []
  recursiveFlat(locations[0], flattenedLocationsHeaders)
  return flattenedLocationsHeaders
}

const flattenLocationsValues = (locations: Location[]): any => {
  const flattenedLocationValues: string[] = []
  for (const { street, coordinates, timezone, ...rest } of locations) {
    flattenedLocationValues.push({
      ...rest,
      'street-name': street.name,
      'street-number': street.number,
      'coordinates-latitude': coordinates.latitude
    })
  }
  const newSortedValues = { ...flattenedLocationValues }
  // newSortedValues.sort((a: string, b: string) => {
  //   if (a <)
  //   return 0
  // })
  return flattenedLocationValues
}

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
        {showLoginForm && (
          <Box sx={{ margin: 'auto', width: 400, padding: 10 }}>
            <form style={{ width: '400px' }}>
              <input
                style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
                name="name"
              />
              <input
                style={{ width: '100%', padding: '10px' }}
                name="passowrd"
              />
            </form>
          </Box>
        )}
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
