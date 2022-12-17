import { Branch } from "./branch";
import { Role } from "./role";

export class UserDto {
  id: string;
  isActive: boolean;
  phoneNumber: string;
  email: string;
  fullname: string;
  gender: string;
  birthday: Date;
  role: Role;
  branch: Branch;
}

export class UserCreate {
  phoneNumber: string;
  password: string;
  fullname: string;
  email: string;
  gender: string;
  role: string;
  branch: string;
}

export class UserToken{
    phoneNumber: string = '';
    accessToken: string = '';
}
export class UserRegister{
    phoneNumber: string = '';
    password: string = '';
    confirmPassword: string = '';
}
export class UserLogin{
    phoneNumber: string = '';
    password: string = '';
    rememberMe: boolean = false;
}

export class UserChangePassword {
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
}
