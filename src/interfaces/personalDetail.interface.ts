import{User} from "../schemas/user.schema"
export interface PersonalDetails {
  user_id?: User
  date_of_birth: Date;
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: number;
  educational_details?: {
    degree: string;
    institution: string;
    year_of_completion: number;
  }[];
  skills?: string[];
}
