import React from 'react'
import useSWR from 'swr'

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
    url => delayedFetcher(url).then(d => d.slice(0, 10))
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
                <li
                  key={post.id}
                  onMouseEnter={() => {
                    // TODO you cannot do invalidation per array selection
                    queryCache.prefetchQuery(['post', post.id], () =>
                      fetchPost(post.id)
                    )
                  }}
                >
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

async function fetchPost(postId) {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return axios
    .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(res => res.data)
}

function Post({ postId, setPostId }) {
  const postQuery = useQuery(['post', postId], () => fetchPost(postId))

  return (
    <div>
      <a onClick={() => setPostId(-1)} href="#">
        Back
      </a>
      <br />
      <br />
      {postQuery.isLoading ? (
        'Loading...'
      ) : (
        <>
          {postQuery.data.title}
          <br />
          <br />
          {postQuery.isFetching ? 'Updating...' : null}
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
      <ReactQueryDevtools />
    </div>
  )
}
