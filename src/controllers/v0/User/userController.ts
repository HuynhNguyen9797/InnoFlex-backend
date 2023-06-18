import { Router, Request, Response } from "express";
import { findUserByEmail, findUserByUserName } from "../../../services/userService";
import { User } from "../../../models/model";
import {generatePassword, generateToken, comparePasswords} from '../../../utils'
import { v4 as uuidv4 } from "uuid";
import {addUser} from '../../../services/userService'

const UserRouter = Router();


UserRouter.post('/', async (req: Request, res: Response) => {
  console.log('body', req.body)
  const {username, email, password} = req.body;
  if(findUserByEmail(email)){
    return res.status(400).json('Email alredy exist!');
  }
  if(findUserByUserName(username)){
    return res.status(400).json('UserName alredy exist!');
  }
  const hashPassword = await generatePassword(password);
  const id = uuidv4()
  const user : User = {
    userName: username,
    password: hashPassword,
    createAt: new Date(),
    updateAt: new Date(),
    id,
    email
  };
  const token = generateToken(user);
  addUser(user);
  console.log(user);
  res.status(201).json({
    success: true,
    username,
    id, 
    token
  })
})

UserRouter.post('/login', async (req: Request, res: Response) => {
  const {username, password} = req.body;
  if(!username || !password){
    return res.status(401).json('Missing fields!')
  };
  const user = findUserByUserName(username);
  if(!user){
    return res.status(401).json('User not found!')
  };
  const authValid = await comparePasswords(password, user.password);

  if (!authValid) {
    return res.status(401).json( 'Password was invalid.');
  }
  const token = generateToken(user);
  return res.status(200).json({token, username: user.userName, id: user.id});
})


export default UserRouter;