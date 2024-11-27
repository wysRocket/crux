import {CognitoUserPool} from 'amazon-cognito-identity-js';

// Ensure these are set in your .env or expo environment variables
const poolData = {
  UserPoolId: 'eu-west-2_6fPDsUm5T',
  ClientId: 'samt4bt8omlj5o4jj8vm1o9ig',
};

export const userPool = new CognitoUserPool(poolData);
