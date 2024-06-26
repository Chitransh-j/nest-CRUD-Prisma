import { Body, Controller, Delete, Get, 
Param, Patch, Post, Query,ParseIntPipe ,ValidationPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

///firstly put all the static routes and dynamic routes later

@Controller('users')    // /users
export class UsersController {
    //creates an instance
    constructor(private readonly usersService: UsersService){}  // ->singleton 

    @Get()  // GET /users or /users?role=value  (filtering by value)
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN'){
        return this.usersService.findAll(role);
    }   

    @Get(':id') // GET /users/:id
    findOne(@Param('id',ParseIntPipe) id:number){ // basically parese the given route as the param to its provider
        return this.usersService.findOne(id);
    } 

    @Post()
    create(@Body(ValidationPipe) createduser: CreateUserDTO){
        return this.usersService.create(createduser);
    }

    @Patch(':id')
    update(@Param('id',ParseIntPipe) id : number, @Body(ValidationPipe) updatedUser : UpdateUserDTO){
        return this.usersService.update(id,updatedUser);
    }

    @Delete(':id')
    delete(@Param('id',ParseIntPipe) id: number){
        return this.usersService.delete(id) //same as parseInt
    }

}
