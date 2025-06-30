import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, SignupData } from '../types/auth';
import { mockUsers } from '../data/mockData';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true
  });

  useEffect(() => {
    // Check for stored auth data on mount
    const storedUser = localStorage.getItem('catalyseed_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          loading: false
        });
      } catch (error) {
        localStorage.removeItem('catalyseed_user');
        setAuthState(prev => ({ ...prev, loading: false }));
      }
    } else {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setAuthState(prev => ({ ...prev, loading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find matching user in mock data
    const matchingUser = mockUsers.find(u => u.email === credentials.email);
    
    // If no matching user, use email to determine role for demo purposes
    const mockUser: User = matchingUser ? {
      ...matchingUser,
      id: matchingUser.id,
      email: matchingUser.email,
      name: matchingUser.name,
      role: matchingUser.role,
      avatar: matchingUser.avatar,
      bio: matchingUser.bio,
      location: matchingUser.location,
      institute: matchingUser.institute,
      verified: matchingUser.verified,
      createdAt: matchingUser.createdAt,
      connections: matchingUser.connections,
      followers: matchingUser.followers,
      following: matchingUser.following,
      posts: matchingUser.posts,
      expertise: matchingUser.expertise,
      achievements: matchingUser.achievements
    } : {
      id: '999',
      email: credentials.email,
      name: credentials.email.includes('admin') ? 'Admin User' : 
            credentials.email.includes('institute') ? 'Institute Manager' :
            credentials.email.includes('investor') ? 'Investor User' :
            credentials.email.includes('mentor') ? 'Mentor User' :
            credentials.email.includes('founder') ? 'Founder User' :
            credentials.email.includes('incubation') ? 'Incubation Manager' :
            credentials.email.includes('accelerator') ? 'Accelerator Manager' :
            'John Doe',
      role: credentials.email.includes('admin') ? 'admin' :
            credentials.email.includes('institute') ? 'institute' :
            credentials.email.includes('investor') ? 'investor' :
            credentials.email.includes('mentor') ? 'mentor' :
            credentials.email.includes('founder') ? 'founder' :
            credentials.email.includes('incubation') ? 'incubation_manager' :
            credentials.email.includes('accelerator') ? 'accelerator' :
            'founder',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      institute: credentials.email.includes('institute') ? 'IIT Madras' : undefined,
      bio: 'Passionate about innovation and entrepreneurship',
      location: 'Chennai, Tamil Nadu',
      verified: true,
      createdAt: '2024-01-01',
      connections: 450,
      followers: 1200,
      following: 350,
      posts: 45,
      expertise: ['Innovation', 'Entrepreneurship', 'Technology'],
      achievements: ['Best Startup Award 2023', 'Innovation Excellence']
    };

    localStorage.setItem('catalyseed_user', JSON.stringify(mockUser));
    
    setAuthState({
      user: mockUser,
      isAuthenticated: true,
      loading: false
    });
  };

  const signup = async (data: SignupData) => {
    setAuthState(prev => ({ ...prev, loading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      name: data.name,
      role: data.role,
      institute: data.institute,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'New member of the Catalyseed community',
      location: 'Tamil Nadu, India',
      verified: false,
      createdAt: new Date().toISOString(),
      connections: 0,
      followers: 0,
      following: 0,
      posts: 0,
      expertise: [],
      achievements: []
    };

    localStorage.setItem('catalyseed_user', JSON.stringify(newUser));
    
    setAuthState({
      user: newUser,
      isAuthenticated: true,
      loading: false
    });
  };

  const logout = () => {
    localStorage.removeItem('catalyseed_user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      loading: false
    });
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!authState.user) return;
    
    const updatedUser = { ...authState.user, ...data };
    localStorage.setItem('catalyseed_user', JSON.stringify(updatedUser));
    
    setAuthState(prev => ({
      ...prev,
      user: updatedUser
    }));
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      signup,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};