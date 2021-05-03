import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom'
import useSWR from 'swr'

// TODO scroll restoration doesn't work
export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:postId">
          <Post />
        </Route>
        <Route path="/">
          <Posts />
        </Route>
      </Switch>
    </Router>
  )
}
const delayedFetcher = async url => {
  return new Promise(resolve => setTimeout(resolve, 100))
    .then(() => {
      return fetch(url)
    })
    .then(r => r.json())
}

function Posts() {
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
                  <Link to={`/${post.id}`}>{post.title}</Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

function Post() {
  const { postId } = useParams()

  const postQuery = useSWR(
    postId ? `https://jsonplaceholder.typicode.com/posts/${postId}` : '',
    delayedFetcher
  )

  return (
    <div>
      <Link to="/">Back</Link>
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
