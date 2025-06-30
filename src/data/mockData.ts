// Centralized Mock Data for Catalyseed Platform

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'institute' | 'incubation_manager' | 'accelerator' | 'investor' | 'mentor' | 'founder';
  avatar: string;
  bio: string;
  location: string;
  institute?: string;
  verified: boolean;
  createdAt: string;
  connections: number;
  followers: number;
  following: number;
  posts: number;
  expertise: string[];
  achievements: string[];
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  stats: Record<string, any>;
}

export interface MockStartup {
  id: string;
  name: string;
  founder: string;
  founderId: string;
  institute: string;
  sector: string;
  stage: string;
  valuation: string;
  employees: number;
  fundingRaised: string;
  description: string;
  logo: string;
  tags: string[];
  metrics: {
    revenue: string;
    growth: string;
    customers: number;
  };
}

export interface MockEvent {
  id: string;
  title: string;
  type: 'hackathon' | 'demo_day' | 'workshop' | 'conference' | 'networking';
  institute: string;
  date: string;
  location: string;
  participants: number;
  status: 'upcoming' | 'live' | 'completed';
  description: string;
  image: string;
  organizer: string;
  prizes?: string;
  registrations: number;
  capacity: number;
}

export interface MockInvestment {
  id: string;
  investorId: string;
  startupId: string;
  amount: string;
  date: string;
  round: string;
  status: 'completed' | 'pending' | 'due_diligence';
}

export interface MockMentorship {
  id: string;
  mentorId: string;
  menteeId: string;
  startDate: string;
  status: 'active' | 'completed' | 'paused';
  sessions: number;
  rating: number;
  focus: string[];
}

export interface MockConnection {
  id: string;
  userId: string;
  connectedUserId: string;
  status: 'connected' | 'pending' | 'requested';
  connectedAt: string;
  mutualConnections: number;
}

export interface MockPost {
  id: string;
  authorId: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  replies: number;
  isPinned: boolean;
  isSolved: boolean;
  upvotes: number;
  downvotes: number;
}

export interface MockMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'text' | 'file' | 'image';
}

export interface MockNotification {
  id: string;
  userId: string;
  type: 'connection' | 'message' | 'event' | 'investment' | 'mentorship' | 'system';
  title: string;
  content: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

// Mock Users Data
export const mockUsers: MockUser[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh@iitmadras.ac.in',
    role: 'institute',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Director of Innovation at IIT Madras, passionate about fostering entrepreneurship in academia.',
    location: 'Chennai, Tamil Nadu',
    institute: 'IIT Madras',
    verified: true,
    createdAt: '2023-01-15',
    connections: 1247,
    followers: 3456,
    following: 892,
    posts: 156,
    expertise: ['Innovation Management', 'Technology Transfer', 'Startup Incubation'],
    achievements: ['Best Innovation Award 2023', 'Top 50 Educators', 'Research Excellence'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/rajeshkumar',
      twitter: 'https://twitter.com/rajeshkumar',
      website: 'https://iitmadras.ac.in'
    },
    stats: {
      startupsIncubated: 45,
      successfulExits: 12,
      totalFunding: '₹125 Cr',
      patentsGranted: 23
    }
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya@chennaiangels.com',
    role: 'investor',
    avatar: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Managing Partner at Chennai Angels, investing in early-stage startups across South India.',
    location: 'Chennai, Tamil Nadu',
    verified: true,
    createdAt: '2023-02-20',
    connections: 2156,
    followers: 5234,
    following: 1234,
    posts: 89,
    expertise: ['Early Stage Investing', 'Due Diligence', 'Portfolio Management'],
    achievements: ['Top Angel Investor 2023', 'Startup Mentor of the Year', 'Forbes 40 Under 40'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/priyasharma',
      twitter: 'https://twitter.com/priyasharma'
    },
    stats: {
      totalInvestments: 34,
      portfolioValue: '₹250 Cr',
      successfulExits: 8,
      averageReturn: '12x'
    }
  },
  {
    id: '3',
    name: 'Arjun Patel',
    email: 'arjun@freshcart.in',
    role: 'founder',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Founder & CEO of FreshCart, revolutionizing farm-to-table supply chain with AI.',
    location: 'Coimbatore, Tamil Nadu',
    institute: 'Anna University',
    verified: true,
    createdAt: '2023-03-10',
    connections: 892,
    followers: 2134,
    following: 567,
    posts: 67,
    expertise: ['AgriTech', 'Supply Chain', 'AI/ML'],
    achievements: ['Best Startup Award 2023', 'Young Entrepreneur Award', 'TechCrunch Disrupt Winner'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/arjunpatel',
      website: 'https://freshcart.in'
    },
    stats: {
      startupValuation: '₹50 Cr',
      teamSize: 150,
      fundingRaised: '₹25 Cr',
      monthlyRevenue: '₹2.5 Cr'
    }
  },
  {
    id: '4',
    name: 'Dr. Meera Krishnan',
    email: 'meera@techmentor.in',
    role: 'mentor',
    avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Senior Technology Mentor with 20+ years in product development and startup guidance.',
    location: 'Bangalore, Karnataka',
    verified: true,
    createdAt: '2023-01-25',
    connections: 1567,
    followers: 3890,
    following: 1123,
    posts: 234,
    expertise: ['Product Development', 'Technology Strategy', 'Team Building'],
    achievements: ['Mentor of the Year 2023', 'Top 100 Women in Tech', 'Innovation Excellence Award'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/meerakrishnan',
      twitter: 'https://twitter.com/meerakrishnan'
    },
    stats: {
      menteesGuided: 156,
      successfulStartups: 45,
      mentorshipHours: 2340,
      averageRating: 4.9
    }
  },
  {
    id: '5',
    name: 'Karthik Raman',
    email: 'karthik@psgincubator.in',
    role: 'incubation_manager',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Incubation Manager at PSG STEP, nurturing the next generation of entrepreneurs.',
    location: 'Coimbatore, Tamil Nadu',
    institute: 'PSG College of Technology',
    verified: true,
    createdAt: '2023-02-05',
    connections: 934,
    followers: 1876,
    following: 678,
    posts: 123,
    expertise: ['Startup Incubation', 'Business Development', 'Funding Strategy'],
    achievements: ['Best Incubator Manager 2023', 'Startup Ecosystem Builder', 'Innovation Champion'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/karthikraman'
    },
    stats: {
      startupsIncubated: 78,
      graduatedStartups: 34,
      totalFunding: '₹89 Cr',
      jobsCreated: 567
    }
  },
  {
    id: '6',
    name: 'Admin User',
    email: 'admin@catalyseed.in',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Platform Administrator managing the Catalyseed ecosystem.',
    location: 'Chennai, Tamil Nadu',
    verified: true,
    createdAt: '2023-01-01',
    connections: 500,
    followers: 1000,
    following: 200,
    posts: 50,
    expertise: ['Platform Management', 'System Administration', 'Data Analytics'],
    achievements: ['Platform Launch', 'User Growth 300%', 'System Reliability 99.9%'],
    socialLinks: {
      website: 'https://catalyseed.in'
    },
    stats: {
      totalUsers: 2847,
      platformUptime: '99.9%',
      totalStartups: 456,
      systemHealth: 'Excellent'
    }
  }
];

// Mock Startups Data
export const mockStartups: MockStartup[] = [
  {
    id: '1',
    name: 'FreshCart',
    founder: 'Arjun Patel',
    founderId: '3',
    institute: 'Anna University',
    sector: 'AgriTech',
    stage: 'Series A',
    valuation: '₹50 Cr',
    employees: 150,
    fundingRaised: '₹25 Cr',
    description: 'AI-powered farm-to-table supply chain platform',
    logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['AgriTech', 'AI', 'Supply Chain'],
    metrics: {
      revenue: '₹12 Cr',
      growth: '150%',
      customers: 25000
    }
  },
  {
    id: '2',
    name: 'EduTech Solutions',
    founder: 'Priya Nair',
    founderId: '7',
    institute: 'IIT Madras',
    sector: 'EdTech',
    stage: 'Seed',
    valuation: '₹25 Cr',
    employees: 80,
    fundingRaised: '₹8 Cr',
    description: 'Vernacular language learning platform for rural students',
    logo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['EdTech', 'AI', 'Rural'],
    metrics: {
      revenue: '₹3.5 Cr',
      growth: '200%',
      customers: 100000
    }
  },
  {
    id: '3',
    name: 'HealthFirst',
    founder: 'Dr. Vikram Singh',
    founderId: '8',
    institute: 'Madras Medical College',
    sector: 'HealthTech',
    stage: 'Series A',
    valuation: '₹35 Cr',
    employees: 120,
    fundingRaised: '₹18 Cr',
    description: 'Telemedicine platform for rural healthcare',
    logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['HealthTech', 'Telemedicine', 'Rural'],
    metrics: {
      revenue: '₹8 Cr',
      growth: '180%',
      customers: 50000
    }
  },
  {
    id: '4',
    name: 'GreenEnergy',
    founder: 'Arjun Krishnan',
    founderId: '9',
    institute: 'PSG College of Technology',
    sector: 'CleanTech',
    stage: 'Series A',
    valuation: '₹40 Cr',
    employees: 95,
    fundingRaised: '₹20 Cr',
    description: 'Solar energy solutions for rural communities',
    logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['CleanTech', 'Solar', 'Rural'],
    metrics: {
      revenue: '₹6 Cr',
      growth: '120%',
      customers: 15000
    }
  },
  {
    id: '5',
    name: 'FinanceFlow',
    founder: 'Kavitha Raman',
    founderId: '10',
    institute: 'Loyola College',
    sector: 'FinTech',
    stage: 'Seed',
    valuation: '₹30 Cr',
    employees: 75,
    fundingRaised: '₹12 Cr',
    description: 'Digital banking solutions for underserved communities',
    logo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['FinTech', 'Banking', 'Inclusion'],
    metrics: {
      revenue: '₹4 Cr',
      growth: '180%',
      customers: 200000
    }
  }
];

// Mock Events Data
export const mockEvents: MockEvent[] = [
  {
    id: '1',
    title: 'TechHack Tamil Nadu 2024',
    type: 'hackathon',
    institute: 'IIT Madras',
    date: '2024-03-15',
    location: 'Chennai',
    participants: 500,
    status: 'upcoming',
    description: 'India\'s largest student hackathon focusing on AI, ML, and emerging technologies',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    organizer: 'IIT Madras Innovation Cell',
    prizes: '₹5 Lakhs',
    registrations: 1250,
    capacity: 500
  },
  {
    id: '2',
    title: 'Innovation Demo Day',
    type: 'demo_day',
    institute: 'PSG College of Technology',
    date: '2024-02-28',
    location: 'Coimbatore',
    participants: 200,
    status: 'live',
    description: 'Showcase your startup ideas to top investors and industry leaders',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    organizer: 'PSG STEP',
    prizes: '₹2 Lakhs',
    registrations: 150,
    capacity: 200
  },
  {
    id: '3',
    title: 'Startup Networking Summit',
    type: 'networking',
    institute: 'Anna University',
    date: '2024-04-10',
    location: 'Chennai',
    participants: 300,
    status: 'upcoming',
    description: 'Connect with entrepreneurs, investors, and mentors',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    organizer: 'Anna University Innovation Hub',
    registrations: 180,
    capacity: 300
  },
  {
    id: '4',
    title: 'AI Workshop Series',
    type: 'workshop',
    institute: 'IIT Madras',
    date: '2024-03-20',
    location: 'Chennai',
    participants: 100,
    status: 'upcoming',
    description: 'Hands-on workshop on AI and machine learning for startups',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    organizer: 'IIT Madras AI Lab',
    registrations: 85,
    capacity: 100
  },
  {
    id: '5',
    title: 'Investor Connect 2024',
    type: 'conference',
    institute: 'Loyola College',
    date: '2024-04-15',
    location: 'Chennai',
    participants: 250,
    status: 'upcoming',
    description: 'Annual conference connecting startups with investors',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    organizer: 'Loyola Innovation Center',
    registrations: 200,
    capacity: 250
  }
];

// Mock Investments Data
export const mockInvestments: MockInvestment[] = [
  {
    id: '1',
    investorId: '2',
    startupId: '1',
    amount: '₹5 Cr',
    date: '2023-12-15',
    round: 'Series A',
    status: 'completed'
  },
  {
    id: '2',
    investorId: '2',
    startupId: '2',
    amount: '₹2 Cr',
    date: '2024-01-20',
    round: 'Seed',
    status: 'completed'
  },
  {
    id: '3',
    investorId: '2',
    startupId: '3',
    amount: '₹3 Cr',
    date: '2024-02-10',
    round: 'Series A',
    status: 'due_diligence'
  },
  {
    id: '4',
    investorId: '2',
    startupId: '4',
    amount: '₹4 Cr',
    date: '2024-01-05',
    round: 'Series A',
    status: 'pending'
  }
];

// Mock Mentorships Data
export const mockMentorships: MockMentorship[] = [
  {
    id: '1',
    mentorId: '4',
    menteeId: '3',
    startDate: '2023-06-01',
    status: 'active',
    sessions: 24,
    rating: 4.9,
    focus: ['Product Development', 'Team Building']
  },
  {
    id: '2',
    mentorId: '4',
    menteeId: '7',
    startDate: '2023-08-15',
    status: 'active',
    sessions: 18,
    rating: 4.8,
    focus: ['Technology Strategy', 'Scaling']
  },
  {
    id: '3',
    mentorId: '4',
    menteeId: '8',
    startDate: '2023-09-01',
    status: 'completed',
    sessions: 30,
    rating: 4.9,
    focus: ['Business Strategy', 'Fundraising']
  }
];

// Mock Connections Data
export const mockConnections: MockConnection[] = [
  {
    id: '1',
    userId: '1',
    connectedUserId: '2',
    status: 'connected',
    connectedAt: '2023-06-15',
    mutualConnections: 45
  },
  {
    id: '2',
    userId: '1',
    connectedUserId: '3',
    status: 'connected',
    connectedAt: '2023-07-20',
    mutualConnections: 23
  },
  {
    id: '3',
    userId: '2',
    connectedUserId: '4',
    status: 'connected',
    connectedAt: '2023-08-10',
    mutualConnections: 67
  },
  {
    id: '4',
    userId: '3',
    connectedUserId: '4',
    status: 'connected',
    connectedAt: '2023-09-05',
    mutualConnections: 34
  },
  {
    id: '5',
    userId: '1',
    connectedUserId: '5',
    status: 'pending',
    connectedAt: '2024-01-15',
    mutualConnections: 12
  }
];

// Mock Posts Data
export const mockPosts: MockPost[] = [
  {
    id: '1',
    authorId: '1',
    title: 'Best practices for early-stage startup incubation programs',
    content: 'Looking for insights on structuring effective incubation programs for early-stage startups. What are the key components that make a program successful?',
    category: 'incubation',
    tags: ['incubation', 'early-stage', 'best-practices'],
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T14:20:00Z',
    views: 245,
    likes: 18,
    replies: 12,
    isPinned: true,
    isSolved: false,
    upvotes: 24,
    downvotes: 2
  },
  {
    id: '2',
    authorId: '3',
    title: 'Government funding opportunities for AgriTech startups in Tamil Nadu',
    content: 'Can anyone share information about recent government schemes specifically targeting AgriTech startups? Looking for both state and central government programs.',
    category: 'government-schemes',
    tags: ['government', 'funding', 'agritech', 'tamil-nadu'],
    createdAt: '2024-01-14T16:45:00Z',
    updatedAt: '2024-01-15T09:15:00Z',
    views: 189,
    likes: 15,
    replies: 8,
    isPinned: false,
    isSolved: true,
    upvotes: 19,
    downvotes: 1
  },
  {
    id: '3',
    authorId: '2',
    title: 'Investment trends in South Indian startups',
    content: 'Sharing insights on the latest investment trends and opportunities in the South Indian startup ecosystem.',
    category: 'funding',
    tags: ['investment', 'trends', 'south-india'],
    createdAt: '2024-01-13T14:20:00Z',
    updatedAt: '2024-01-13T14:20:00Z',
    views: 312,
    likes: 28,
    replies: 15,
    isPinned: false,
    isSolved: false,
    upvotes: 35,
    downvotes: 3
  }
];

// Mock Messages Data
export const mockMessages: MockMessage[] = [
  {
    id: '1',
    senderId: '2',
    receiverId: '3',
    content: 'Hi Arjun, I\'m interested in learning more about FreshCart. Would love to schedule a call.',
    timestamp: '2024-01-15T10:30:00Z',
    read: false,
    type: 'text'
  },
  {
    id: '2',
    senderId: '4',
    receiverId: '3',
    content: 'Great progress on your product development! Let\'s discuss the next steps in our mentorship session.',
    timestamp: '2024-01-14T16:45:00Z',
    read: true,
    type: 'text'
  },
  {
    id: '3',
    senderId: '1',
    receiverId: '5',
    content: 'The incubation program proposal looks promising. Can we set up a meeting to discuss the details?',
    timestamp: '2024-01-13T14:20:00Z',
    read: true,
    type: 'text'
  }
];

// Mock Notifications Data
export const mockNotifications: MockNotification[] = [
  {
    id: '1',
    userId: '3',
    type: 'connection',
    title: 'New Connection Request',
    content: 'Priya Sharma wants to connect with you',
    timestamp: '2024-01-15T10:30:00Z',
    read: false,
    actionUrl: '/profile/2'
  },
  {
    id: '2',
    userId: '3',
    type: 'investment',
    title: 'Investment Interest',
    content: 'Chennai Angels is interested in your startup',
    timestamp: '2024-01-14T16:45:00Z',
    read: false,
    actionUrl: '/investments'
  },
  {
    id: '3',
    userId: '3',
    type: 'event',
    title: 'Event Reminder',
    content: 'TechHack Tamil Nadu 2024 registration closes tomorrow',
    timestamp: '2024-01-13T14:20:00Z',
    read: true,
    actionUrl: '/events/1'
  },
  {
    id: '4',
    userId: '3',
    type: 'mentorship',
    title: 'Mentorship Session',
    content: 'Upcoming session with Dr. Meera Krishnan tomorrow at 3 PM',
    timestamp: '2024-01-12T12:00:00Z',
    read: true,
    actionUrl: '/mentorship/1'
  }
];

// Platform Analytics Data
export const platformAnalytics = {
  totalUsers: 2847,
  totalStartups: 456,
  totalEvents: 156,
  totalFunding: '₹1,250 Cr',
  monthlyGrowth: {
    users: 12,
    startups: 8,
    events: 15,
    funding: 25
  },
  userDistribution: {
    founders: 45,
    investors: 20,
    mentors: 15,
    institutes: 12,
    incubationManagers: 8
  },
  sectorDistribution: {
    AgriTech: 25,
    EdTech: 20,
    HealthTech: 18,
    FinTech: 15,
    CleanTech: 12,
    Others: 10
  },
  monthlyMetrics: [
    { month: 'Jan', users: 2100, startups: 380, events: 12, funding: 45 },
    { month: 'Feb', users: 2300, startups: 410, events: 18, funding: 68 },
    { month: 'Mar', users: 2500, startups: 435, events: 25, funding: 85 },
    { month: 'Apr', users: 2650, startups: 445, events: 32, funding: 102 },
    { month: 'May', users: 2750, startups: 450, events: 38, funding: 118 },
    { month: 'Jun', users: 2847, startups: 456, events: 45, funding: 125 }
  ]
};

// Helper functions to get data
export const getUserById = (id: string): MockUser | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getStartupsByFounder = (founderId: string): MockStartup[] => {
  return mockStartups.filter(startup => startup.founderId === founderId);
};

export const getEventsByInstitute = (institute: string): MockEvent[] => {
  return mockEvents.filter(event => event.institute === institute);
};

export const getInvestmentsByInvestor = (investorId: string): MockInvestment[] => {
  return mockInvestments.filter(investment => investment.investorId === investorId);
};

export const getMentorshipsByMentor = (mentorId: string): MockMentorship[] => {
  return mockMentorships.filter(mentorship => mentorship.mentorId === mentorId);
};

export const getConnectionsByUser = (userId: string): MockConnection[] => {
  return mockConnections.filter(connection => 
    connection.userId === userId || connection.connectedUserId === userId
  );
};

export const getPostsByAuthor = (authorId: string): MockPost[] => {
  return mockPosts.filter(post => post.authorId === authorId);
};

export const getMessagesByUser = (userId: string): MockMessage[] => {
  return mockMessages.filter(message => 
    message.senderId === userId || message.receiverId === userId
  );
};

export const getNotificationsByUser = (userId: string): MockNotification[] => {
  return mockNotifications.filter(notification => notification.userId === userId);
};

// Dashboard specific data
export const getDashboardData = (userRole: string, userId?: string) => {
  switch (userRole) {
    case 'admin':
      return {
        stats: {
          totalUsers: platformAnalytics.totalUsers,
          pendingVerifications: 23,
          totalEvents: platformAnalytics.totalEvents,
          systemHealth: '99.9%'
        },
        charts: platformAnalytics.monthlyMetrics,
        recentActivity: mockPosts.slice(0, 5),
        topPerformers: mockUsers.slice(0, 5)
      };
    
    case 'institute':
      return {
        stats: {
          activeStartups: 24,
          upcomingEvents: 8,
          totalViews: '12.5K',
          engagementRate: '8.2%'
        },
        startups: mockStartups.slice(0, 6),
        events: mockEvents.slice(0, 4),
        recentActivity: mockPosts.slice(0, 3)
      };
    
    case 'investor':
      return {
        stats: {
          portfolioCompanies: 12,
          totalInvested: '₹45 Cr',
          avgReturn: '8.5x',
          activeDeals: 3
        },
        investments: getInvestmentsByInvestor(userId || '2'),
        opportunities: mockStartups.slice(0, 4),
        portfolio: mockStartups.slice(0, 6)
      };
    
    case 'mentor':
      return {
        stats: {
          activeMentees: 8,
          totalSessions: 156,
          avgRating: 4.8,
          successStories: 12
        },
        mentorships: getMentorshipsByMentor(userId || '4'),
        upcomingSessions: [],
        achievements: ['Mentor of the Year', 'Top Rated Mentor']
      };
    
    case 'founder':
      return {
        stats: {
          startupValuation: '₹50 Cr',
          teamSize: 150,
          monthlyRevenue: '₹2.5 Cr',
          fundingRaised: '₹25 Cr'
        },
        startup: getStartupsByFounder(userId || '3')[0],
        metrics: {
          revenue: [
            { month: 'Jan', value: 180 },
            { month: 'Feb', value: 200 },
            { month: 'Mar', value: 220 },
            { month: 'Apr', value: 240 },
            { month: 'May', value: 250 }
          ],
          users: 25000,
          growth: '150%'
        }
      };
    
    default:
      return {};
  }
};