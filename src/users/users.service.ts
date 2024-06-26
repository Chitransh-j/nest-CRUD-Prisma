import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Leanne Graham",
            "email": "Sincere@april.biz",
            "role": "INTERN",
        },
        {
            "id": 2,
            "name": "Ervin Howell",
            "email": "Shanna@melissa.tv",
            "role": "INTERN",
        },
        {
            "id": 3,
            "name": "Clementine Bauch",
            "email": "Nathan@yesenia.net",
            "role": "ENGINEER",
        },
        {
            "id": 4,
            "name": "Patricia Lebsack",
            "email": "Julianne.OConner@kory.org",
            "role": "ENGINEER",
        },
        {
            "id": 5,
            "name": "Chelsey Dietrich",
            "email": "Lucio_Hettinger@annie.ca",
            "role": "ADMIN",
        }
    ]

    findAll(role ?: 'INTERN' |'ENGINEER' | 'ADMIN'){
        if (role){
            const userArr = this.users.filter(user => user.role===role)
            if(userArr.length ===0){
                throw new NotFoundException('User Role Not Found')
            }
            return userArr
        }
        return this.users
    }

    findOne(id : number){
        const User = this.users.find(user =>user.id===id) ;
        if(!User)throw new NotFoundException('User with Given Id doesn\'t exist')
        return User;
    }

    create(user : CreateUserDTO) {
        const usersbyHighestId = [...this.users].sort((a,b) => b.id-a.id) // mimicking what a db would do :) 
        
        const newUser ={
            id : usersbyHighestId[0].id +1,
            ...user
        }
        
        this.users.push(newUser)
        return newUser
    }
    
    update( id: number , updatedUser : UpdateUserDTO  ){
        this.users = this.users.map( (user) => {
            if (user.id ===id)
                return {...user,...updatedUser} //make all the changes in the main array itself :)
            else 
                return user
        });

        return this.findOne(id) // apna hi method hai
    }

    delete(id : number){
        const removedUser = this.findOne(id);
        this.users =  this.users.filter(user => user.id!== id);
        return removedUser;
    }

}
