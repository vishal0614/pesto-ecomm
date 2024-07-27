import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ username, password: hashedPassword });
    return user.save();
  }

  async findOne(username: string): Promise<User | null | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  async findOneByToken(token: string): Promise<User | null | undefined> {
    return this.userModel.findOne({ access_token: token });
  }

  async updateToken(userId: string, accessToken: string): Promise<void> {
    try {
      await this.userModel.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { access_token: accessToken } },
      );
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  }
}
