import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

    // Dependency injection of the service inside the controller
    constructor(private readonly usersService: UsersService) {}

    // route that supports optional query parameters as well
    // E.g. `role` is the optional query parameter with default values defined: 'INTERN' | 'ENGINEER' | 'ADMIN'
    // /users?role=ADMIN
    @Get()
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.usersService.findAll(role);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        // Unary plus (+) operator converts the string param to integer same as parseInt
        // return this.usersService.findOne(+id)
        return this.usersService.findOne(id)
    }

    @Post()
    create(@Body(ValidationPipe) createUserDto : CreateUserDto) {
        return this.usersService.create(createUserDto)
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        // return this.usersService.update(+id, updateUserDto)
        return this.usersService.update(id, updateUserDto)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        // return this.usersService.delete(+id);
        return this.usersService.delete(id);
    } 
}
