import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User as FirebaseUser,
} from "firebase/auth";
import { auth, googleProvider } from "../db/config";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

interface AuthContextType {
  user: FirebaseUser | null;
  isAdmin: boolean;
  loading: boolean;
  loginWithGoogle: () => Promise<string | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const isAdmin = user?.email === ADMIN_EMAIL;

  async function loginWithGoogle(): Promise<string | null> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const email = result.user.email;

      if (email !== ADMIN_EMAIL) {
        await signOut(auth);
        return `Acceso denegado. El correo ${email} no está autorizado.`;
      }

      return null;
    } catch (error: any) {
      return error.message || "Error al iniciar sesión";
    }
  }

  async function logout() {
    await signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
}
