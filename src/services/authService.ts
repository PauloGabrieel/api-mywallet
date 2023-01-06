import bcrypt from "bcrypt";
import { UserData, userRepository } from "../repositories/userRepository";

export type ErrorType = {name: string , message: string }

function BadRequest(): ErrorType {
  return { name: 'BadRequest', message: 'Já existe um usuário com esse email'};
};

export async function create( user: UserData  ) {
  await validadeUniqueEmailOrFail(user.email);
  
  const hashPassword = await bcrypt.hash(user.password, 10);
  user.password = hashPassword;

  return userRepository.create(user);    
};

async function validadeUniqueEmailOrFail(email: string) {
  const emailAlready = await userRepository.findByEmail(email);
  
  if(emailAlready) {
    throw BadRequest();
  }; 
};
