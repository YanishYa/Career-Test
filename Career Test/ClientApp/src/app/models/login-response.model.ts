import { Gender } from './enums/gender.enum';
export interface LoginResponse {
  id: number;
  email: string;
  roles: string;
  token: string;
  gender: Gender;
  name: string;
  isProfileFilled: boolean;
}
