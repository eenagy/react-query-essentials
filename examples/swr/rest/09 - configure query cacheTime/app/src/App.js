import React from 'react'
import useSWR from 'swr'

const delayedFetcher = async (url) => {
  return new Promise(resolve => setTimeout(resolve, 100))
    .then(() => {
      return fetch(url)
    })
    .then(r => r.json())
}

function Pokemon() {
  // TODO no option to control the cache manually

  const { data, error, isValidating } = useSWR(
    'https://pokeapi.co/api/v2/pokemon',
    delayedFetcher,
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

export default function App() {
  return (
    <div>
      <Pokemon />
    </div>
  )
}
