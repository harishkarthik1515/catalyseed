export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'startup' | 'institute' | 'investor' | 'general';
  status: 'pending' | 'verified' | 'rejected';
  avatar?: string;
  createdAt: string;
  profile?: {
    company?: string;
    designation?: string;
    location?: string;
    bio?: string;
    website?: string;
    linkedin?: string;
    twitter?: string;
    fundingStage?: string;
    investmentRange?: string;
    sectors?: string[];
    establishedYear?: string;
    studentCount?: string;
    researchAreas?: string[];
  };
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (userData: SignupData) => Promise<boolean>;
  isLoading: boolean;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  role: User['role'];
  profile?: Partial<User['profile']>;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: User;
  category: string;
  tags: string[];
  likes: number;
  replies: number;
  createdAt: string;
  status: 'published' | 'pending' | 'rejected';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  organizer: User;
  date: string;
  location: string;
  type: 'hackathon' | 'workshop' | 'seminar' | 'networking';
  status: 'published' | 'pending' | 'rejected';
  participants: number;
  maxParticipants: number;
  registrationDeadline: string;
  tags: string[];
  prizePool?: string;
  createdAt: string;
}