import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUser : User) {
    return this.usersService.create(createUser);
    // create(@Body() createUserDto : createUserDto) {
    //return this.usersService.create(createUserDto)
  }

  @Get()
  findAll() { 
   
    return {status:"success",users:this.usersService.findAll() };
  }
   /*
   findAll(@Query)-- se importa en el controller
  f  indAll(@Query() query){
    console.log(query)
    status {status :"success", users: this.usersService.findAll()  }
  } localhost.../users/?filtro=1
   localhost.../users/?filtro=1&filtro2=2
   */
  
   @Get(':id')
  findOne(@Param('id') id: string) {
    if(isNaN(+id)) {throw new HttpException('Invalid Param',HttpStatus.BAD_REQUEST)
    //return this.usersService.findOne(+id);
  }const user = this.usersService.findOne(+id)
    if(!user){
      throw new HttpException('User Not found',HttpStatus.NOT_FOUND)
   }return{
    status:'success',
    payload: user
   }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
