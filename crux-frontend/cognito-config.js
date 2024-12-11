import {CognitoUserPool} from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-2_j5mZ9QZsw',
  ClientId: '291imj7jueaf16qabvcbk6k2bn',
};

export default new CognitoUserPool(poolData);
