import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";
interface IUserRequest {

    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService {

    async execute({ name, email, admin = false, password}: IUserRequest) {

        const UsersRepository = getCustomRepository(UsersRepositories);

        if (!email) {
            throw new Error("Incorrect Email!!");
        }

        const UserAlreadyExists = await UsersRepository.findOne({
            email,
        });

        if (UserAlreadyExists) {
            throw new Error("User already exists!!");

        }

        const passwordHash = await hash(password, 8);

        const User = UsersRepository.create({
            name,
            email,
            admin,
            password: passwordHash,
        });

        await UsersRepository.save(User);

        return User;
    }

}

export { CreateUserService };
