import { Gender } from "./enums/gender.enum";

export interface RegisterModel {
  // for register
  email: string;
  password: string;

  // additional data
  phone: string | null;
  fio: string | null;
  gender: Gender;
  age: number | null;
  city: string | null;
  school: string | null;
  class: string | null;
}
