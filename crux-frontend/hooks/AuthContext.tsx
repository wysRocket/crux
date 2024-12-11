import {createContext, useContext, useState, useCallback} from 'react';
import {
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import {useRouter} from 'expo-router';
import userPool from '../cognito-config';

interface AuthUser {
  email: string;
  name: string;
  id: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface SignUpData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  signup: (data: SignUpData) => Promise<boolean>;
  confirmSignup: (username: string, code: string) => Promise<boolean>;
  signin: (email: string, password: string) => Promise<boolean>;
  signout: () => Promise<void>;
  resendConfirmationCode: (username: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: React.ReactNode}) {
  const router = useRouter();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [code, setCode] = useState('');

  const setCognitoUserAttribute = (name: string, value: string) => {
    return new CognitoUserAttribute({
      Name: name,
      Value: value,
    });
  };

  const signup = useCallback(async (data: SignUpData): Promise<boolean> => {
    setLoading(true);
    try {
      const attributeList = [
        setCognitoUserAttribute('name', `${data.firstName} ${data.lastName}`),
        setCognitoUserAttribute('custom:first_name', data.firstName),
        setCognitoUserAttribute('custom:last_name', data.lastName),
        setCognitoUserAttribute('custom:role', 'user'),
        setCognitoUserAttribute('phone_number', data.phone),
      ];

      return new Promise((resolve, reject) => {
        userPool.signUp(
          data.email,
          data.password,
          attributeList,
          [],
          (err, result) => {
            if (err) {
              setError(err.message);
              resolve(false);
            } else {
              resolve(true);
            }
            setLoading(false);
          }
        );
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
      return false;
    }
  }, []);

  const signin = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      setLoading(true);
      try {
        const user = new CognitoUser({
          Username: email,
          Pool: userPool,
        });

        const authDetails = new AuthenticationDetails({
          Username: email,
          Password: password,
        });

        return new Promise((resolve, reject) => {
          user.authenticateUser(authDetails, {
            onSuccess: (data) => {
              const payloadData = data.getIdToken().decodePayload();
              const userData: AuthUser = {
                email: payloadData.email,
                name: payloadData.name,
                id: payloadData.sub,
                firstName: payloadData['custom:first_name'],
                lastName: payloadData['custom:last_name'],
                role: payloadData['custom:role'],
              };

              setUser(userData);
              setIsAuthenticated(true);
              setLoading(false);
              router.push({
                pathname: '/verify/[phone]',
                params: {phone: email},
              });
              resolve(true);
            },
            onFailure: (err) => {
              setError(err.message);
              setLoading(false);
              resolve(false);
            },
          });
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
        return false;
      }
    },
    [router]
  );

  const confirmSignup = useCallback(
    async (username: string, verificationCode: string): Promise<boolean> => {
      setVerifyLoading(true);
      try {
        const user = new CognitoUser({
          Username: username,
          Pool: userPool,
        });

        return new Promise((resolve, reject) => {
          user.confirmRegistration(verificationCode, true, (err, result) => {
            if (err) {
              setError(err.message);
              resolve(false);
            } else {
              resolve(true);
            }
            setVerifyLoading(false);
          });
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setVerifyLoading(false);
        return false;
      }
    },
    []
  );

  const signout = useCallback(async (): Promise<void> => {
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    signup,
    confirmSignup,
    signin,
    signout,
    resendConfirmationCode: async () => {}, // Implement if needed
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
