export interface User {
  id: string;
  email: string;
  name: string;
  role: 'institute' | 'incubation_manager' | 'accelerator' | 'investor' | 'mentor' | 'founder' | 'admin';
  avatar?: string;
  institute?: string;
  bio?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  expertise?: string[];
  achievements?: string[];
  verified: boolean;
  createdAt: string;
  connections?: number;
  followers?: number;
  following?: number;
  posts?: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  name: string;
  role: User['role'];
  institute?: string;
}