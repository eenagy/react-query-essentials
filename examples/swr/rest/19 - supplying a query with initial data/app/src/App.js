import React from 'react'
import useSWR from 'swr'
import existingUser from './existingUser'
// user email:
// https://jsonplaceholder.typicode.com/users?email=${email}

// https://jsonplaceholder.typicode.com/posts?userId=${userId}

const email = 'Sincere@april.biz'

const fetcher = async url => fetch(url).then(r => r.json())
function MyPosts() {
  const userQuery = useSWR(
    email
      ? `https://jsonplaceholder.typicode.com/users?email=${email}`
      : '',
    fetcher,
    // TODO only going to refetched when window lost, etc
    { initialData: [existingUser]}
  )

  return !userQuery.data ? (
    'Loading user...'
  ) : (
    <div>
      <pre>{JSON.stringify(userQuery.data, null, 2)}</pre>
      {userQuery.isValidating ? 'Updating...' : null}
    </div>
  )
}

export default function App() {
  return (
    <div>
      <MyPosts />
    </div>
  )
}
