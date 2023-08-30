import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity.js';
export declare class UsersService {
    users: Array<User>;
    lastId: number;
    constructor();
    create(createUserDto: User): User[];
    findAll(): User[];
    findOne(id: number): User;
    update(id: number, updateUserDto: UpdateUserDto): User;
    remove(id: number): string;
}
