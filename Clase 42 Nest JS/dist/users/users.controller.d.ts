import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity.js';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUser: User): User[];
    findAll(): {
        status: string;
        users: User[];
    };
    findOne(id: string): {
        status: string;
        payload: User;
    };
    update(id: string, updateUserDto: UpdateUserDto): User;
    remove(id: string): string;
}
