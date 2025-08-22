import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import type { User } from '../types';

export class AuthService {
  // 회원가입
  static async signUp(email: string, password: string, name: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      const newUser: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        name,
        role: 'member',
        createdAt: new Date(),
      };

      await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
      return newUser;
    } catch (error) {
      console.error('회원가입 에러:', error);
      throw error;
    }
  }

  // 로그인
  static async signIn(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      if (userDoc.exists()) {
        return userDoc.data() as User;
      } else {
        throw new Error('사용자 정보를 찾을 수 없습니다');
      }
    } catch (error) {
      console.error('로그인 에러:', error);
      throw error;
    }
  }

  // 로그아웃
  static async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('로그아웃 에러:', error);
      throw error;
    }
  }

  // 인증 상태 감지
  static onAuthStateChanged(callback: (user: FirebaseUser | null) => void) {
    return onAuthStateChanged(auth, callback);
  }

  // 사용자 정보 가져오기
  static async getUserData(uid: string): Promise<User | null> {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      return userDoc.exists() ? userDoc.data() as User : null;
    } catch (error) {
      console.error('사용자 정보 조회 에러:', error);
      return null;
    }
  }
}
