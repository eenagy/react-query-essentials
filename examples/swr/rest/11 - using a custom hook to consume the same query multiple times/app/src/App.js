import React from 'react'
import useSWR from 'swr'

export default function App() {
  return (
    <div>
      <Count />
      <Pokemon />
    </div>
  )
}

// no need for cache key, the url is already a cache key
function usePokemon() {
  return useSWR('https://pokeapi.co/api/v2/pokemon', url =>
    fetch(url).then(r => r.json())
  )
}

function Count() {
  const { data } = usePokemon()
  console.log(data)
  return (
    <h3>You are looking at {data?.results.length} pokemon</h3>
  )
}

function Pokemon() {
  const { data, error, isValidating } = usePokemon()

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
