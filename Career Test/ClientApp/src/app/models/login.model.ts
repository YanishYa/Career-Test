import { Gender } from "./enums/gender.enum";

export interface LoginModel {
  email: string;
  name: string
  gender: Gender;
}
