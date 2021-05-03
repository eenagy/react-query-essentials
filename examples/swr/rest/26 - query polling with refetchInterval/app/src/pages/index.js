import React from 'react'
import useSWR from 'swr';

export default function Posts() {
  const timeQuery = useSWR(
    '/api/time',
    async (url) => {
      return fetch(url).then(res => res.json())
    },
    {
      // TODO doesn't seem like working
      refreshInterval: 500,
      refreshWhenHidden: true,
    }
  )
  console.log(timeQuery.data)
  return (
    <div>
      <h1>Server Time {timeQuery.isValidating ? '...' : null}</h1>
      <div>
        {!timeQuery.data
          ? 'Loading time...'
          : new Date(timeQuery.data?.time).toLocaleString()}
      </div>
    </div>
  )
}
