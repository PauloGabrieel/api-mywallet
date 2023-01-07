import { Request, Response } from "express";
import { UserData } from "../repositories/userRepository";
import { signUpSchema, } from "../schema/userSchema";
import * as authService from "../services/authService";

async function create(req: Request, res: Response) {
  const userData = req.body as UserData;
  
  try {
    const validation = signUpSchema.validate(userData,{abortEarly: false})
    if(validation.error) {
      return res.status(400).send(validation.error.message)
    }
    await authService.create(userData);
    return res.status(201).send("Usuário criado");
    
  } catch (error) {
    if(error.name === 'BadRequest') {
      return res.status(401).send(error.message);
    }
  }
}

async function login(req: Request, res: Response) {
  return
}

export { create, login };