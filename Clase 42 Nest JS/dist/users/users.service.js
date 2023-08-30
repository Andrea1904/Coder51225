"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
let UsersService = class UsersService {
    constructor() {
        (this.users = []), (this.lastId = 0);
    }
    create(createUserDto) {
        if (!this.users.some((user) => user.email === createUserDto.email)) {
            this.users.push({ id: ++this.lastId, ...createUserDto });
            return this.users.filter((user) => user.email === createUserDto.email);
        }
        throw new common_1.HttpException('No encontro el user', common_1.HttpStatus.NOT_FOUND);
    }
    findAll() {
        return this.users;
    }
    findOne(id) {
        return this.users.find((user) => user.id === id);
    }
    update(id, updateUserDto) {
        const validUser = this.findOne(id);
        if (validUser) {
            Object.assign(validUser, updateUserDto);
            return validUser;
        }
        throw new common_1.HttpException('No encontro el user', common_1.HttpStatus.NOT_FOUND);
    }
    remove(id) {
        const validUser = this.findOne(id);
        if (validUser) {
            this.users.find((user) => user.id !== id);
            return `This action removes a #${id} user`;
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UsersService);
//# sourceMappingURL=users.service.js.map