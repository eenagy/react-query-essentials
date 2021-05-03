import React from 'react'
import useSWR from 'swr'

// user email:
// https://jsonplaceholder.typicode.com/users?email=${email}

// https://jsonplaceholder.typicode.com/posts?userId=${userId}

const email = 'Sincere@april.biz'

const fetcher = async (url) => fetch(url).then(r => r.json())
function MyPosts() {
  const userQuery = useSWR(email? `https://jsonplaceholder.typicode.com/users?email=${email}`: '', fetcher)
  const postsQuery = useSWR(() =>`https://jsonplaceholder.typicode.com/posts?userId=${userQuery.data[0].id}`, fetcher) 

  return !userQuery.data ? (
    'Loading user...'
  ) : (
    <div>
      User Id: {userQuery.data[0].id}
      <br />
      <br />
      {!postsQuery.data ? (
        'Loading posts...'
      ) : (
        <div>Post Count: {postsQuery.data?.length}</div>
      )}
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
