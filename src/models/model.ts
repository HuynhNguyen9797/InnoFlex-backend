

export interface Post {
  id: string,
  authorId: string,
  authorUserName: string,
  title: string,
  content: string,
  createAt: Date,
  updateAt: Date,
}

export interface User {
  id : string,
  userName: string,
  email: string, 
  password: string,
  createAt: Date,
  updateAt: Date,
}

