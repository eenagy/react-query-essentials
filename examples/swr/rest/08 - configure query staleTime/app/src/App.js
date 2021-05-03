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
  // TODO this won't work, you cannot use useSWR to fetch only once
  // also a good question, why would you need cache for data
  // that fetched only once
  const fetchOnlyOnceOptions = {
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
  }
  const { data, error, isValidating } = useSWR(
    'https://pokeapi.co/api/v2/pokemon',
    delayedFetcher,
    fetchOnlyOnceOptions
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
