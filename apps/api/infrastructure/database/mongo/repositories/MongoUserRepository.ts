import { IUserRepository } from "../../../../domain/repositories/IUserRepository";
import { User } from "../../../../domain/entities/User";
import { UserModel } from "../models/UserModel";

export class MongoUserRepository implements IUserRepository {
    async findById(id: string): Promise<User | null> {
        const user = await UserModel.findById(id);
        if(!user) return null;
        return this.toDomain(user)
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({ email: email.toLowerCase()});
        if(!user) return null;
        return this.toDomain(user)
    }

    async create(user: User): Promise<User> {
        const newUser = new UserModel({
            email: user.email,
            name: user.name,
            password: user.password,
            phone: user.phone
        })
        const saved = await newUser.save()
        return this.toDomain(saved)
    }

    async update(id: string, userData: Partial<User>): Promise<User | null> {
        const user = await UserModel.findByIdAndUpdate(
            id,
            { $set: userData},
            { new: true, runValidators: true}
        )
        if(!user) return null;
        return this.toDomain(user);
    }

    async delete(id: string): Promise<boolean> {
        const result = await UserModel.findByIdAndDelete(id);
        return result !== null;
    }
    
    private toDomain(userDoc: any): User{
        return{
            id: userDoc._id.toString(),
            email: userDoc.email,
            name: userDoc.name,
            password: userDoc.password,
            phone: userDoc.phone,
            createdAt: userDoc.createdAt,
            updatedAt: userDoc.updatedAt
        }
    }
}