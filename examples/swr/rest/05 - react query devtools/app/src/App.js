import React from 'react'
// Not as good as react-query devtools
import SWRDevtools from '@jjordy/swr-devtools'
import useSWR, { cache, mutate } from 'swr'

const delayedFetcher = async (url) => {
  return new Promise(resolve => setTimeout(resolve, 100))
    .then(() => {
      return fetch(url)
    })
    .then(r => r.json())
}

function Pokemon() {
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

export default function App() {
  return (
    <div>
      <Pokemon />
      
      <SWRDevtools cache={cache} mutate={mutate} />
    </div>
  )
}
