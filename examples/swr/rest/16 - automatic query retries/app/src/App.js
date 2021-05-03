import React from 'react'
import useSWR from 'swr'

export default function App() {
  const [pokemon, setPokemon] = React.useState('')
  return (
    <div>
      <input value={pokemon} onChange={e => setPokemon(e.target.value)} />
      <PokemonSearch pokemon={pokemon} />
    </div>
  )
}

const delayedFetcher = async url => {
  return new Promise(resolve => setTimeout(resolve, 100))
    .then(() => {
      return fetch(url)
    })
    .then(r => r.json())
}

function PokemonSearch({ pokemon }) {
  // not going to work without disabling, as it fetches all the data
  const { data, error, isValidating } = useSWR(
    pokemon ? `https://pokeapi.co/api/v2/pokemon/${pokemon}`: false,
    delayedFetcher,
    {
      errorRetryCount: 2,
      errorRetryInterval : 1000,
    }
  )
  if (error) {
    return error.message
  }
  return !data ? (
    'Loading...'
  ) : (
    <div>
      {data?.sprites?.front_default ? (
        <img src={data.sprites.front_default} alt="pokemon" />
      ) : (
        'Pokemon not found.'
      )}
      <br />
      {isValidating ? 'Updating...' : null}
    </div>
  )
}
