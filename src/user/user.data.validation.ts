import { Contains, IsEmail, IsNotEmpty, Length, Matches } from "class-validator";

export class RegisterUserDTO{
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    gender:string;

    @IsNotEmpty()
    number:number;

    @IsNotEmpty()
    @Length(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{
        message:"Password should atleast contain one uppercase,one lowercase,one digit and one special symbol"
    })
    password:string;
}

export class loginDTO{
    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsNotEmpty()
    @Length(8)
    password:string
}