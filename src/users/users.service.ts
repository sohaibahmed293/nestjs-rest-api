import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'INTERN' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'ENGINEER' },
        { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'ADMIN' },
        { id: 4, name: 'Bob Brown', email: 'bob@example.com', role: 'INTERN' },
        { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'ENGINEER' }
    ];

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            return this.users.filter(user => user.role === role);
        }
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    create(createUserDto: CreateUserDto) {
        const userByHighestId = [...this.users].sort((a, b) => b.id - a.id)
        const newUser = {
            'id': userByHighestId[0].id + 1,
            ...createUserDto
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: number, updatedUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                // update the current user properties with the updatedUserDto properties
                return { ...user, ...updatedUserDto }
            }
            return user;
        })

        // after update, return the updated user.
        return this.findOne(id)
    }

    delete(id: number) {
        const removedUser = this.findOne(id);
        this.users = this.users.filter(user => user.id !== id)
        return removedUser;
    }
}
