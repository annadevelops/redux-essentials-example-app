import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { useNavigate } from "react-router"

import { postUpdated, selectPostById } from "./postsSlice"


function EditPostForm() {
    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()

    const post = useSelector(state => selectPostById(state, params.postId))

    const [title, setTitle] = useState(post.title)
    const [content, setContent] = useState(post.content)

    const onTitleChanged = (e) => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(postUpdated({
                id: params.postId,
                title,
                content
            }))
        }
        navigate(`/posts/${params.postId}`)
    }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  )
}
export default EditPostForm