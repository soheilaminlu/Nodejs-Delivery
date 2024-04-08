export interface createVandorInput { 
  
    ownerName:string;
    foodType: [string];
    pinCode:  number;
    address: string;
    password: string;
    phoneNumber: string;
    email: string;
    name: string;

}

export interface editVandorInput {
  foodType:[string];
  name:string;
  address:string;
  phoneNumber:string;
}


export interface vandorLoginInput {
    email:string;
    password:string;
}


export interface vandorPayload { 
  _id:string;
  email:string;
   name:string;
}