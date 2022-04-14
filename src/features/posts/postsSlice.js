import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = {
  posts: [],
  status: 'idle',
  error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost',
  // The payload creator receives the partial `{title, content, user}` object
  async initialPost => {
    // We send the initial data to the fake API server
    const response = await client.post('/fakeApi/posts', initialPost)
    // The response includes the complete post object, including unique ID
    return response.data
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
      postUpdated(state, action) {
          const { id, title, content } = action.payload
          const existingPost = state.posts.find(post => post.id === id)
          if (existingPost) {
              existingPost.title = title
              existingPost.content = content
          }
      }
  },
  extraReducers: builder => {
    builder
    .addCase(fetchPosts.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = 'succeed'
      state.posts = state.posts.concat(action.payload)
    })
    .addCase(fetchPosts.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
    .addCase(addNewPost.fulfilled, (state, action) => {
      state.posts.push(action.payload)
    })
  }
})

export const { postAdded, postUpdated } = postsSlice.actions

export default postsSlice.reducer

//reusable selector functions so other components can use which mean if we update our data format, we don't have to go into those components and update them all
export const selectAllPosts = state => state.posts.posts

export const selectPostById = (state, postId) =>
  state.posts.posts.find(post => post.id === postId)