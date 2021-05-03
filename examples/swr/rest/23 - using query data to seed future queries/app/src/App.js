import React, { useEffect } from 'react'
import useSWR, { cache } from 'swr'

const delayedFetcher = async url => {
  return new Promise(resolve => setTimeout(resolve, 100))
    .then(() => {
      return fetch(url)
    })
    .then(r => r.json())
}

function Posts({ setPostId }) {
  // TODO this one keeps refetching when rerendered
  // cache should be hit
  const postsQuery = useSWR(
    'https://jsonplaceholder.typicode.com/posts',
    delayedFetcher
  )
  useEffect(() => {
    if (postsQuery.data) {
      postsQuery.data.forEach(post => {
        // TODO doesn't work
        cache.set(
          `https://jsonplaceholder.typicode.com/posts/${post.id}`,
          post
        )
      })
    }
  }, [postsQuery.data])

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

function Post({ postId, setPostId }) {
  const postQuery = useSWR(
    postId ? `https://jsonplaceholder.typicode.com/posts/${postId}` : '',
    delayedFetcher
  )

  return (
    <div>
      <a onClick={() => setPostId(-1)} href="#">
        Back
      </a>
      <br />
      <br />
      {!postQuery.data ? (
        'Loading...'
      ) : (
        <>
          {postQuery.data.title}
          <br />
          <br />
          {postQuery.isValidating ? 'Updating...' : null}
        </>
      )}
    </div>
  )
  //
}

export default function App() {
  const [postId, setPostId] = React.useState(-1)

  return (
    <div>
      {postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : (
        <Posts setPostId={setPostId} />
      )}
    </div>
  )
}
