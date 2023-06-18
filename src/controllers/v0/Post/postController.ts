import { Router, Request, Response } from "express";
import { requireAuthen } from "../../../middleware/authenMiddleware";
import { findPostByTitle, addPost, getPostByDesc, findPostById, updatePost, deletePost } from "../../../services/postService";
import { Post } from "../../../models/model";
import { v4 as uuidv4 } from "uuid";

const PostRouter = Router();

PostRouter.get('/', (req: Request, res: Response) => {
  console.log('req', req.query);
  const {offset, limit} = req.query;
  const {posts, total } = getPostByDesc(Number(offset), Number(limit))
  const result = {
    success: true,
    total,
    posts
  }
  res.status(200).json(result);
})
PostRouter.post("/", requireAuthen, async (req: Request, res: Response) => {
  const { authorId, authorName, title, content } = req.body;
  if (findPostByTitle(title, authorId)) {
    return res
      .status(400)
      .json("Post with the same title already exists. Please change the title");
  }
  const post: Post = {
    title,
    content,
    authorId,
    authorUserName: authorName,
    id: uuidv4(),
    createAt: new Date(),
    updateAt: new Date(),
  };
  addPost(post);
  return res.status(201).json("Create Post Successfully!");
});

PostRouter.patch('/:id', (req: Request, res: Response) => {
    const postId = req.params['id'];
    const {title, content} = req.body;
    const foundPost = findPostById(postId);
    if(foundPost === 'Post not found'){
      return res.status(500).json('Cannot find the post. Please try again!')
    };
    const {post, index} = foundPost;
    const updatedPost: any= {
      ...post,
      title,
      content,
      updateAt: new Date()
    }
    updatePost(index, updatedPost);
    return res.status(200).json('Update successfully!')
})

PostRouter.delete('/:id', (req: Request, res: Response) => {
  const postId = req.params['id'];
  const foundPost = findPostById(postId);
  if(foundPost === 'Post not found'){
    return res.status(500).json('Cannot find the post. Please try again!')
  };
  deletePost(foundPost.index)
  return res.status(200).json('Delete successfully!')
})

export default PostRouter;
