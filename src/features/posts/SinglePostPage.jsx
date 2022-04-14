import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { PostAuthor } from "./PostAuthor"
import { selectPostById } from "./postsSlice"

function SinglePostPage() {
    const params = useParams()
    const postId = params.postId
    const post = useSelector(state => selectPostById(state, postId))


    if(!post) {
        return(
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }
  return (
    <section>
        <article className="post">
            <h2>{post.title}</h2>
            <PostAuthor userId={post.user} />
            <p className="post-content">{post.content}</p>
            <Link to={`/posts/edit/${params.postId}`} className="button">Edit Post</Link>
        </article>
    </section>
  )
}
export default SinglePostPage