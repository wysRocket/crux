import {useState, useCallback} from 'react';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import {userPool} from '@/cognito-config';
// Define an interface for signup data
interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

// Define an interface for authentication context
interface AuthContextType {
  user: CognitoUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  signup: (data: SignupData) => Promise<boolean>;
  signin: (identifier: string) => Promise<boolean>;
  signout: () => Promise<void>;
  verifyMFA: (identifier: string, mfaCode: string) => Promise<boolean>;
  resetPassword: (username: string) => Promise<boolean>;
  confirmPasswordReset: (
    username: string,
    verificationCode: string,
    newPassword: string
  ) => Promise<boolean>;
}

// First, define the custom user attributes interface
interface CustomUserAttributes {
  email: string;
  name: string;
  id: string;
  firstName: string;
  lastName: string;
  role: string;
}

const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<
    | (CognitoUser & {
        email: string;
        name: string;
        id: string;
        firstName: string;
        lastName: string;
        role: string;
      })
    | null
  >(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Signup method with password input
  const signup = useCallback(
    async ({
      firstName,
      lastName,
      email,
      phone,
    }: SignupData): Promise<boolean> => {
      setLoading(true);
      setError(null);

      const attributeList = [
        new CognitoUserAttribute({Name: 'name', Value: firstName}),
        new CognitoUserAttribute({Name: 'family_name', Value: lastName}),
        new CognitoUserAttribute({Name: 'email', Value: email}),
        new CognitoUserAttribute({Name: 'phone_number', Value: phone}),
      ];

      return new Promise((resolve) => {
        userPool.signUp(email, 'Password', attributeList, [], (err, result) => {
          setLoading(false);
          if (err) {
            setError(err.message || 'Signup failed');
            resolve(false);
            return;
          }
          resolve(true);
        });
      });
    },
    []
  );

  // Signin method with dynamic credentials
  const signin = useCallback(async (identifier: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    const authenticationDetails = new AuthenticationDetails({
      Username: identifier,
      Password: 'Password',
    });

    const cognitoUser = new CognitoUser({
      Username: identifier,
      Pool: userPool,
    });

    return new Promise((resolve) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session: CognitoUserSession) => {
          const idToken = session.getIdToken();
          const payload = idToken.decodePayload();
          // Then modify the user object creation to properly extend CognitoUser
          const user = Object.assign(cognitoUser, {
            email: payload.email,
            name: payload.name,
            id: payload.sub,
            firstName: payload['custom:firstName'],
            lastName: payload['custom:lastName'],
            role: payload['custom:role'],
          }) as CognitoUser & CustomUserAttributes;

          setUser(user);
          setIsAuthenticated(true);
          setLoading(false);
          resolve(true);
        },
        onFailure: (err) => {
          setError(err.message || 'Authentication failed');
          setLoading(false);
          resolve(false);
        },
        mfaRequired: (challengeName, challengeParameters) => {
          // Indicate MFA is required
          setError('MFA Required');
          setLoading(false);
          resolve(false);
        },
      });
    });
  }, []);

  // Signout method
  const signout = useCallback(async (): Promise<void> => {
    if (user) {
      user.signOut();
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [user]);

  // MFA Verification
  const verifyMFA = useCallback(
    async (identifier: string, mfaCode: string): Promise<boolean> => {
      setLoading(true);
      setError(null);

      const cognitoUser = new CognitoUser({
        Username: identifier,
        Pool: userPool,
      });

      return new Promise((resolve) => {
        cognitoUser.sendMFACode(mfaCode, {
          onSuccess: () => {
            setIsAuthenticated(true);
            setLoading(false);
            resolve(true);
          },
          onFailure: (err) => {
            setError(err.message || 'MFA verification failed');
            setLoading(false);
            resolve(false);
          },
        });
      });
    },
    []
  );

  // Password Reset Initiation
  const resetPassword = useCallback(
    async (username: string): Promise<boolean> => {
      setLoading(true);
      setError(null);

      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool,
      });

      return new Promise((resolve) => {
        cognitoUser.forgotPassword({
          onSuccess: () => {
            setLoading(false);
            resolve(true);
          },
          onFailure: (err) => {
            setError(err.message || 'Password reset failed');
            setLoading(false);
            resolve(false);
          },
        });
      });
    },
    []
  );

  // Password Reset Confirmation
  const confirmPasswordReset = useCallback(
    async (
      username: string,
      verificationCode: string,
      newPassword: string
    ): Promise<boolean> => {
      setLoading(true);
      setError(null);

      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool,
      });

      return new Promise((resolve) => {
        cognitoUser.confirmPassword(verificationCode, newPassword, {
          onSuccess: () => {
            setLoading(false);
            resolve(true);
          },
          onFailure: (err) => {
            setError(err.message || 'Password reset confirmation failed');
            setLoading(false);
            resolve(false);
          },
        });
      });
    },
    []
  );

  return {
    user,
    isAuthenticated,
    loading,
    error,
    signup,
    signin,
    signout,
    verifyMFA,
    resetPassword,
    confirmPasswordReset,
  };
};

export default useAuth;
