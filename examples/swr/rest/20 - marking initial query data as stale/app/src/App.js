import React from 'react'
import { useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'
import axios from 'axios'

import existingUser from './existingUser'

const email = 'Sincere@april.biz'

function MyPosts() {
  const userQuery = useQuery(
    'user',import React from 'react'
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
        { initialData: [existingUser], 
          //TODO always going to happen not just after initialData fetch...
          // TODO there is no initial stale like in react-query
          revalidateOnMount: true }
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
    
    async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return axios
        .get(`https://jsonplaceholder.typicode.com/users?email=${email}`)
        .then(res => res.data[0])
    },
    {
      initialData: existingUser,
      initialStale: true,
    }
  )

  return userQuery.isLoading ? (
    'Loading user...'
  ) : (
    <div>
      <pre>{JSON.stringify(userQuery.data, null, 2)}</pre>
      {userQuery.isFetching ? 'Updating...' : null}
    </div>
  )
}

export default function App() {
  return (
    <div>
      <MyPosts />
      <ReactQueryDevtools />
    </div>
  )
}
