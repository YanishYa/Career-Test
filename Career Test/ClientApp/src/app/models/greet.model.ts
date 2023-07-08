import { Gender } from "./enums/gender.enum";

export interface GreetModel {
  name: string;
  gender: Gender;
  email: string;
}
