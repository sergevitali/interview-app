import axios from 'axios'

export const URL = 'https://randomuser.me/api/?results=20'

export type Person = {
  name: {
    first: string
  }
  location: Location
}

export type Location = any

export const fetchData = async (): Promise<Person[]> => {
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

export const recursiveFlat = (
  object: Location,
  array: string[],
  mainKey?: string
) => {
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

export const flattenLocationsHeaders = (locations: Location[]): any => {
  const flattenedLocationsHeaders: string[] = []
  recursiveFlat(locations[0], flattenedLocationsHeaders)
  return flattenedLocationsHeaders
}

export const flattenLocationsValues = (locations: Location[]): any => {
  const flattenedLocationValues: string[] = []
  for (const { street, coordinates, timezone, ...rest } of locations) {
    flattenedLocationValues.push({
      ...rest,
      'street-name': street.name,
      'street-number': street.number,
      'coordinates-latitude': coordinates.latitude
    })
  }
  return flattenedLocationValues
}
