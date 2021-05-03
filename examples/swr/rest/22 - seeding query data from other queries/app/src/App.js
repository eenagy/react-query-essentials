import React from 'react'
import useSWR, { cache } from 'swr'

const delayedFetcher = async url => {
  return new Promise(resolve => setTimeout(resolve, 100))
    .then(() => {
      return fetch(url)
    })
    .then(r => r.json())
}

function Posts({ setPostId }) {
  const postsQuery = useSWR(
    'https://jsonplaceholder.typicode.com/posts',
    delayedFetcher
  )

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
    delayedFetcher,
    {
      initialData: cache
        .get('https://jsonplaceholder.typicode.com/posts')
        .find(p => p.id === postId),
    }
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
