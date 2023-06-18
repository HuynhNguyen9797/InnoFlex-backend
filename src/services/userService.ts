import { User } from "../models/model";
import { v4 as uuidv4 } from "uuid";

const UserList: User[] = [];

export function addUser(user: User) {
  const newUser: User = {
    ...user,
    createAt: new Date(),
    updateAt: new Date(),
  };
  UserList.push(newUser);
  return newUser;
};

export function findUserByUserName(username: string){
  const user = UserList.find((user) => user.userName === username);
  return user;
}

export function findUserByEmail(email: string){
  const user = UserList.find((user) => user.email === email);
  return user ? true : false
}
