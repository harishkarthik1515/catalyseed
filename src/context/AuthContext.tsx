import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType, SignupData } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo credentials
export const demoCredentials = {
  admin: { email: 'admin@catalyseed.com', password: 'admin123' },
  startup: { email: 'startup@example.com', password: 'startup123' },
  institute: { email: 'institute@example.com', password: 'institute123' },
  investor: { email: 'investor@example.com', password: 'investor123' },
  general: { email: 'user@example.com', password: 'user123' }
};

// Demo users
const demoUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@catalyseed.com',
    role: 'admin',
    status: 'verified',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: '2024-01-01T00:00:00Z',
    profile: {
      designation: 'Platform Administrator',
      location: 'Chennai, Tamil Nadu'
    }
  },
  {
    id: '2',
    name: 'TechStart Innovations',
    email: 'startup@example.com',
    role: 'startup',
    status: 'verified',
    avatar: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: '2024-01-15T00:00:00Z',
    profile: {
      company: 'TechStart Innovations',
      designation: 'Founder & CEO',
      location: 'Chennai, Tamil Nadu',
      bio: 'Building AI-powered solutions for rural education',
      website: 'https://techstart.com',
      fundingStage: 'Seed',
      sectors: ['EdTech', 'AI', 'Rural Development']
    }
  },
  {
    id: '3',
    name: 'IIT Madras',
    email: 'institute@example.com',
    role: 'institute',
    status: 'verified',
    avatar: 'https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: '2024-01-10T00:00:00Z',
    profile: {
      company: 'Indian Institute of Technology Madras',
      designation: 'Innovation Cell Director',
      location: 'Chennai, Tamil Nadu',
      establishedYear: '1959',
      studentCount: '10000+',
      researchAreas: ['AI/ML', 'IoT', 'Blockchain', 'Robotics']
    }
  },
  {
    id: '4',
    name: 'Chennai Angels',
    email: 'investor@example.com',
    role: 'investor',
    status: 'verified',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: '2024-01-20T00:00:00Z',
    profile: {
      company: 'Chennai Angels',
      designation: 'Managing Partner',
      location: 'Chennai, Tamil Nadu',
      bio: 'Early-stage investor focused on Tamil Nadu startups',
      investmentRange: '₹50L - ₹5Cr',
      sectors: ['FinTech', 'HealthTech', 'EdTech', 'AgriTech']
    }
  },
  {
    id: '5',
    name: 'Priya Sharma',
    email: 'user@example.com',
    role: 'general',
    status: 'verified',
    avatar: 'https://images.pexels.com/photos/3184340/pexels-photo-3184340.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: '2024-02-01T00:00:00Z',
    profile: {
      designation: 'Software Engineer',
      location: 'Coimbatore, Tamil Nadu',
      bio: 'Passionate about technology and innovation'
    }
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('catalyseed_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check demo credentials
    const foundUser = demoUsers.find(u => u.email === email);
    const validCredentials = Object.values(demoCredentials).some(
      cred => cred.email === email && cred.password === password
    );
    
    if (foundUser && validCredentials) {
      setUser(foundUser);
      localStorage.setItem('catalyseed_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('catalyseed_user');
  };

  const signup = async (userData: SignupData): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if email already exists
    const existingUser = demoUsers.find(u => u.email === userData.email);
    if (existingUser) {
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      status: userData.role === 'admin' ? 'verified' : 'pending',
      createdAt: new Date().toISOString(),
      profile: userData.profile
    };
    
    // Add to demo users (in real app, this would be API call)
    demoUsers.push(newUser);
    
    setIsLoading(false);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};