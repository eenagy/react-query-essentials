import React from 'react'
import useSWR from 'swr'

export default function App() {
  const { data } = useSWR('https://pokeapi.co/api/v2/pokemon')
  return (
    <div>
      {data?.results?.map(result => {
        return <div key={result.name}>{result.name}</div>
      })}
    </div>
  )
}
