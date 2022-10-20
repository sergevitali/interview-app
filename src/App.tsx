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

function App() {
  const [people, setPeople] = useState<Person[]>([])
  const [locationsHeaders, setLocationHeaders] = useState<Location[]>([])

  const [loading, setLoading] = useState<boolean>(true)
  const [reFetch, setRefetch] = useState<boolean>(false)

  const flattenLocations = (locations: Location[]): any => {
    const flattenedLocationsHeaders: string[] = []
    recursiveFlat(locations[0], flattenedLocationsHeaders)
    return flattenedLocationsHeaders
  }

  useEffect(() => {
    let mounted = true

    const fetchPeople = async () => {
      fetchData()
        .then((data) => {
          if (mounted) {
            setPeople(data)
            setLocationHeaders(
              flattenLocations(data.map(({ location }) => location))
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
      <div className={Styles.App}>
        <h1>This is an app</h1>
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
        {locationsHeaders.map((header, index) => (
          <div key={index}>{header}</div>
        ))}
      </div>
    )
  }

  return <p>Error while getting the data</p>
}

export default App
