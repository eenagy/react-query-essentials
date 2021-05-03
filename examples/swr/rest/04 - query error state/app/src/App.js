import React from 'react'
import useSWR from 'swr'

const delayedFetcher = async (url) => {
  return new Promise(resolve => setTimeout(resolve, 100))
    .then(() => {
      return fetch(url)
    })
    .then(r => r.json())
}

export default function App() {
  const { data, error } = useSWR(
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
      {data.results.map(result => {
        return <div key={result.name}>{result.name}</div>
      })}
    </div>
  )
}
