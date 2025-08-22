import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
import { AuthService } from '../services/auth';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // 개발용 더미 사용자 - 나중에 실제 Firebase로 변경
  const [user, setUser] = useState<User | null>({
    id: 'dummy-user-1',
    email: 'demo@example.com',
    name: '바이칼',
    role: 'admin',
    createdAt: new Date(),
  });
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 개발용 - Firebase 인증 비활성화
    // const unsubscribe = AuthService.onAuthStateChanged(async (firebaseUser) => {
    //   setFirebaseUser(firebaseUser);
    //   if (firebaseUser) {
    //     const userData = await AuthService.getUserData(firebaseUser.uid);
    //     setUser(userData);
    //   } else {
    //     setUser(null);
    //   }
    //   setLoading(false);
    // });

    // return unsubscribe;
    setLoading(false);
    return () => {};
  }, []);

  const signIn = async (email: string, password: string) => {
    const userData = await AuthService.signIn(email, password);
    setUser(userData);
  };

  const signUp = async (email: string, password: string, name: string) => {
    const userData = await AuthService.signUp(email, password, name);
    setUser(userData);
  };

  const signOut = async () => {
    await AuthService.signOut();
    setUser(null);
    setFirebaseUser(null);
  };

  const value: AuthContextType = {
    user,
    firebaseUser,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
