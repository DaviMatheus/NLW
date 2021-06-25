import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { sign } from "jsonwebtoken";
import { router } from "../routes";

interface IAuthenticateRequest{

    email: string,
    password: string,

}

class AuthenticateUsersService{

    async execute({email, password} : IAuthenticateRequest){
        const usersRepositories = getCustomRepository(UsersRepositories);

        const user = await usersRepositories.findOne({
            email,
        });

        if(!user){
            throw new Error("Email/Password Incorrect");
        }

        const userpassword = await compare(password, user.password);

        if(!userpassword){
            throw new Error("Email/Password Incorrect");
        }

        const token = sign({
            email: user.email,
        }, "d96788971524fe4f4d51bec85cddd62a",
        {
            subject: user.id, 
            expiresIn: "1d",
        });
        
        return token;
    }

}

export { AuthenticateUsersService }