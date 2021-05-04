import React, { useCallback, useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr'

import PostForm from '../components/PostForm'

// TODO needs custom hook to track state of mutation
const useCreatePost = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isError || isSuccess) {
    }
  }, [isError, isSuccess])
  const resetState = () => {
    setIsLoading(false)
    setIsSuccess(null)
    setIsError(false)
    setResult(null)
    setError(null)
  }
  // TODO setback to isSuccess/isError after a certain treshold
  // this should not be here
  useEffect(() => {
    const timeout =
      isError || isSuccess
        ? setTimeout(() => {
            if (isError) {
              setIsError(false)
            }
            if (isSuccess) {
              setIsSuccess(false)
            }
          }, 1000)
        : null
    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [isSuccess, isError])

  const createPost = useCallback(
    async (values) => {
      resetState()
      if (!isLoading) {
        try {
          setIsLoading(true)
          const result = await mutate('/api/posts', async (posts) => {
            const post = await fetch('/api/posts', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            }).then((r) => r.json())
            // TODO doesn't work
            return [post, ...posts]
          })
          setIsLoading(false)

          setIsSuccess(true)
          setIsError(false)
          setResult(result)
        } catch (e) {
          setIsLoading(false)
          setIsSuccess(false)
          setError(e)
          setIsError(true)
        }
      }
    },
    [isLoading]
  )
  return [createPost, { error, isSuccess, result, isError, isLoading }]
}
export default function Posts() {
  const postsQuery = useSWR('/api/posts', (url) =>
    fetch(url).then((res) => res.json())
  )
  const [createPost, createPostInfo] = useCreatePost()

  return (
    <section>
      <div>
        <div>
          {!postsQuery.data ? (
            <span>Loading...</span>
          ) : (
            <>
              <h3>
                Posts {postsQuery.isValidating ? <small>...</small> : null}
              </h3>
              <ul>
                {postsQuery?.data?.map((post) => (
                  <li key={post.id}>{post.title}</li>
                ))}
              </ul>
              <br />
            </>
          )}
        </div>
      </div>

      <hr />

      <div>
        <h3>Create New Post</h3>
        <div>
          <PostForm
            onSubmit={createPost}
            clearOnSubmit
            submitText={
              createPostInfo.isLoading
                ? 'Saving...'
                : createPostInfo.isError
                ? 'Error!'
                : createPostInfo.isSuccess
                ? 'Saved!'
                : 'Create Post'
            }
          />
        </div>
      </div>
    </section>
  )
}
