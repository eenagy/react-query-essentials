import React from 'react'
import useSWR from 'swr'

export default function App() {
  // TODO you cannot do this, as swr does deduplication
  return (
    <div>
      <Pokemon queryKey="pokemon1" />
      <Pokemon queryKey="pokemon1" />
    </div>
  )
}

function Pokemon({ queryKey }) {
  const {data, error, isValidating} = useSWR('https://pokeapi.co/api/v2/pokemon')

  if(error){
    return error.message
  }
  return !data? (
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
