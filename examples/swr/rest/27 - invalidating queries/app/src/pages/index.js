import React from 'react'
import useSWR, {cache} from 'swr';

export default function Posts() {
  const randomQuery = useSWR(
    '/api/random',
    async (url) => {
      return fetch(url).then(res => res.json())
    }
  )
  return (
    <div>
      <h1>Random Number {randomQuery.isValidating ? '...' : null}</h1>
      <h2>
        {!randomQuery.data
          ? 'Loading random number...'
          : Math.round(randomQuery.data.random * 1000)}
      </h2>
      <div>
        <button onClick={() => {
          //TODO cache invalidation doesn't work progrematically at this point
        }}>
          Invalidate Random Number
        </button>
      </div>
    </div>
  )
}
