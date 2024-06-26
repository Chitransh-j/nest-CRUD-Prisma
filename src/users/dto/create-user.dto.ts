//VALIDATION ->kinda like zod
import { IsEmail ,IsEnum, IsEmpty,IsString} from "class-validator";

export class CreateUserDTO {
    @IsEmpty()
    @IsString ()
    name:string;

    @IsEmail()
    email:string;
    @IsEnum(['INTERN','ENGINEER','ADMIN'],{
        message:'Please Enter a valid type'
    })
    role : 'INTERN' | 'ENGINEER' | 'ADMIN' ;
}

