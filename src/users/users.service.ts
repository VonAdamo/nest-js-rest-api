import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Alice",
            "email": "alice@example.com",
            "role": "INTERN"
        },
        {
            "id": 2,
            "name": "Bob",
            "email": "bob@example.com",
            "role": "INTERN"
        },
        {
            "id": 3,
            "name": "Charlie",
            "email": "charlie@example.com",
            "role": "DEVELOPER"
        },
        {
            "id": 4,
            "name": "Dave",
            "email": "dave@example.com",
            "role": "DEVELOPER"
        },
        {
            "id": 5,
            "name": "Eve",
            "email": "eve@example.com",
            "role": "ADMIN"
        }
    ]

    findAll(role?: "INTERN" | "DEVELOPER" | "ADMIN") {
        if (role) {
            const rolesArray = this.users.filter(user => user.role === role)
            if (rolesArray.length === 0)
            throw new NotFoundException("User Role not found");
            return rolesArray;
        }
        return this.users;
    }

    findOne(id: number){
        const user = this.users.find(user => user.id === id)

        if (!user) {
            throw new NotFoundException("User not found");
        }

        return user
    }

    create(createUserDto: CreateUserDto) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id)
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...createUserDto
        }
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updatedUserDto:  UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return {...user, ...updatedUserDto}
            }
            return user;
        })
        return this.findOne(id);
    }

    delete(id: number) {
        const removedUser = this.findOne(id);

        this.users = this.users.filter(user => user.id !== id);

        return removedUser;
    }
}
