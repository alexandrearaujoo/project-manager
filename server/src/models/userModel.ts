import AppError from "../errors";

import { UserRequest, ModelInterface } from "../interfaces/user.interface";
import { prisma } from "../../prisma/prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserModel implements ModelInterface {
  async createUser(data: UserRequest) {
    const emailExists = await this.getUserByEmail(data.email);

    if (emailExists) {
      throw new AppError(400, "This email already exists");
    }

    return await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        hashedPassword: await bcrypt.hash(data.password, 10),
      },
    });
  }
  async createUserSession({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new AppError(404, "Invalid credentials");
    }
    const passwordMatch = await bcrypt.compare(password, user.hashedPassword!);

    if (!passwordMatch) {
      throw new AppError(404, "Invalid credentials");
    }

    const userTokenExists = await prisma.token.findUnique({
      where: { userId: user.id },
    });

    if (userTokenExists) {
      return { ...user, token: userTokenExists.token };
    }

    const token = jwt.sign(
      { email: user.email, name: user.name },
      process.env.JWT_SECRET as string,
      {
        subject: user.id,
      }
    );

    const userToken = await prisma.token.create({
      data: { token, userId: user.id },
    });

    return { ...user, token: userToken.token };
  }
  async getUserByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }

  async getUserById(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new AppError(404, "User not found");
    }

    return user;
  }
}

export default UserModel;
