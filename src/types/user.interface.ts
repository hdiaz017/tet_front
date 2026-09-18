interface User {
   id: string;
   email: string;
}
export interface AuthStore {
   user: User | null;
   authStatus: AuthStatus;
   error: string | null;
   login: (email: string, password: string) => Promise<void>;
   logout: () => Promise<void>;
   hydrate: () => Promise<void>;
}

type AuthStatus = 'authenticated' | 'checking' | 'not-authenticated';
