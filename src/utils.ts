// add comment
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { User } from './models/model';
import config from './config';

export async function generatePassword(plainTextPassword: string) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(plainTextPassword, salt);
}

export function generateToken(user: User): string {
  return jwt.sign({id: user.id}, config.jwt_secret, {expiresIn: '1h'});
}

export async function comparePasswords(plainTextPassword: string, hash: string) {
  return await bcrypt.compare(plainTextPassword, hash);
}
