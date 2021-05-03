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
  const { data } = useSWR(
    'https://pokeapi.co/api/v2/pokemon',
    delayedFetcher
  )
  console.log(data)
  return !data ? (
    'Loading...'
  ) : (
    <div>
      {data.results?.map(result => {
        return <div key={result.name}>{result.name}</div>
      })}
    </div>
  )
}
