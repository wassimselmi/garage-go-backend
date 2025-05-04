import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>, // Injects the User model
  ) {}

  // Create a new user
  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { email, password } = createUserDto;
  
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
  
    const savedUser = await createdUser.save();
    const userObject = savedUser.toObject(); // Convert to plain object
    const { password: _, ...sanitizedUser } = userObject; // Exclude the password field
    return sanitizedUser; // Return the sanitized object
  }

  // Find a user by their email
  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  // Find a user by their ID
  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec(); // Return a Mongoose document or null
  }
}