import prisma from "../dbStrategy/postgres";
import { User } from "@prisma/client"

export type UserData = Omit<User, 'id'>

async function create(user: UserData) {
  return prisma.user.create({
    data: { 
        email: user.email,
        name: user.name,
        password: user.password
         
     }
  })  
}

async function findByEmail(email: string) {
    return prisma.user.findFirst({
        where: {
            email,
        }
    })
}

export const userRepository = {
  create,
  findByEmail
}
