import React from 'react'
import useSWR from 'swr'

// Not really parallel
// TODO check if react-query makes this parallel
export default function App() {
  return (
    <div>
      <Pokemon />
      <Berries />
    </div>
  )
}
const delayedFetcher = async (url) => {
  return new Promise(resolve => setTimeout(resolve, 100))
    .then(() => {
      return fetch(url)
    })
    .then(r => r.json())
}

function Berries() {
  const { data, error, isValidating } = useSWR(
    'https://pokeapi.co/api/v2/berry',
    delayedFetcher
  )

  if (error) {
    return error.message
  }
  return !data ? (
    'Loading...'
  ) : (
    <div>
      {data.results?.map(result => {
        return <div key={result.name}>{result.name}</div>
      })}
      <br />
      {isValidating ? 'Updating...' : null}
    </div>
  )
}

function Pokemon() {
  const { data, error, isValidating } = useSWR(
    'https://pokeapi.co/api/v2/pokemon',
    delayedFetcher
  )

  if (error) {
    return error.message
  }
  return !data ? (
    'Loading...'
  ) : (
    <div>
      {data.results?.map(result => {
        return <div key={result.name}>{result.name}</div>
      })}
      <br />
      {isValidating ? 'Updating...' : null}
    </div>
  )
}
