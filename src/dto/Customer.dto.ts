import {IsEmail , isEmpty , Length } from "class-validator";


export class customerSignupInput {
    @IsEmail()
  email:string;

  @Length(7 , 14)
  password:string;

  @Length(7 , 14)
  phone:string;

}

export class customerLoginInput {
    @IsEmail()
    email:string;

    @Length(7 , 14)
    password:string;
}


export interface customerPayload {
    _id:string;
    email:string;
    verify:boolean;
}

export class editCustomerInput {
    
    firstName:string;
    
    lastName:string;
    @Length(6 ,16)
    address:string;
}