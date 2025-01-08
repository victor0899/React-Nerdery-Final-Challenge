export enum UserType {
    ADMIN = 'ADMIN',
    USER = 'USER'
  }
  
  export interface User {
    id: string;
    fullName: string;
    email: string;
    avatar: string;
    type: UserType;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ProfileData {
    profile: User;
  }
