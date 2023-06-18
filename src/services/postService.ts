import { off } from "process";
import { Post } from "../models/model";
import { v4 as uuidv4 } from "uuid";

const PostList: Post[] = [];

export function addPost(post: Post) {
  PostList.push(post);
  return post;
}
export function findPostById(id: string) {
  const postIndex = PostList.findIndex((post) => post.id === id);
  if (postIndex === -1) {
    return "Post not found";
  }
  return {
    post: PostList[postIndex],
    index: postIndex,
  };
}
export function updatePost(index: number, post: any) {
  console.log('updatedPost', post);
  PostList[index].title = post.title;
  PostList[index].content = post.content;
  PostList[index].createAt = post.createAt;
  return post;
}
export function validatePost(post: Post): boolean {
  if (!post.authorId || !post.authorUserName || !post.content || !post.title) {
    return false;
  }
  return true;
}
export function getPostByDesc(offset: number, limit: number) {
  const endIndex = offset + limit + 1;
  const postArray = PostList.slice(offset, endIndex);
  postArray.sort((a: Post, b: Post) => {
    const aDate = new Date(a.createAt);
    const bDate = new Date(b.createAt);
    return aDate > bDate ? -1 : 1;
  });
  return {posts: postArray, total:PostList.length };
}
export function deletePost(index: number) {
  PostList.splice(index, 1);
  return true;
}

export function findPostByTitle(title: string, authorId: string){
  const post = PostList.find(post => post.title === title && post.authorId === authorId);
  return post ? true : false;
}
