import React from 'react'
import useSWR, { mutate } from 'swr'

// TODO <link rel="preload" href="/api/data" as="fetch" crossorigin="anonymous">
// TODO it works, but it's very aggressively invalidates the data
// TODO  if prefetched I would except not to do network request again so soon
const urlKey = 'https://jsonplaceholder.typicode.com/posts'
export default function App() {
  const [show, toggle] = React.useReducer(d => !d, false)

  React.useEffect(() => {
    mutate(urlKey, fetchPosts(urlKey))
  }, [])

  return (
    <div>
      <button onClick={toggle}>Show Posts</button>
      {show ? <Posts /> : null}
    </div>
  )
}

async function fetchPosts(url) {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return fetch(url)
    .then(res => res.json())
    .then(data =>  data.slice(0, 10))
}

function Posts({ setPostId }) {
  const postsQuery = useSWR(urlKey, fetchPosts)

  return (
    <div>
      <h1>Posts {postsQuery.isValidating ? '...' : null}</h1>
      <div>
        {!postsQuery.data ? (
          'Loading posts...'
        ) : (
          <ul>
            {postsQuery.data.map(post => {
              return (
                <li key={post.id}>
                  <a onClick={() => setPostId(post.id)} href="#">
                    {post.title}
                  </a>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
