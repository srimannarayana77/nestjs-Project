import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

export async function filterUsers(userModel: Model<UserDocument>, params: any): Promise<User[]> {
  try {
    let filters: any = {};
    const { name, user_name, email, user_type, phone_number} = params;
    
    if (name) {
      filters.name = { $regex: new RegExp(name, 'i') };
    }
    if (user_name) {
      filters.user_name = user_name;
    }
    if (email) {
      filters.email = email;
    }
    if (user_type) {
      filters.user_type = user_type;
    }
    if (phone_number) {
      filters.phone_number = phone_number;
    }
    return filters;
  } catch (error) {
    console.error('Error filtering users:', error);
    throw error;
  }
}
