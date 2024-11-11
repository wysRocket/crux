import {useState} from 'react';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import {userPool} from '@/cognito-config';

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async ({
    firstName,
    lastName,
    email,
    phone,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) => {
    setLoading(true);
    setError(null);

    const attributeList = [
      new CognitoUserAttribute({Name: 'given_name', Value: firstName}),
      new CognitoUserAttribute({Name: 'family_name', Value: lastName}),
      new CognitoUserAttribute({Name: 'email', Value: email}),
      new CognitoUserAttribute({Name: 'phone_number', Value: phone}),
    ];

    return new Promise<boolean>((resolve) => {
      userPool.signUp(
        phone,
        'Password123!',
        attributeList,
        [],
        (err, result) => {
          setLoading(false);
          if (err) {
            setError(err.message || 'An error occurred');
            resolve(false);
            return;
          }
          resolve(true);
        }
      );
    });
  };

  const signin = async (identifier: string) => {
    setLoading(true);
    setError(null);

    const authenticationDetails = new AuthenticationDetails({
      Username: identifier,
      Password: 'Password123!',
    });

    const cognitoUser = new CognitoUser({
      Username: identifier,
      Pool: userPool,
    });

    return new Promise<boolean>((resolve) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: () => {
          setLoading(false);
          resolve(true);
        },
        onFailure: (err) => {
          setLoading(false);
          setError(err.message || 'An error occurred');
          resolve(false);
        },
        mfaRequired: (challengeName, challengeParameters) => {
          // Handle MFA challenge
          setLoading(false);
          // You might want to store the cognitoUser instance to use it later for MFA verification
          // You can navigate to MFA verification screen here
          resolve(false);
        },
      });
    });
  };

  const verifyMFA = async (identifier: string, mfaCode: string) => {
    setLoading(true);
    setError(null);

    const cognitoUser = new CognitoUser({
      Username: identifier,
      Pool: userPool,
    });

    return new Promise<boolean>((resolve) => {
      cognitoUser.sendMFACode(mfaCode, {
        onSuccess: () => {
          setLoading(false);
          resolve(true);
        },
        onFailure: (err) => {
          setLoading(false);
          setError(err.message || 'MFA verification failed');
          resolve(false);
        },
      });
    });
  };

  return {signup, signin, verifyMFA, loading, error};
};

export default useAuth;
