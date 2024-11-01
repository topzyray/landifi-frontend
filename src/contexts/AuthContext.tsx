import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import PageLevelLoader from '../components/loaders/PageLevelLoader';
import { ImageObjectType } from '../utils/types';

export type UserRole = 'landlord' | 'tenant' | 'admin';

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: UserRole;
  about?: string;
  phone?: string;
  age?: number;
  occupation?: string;
  address?: string;
  location?: string;
  image?: ImageObjectType;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  //   const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log(storedUser);

    if (storedUser) {
      setUser(JSON.parse(storedUser) as User);
    }
    setLoading(false); // Set loading to false once user is set
  }, [user]);

  const logout = () => {
    // Clear user state and local storage
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Redirect to login page
    window.location.href = '/';
  };

  if (loading)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <PageLevelLoader loading={loading} />
      </div>
    ); // Loading state for initial load

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
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
