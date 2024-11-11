import {useLocalSearchParams, useRouter} from 'expo-router';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {ArrowLeft} from 'lucide-react-native';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {userPool} from '@/cognito-config';
import useAuth from '@/hooks/useAuth';

const {width} = Dimensions.get('window');
const INPUT_WIDTH = (width - 140) / 6;

export default function VerifyScreen() {
  const {phone} = useLocalSearchParams();
  const router = useRouter();
  const {verifyMFA} = useAuth();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(29);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const cognitoUser = useRef<CognitoUser | null>(null);

  useEffect(() => {
    cognitoUser.current = new CognitoUser({
      Username: phone as string,
      Pool: userPool,
    });
  }, [phone]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Move to next input if value entered
    if (text.length === 1 && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    // Move to previous input if deleted
    if (text.length === 0 && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // If all digits are entered, verify the code
    if (index === 5 && text.length === 1) {
      verifyCode([...newCode.slice(0, 5), text].join(''));
    }
  };

  const verifyCode = async (fullCode: string) => {
    const success = await verifyMFA(phone as string, fullCode);
    if (success) {
      router.push('/allset');
    } else {
      console.error('Verification failed');
    }
  };

  const resendCode = () => {
    if (!cognitoUser.current || timeLeft > 0) return;

    cognitoUser.current.resendConfirmationCode((err, result) => {
      if (err) {
        console.error('Resend code error:', err);
        return;
      }
      setTimeLeft(29);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.canGoBack() && router.back()}>
          <ArrowLeft size={24} color="#000" />
        </Pressable>
        <Text style={styles.progress}>2/3</Text>
      </View>

      <Text style={styles.title}>Enter 6-digit code</Text>
      <Text style={styles.subtitle}>
        We've sent your code in two parts: check your email for the first 3
        digits and your phone messages for the rest.
      </Text>

      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <React.Fragment key={index}>
            {index === 3 && <Text style={styles.separator}>-</Text>}
            <TextInput
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={styles.input}
              maxLength={1}
              inputMode="numeric"
              value={digit}
              onChangeText={(text) => handleCodeChange(text, index)}
              onKeyPress={({nativeEvent}) => {
                if (nativeEvent.key === 'Backspace' && !digit && index > 0) {
                  inputRefs.current[index - 1]?.focus();
                }
              }}
            />
          </React.Fragment>
        ))}
      </View>

      <Pressable
        onPress={resendCode}
        disabled={timeLeft > 0}
        style={styles.resendContainer}
      >
        <Text style={styles.resendText}>
          Resend codes in {String(timeLeft).padStart(2, '0')}:00
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  progress: {
    color: '#666',
    fontSize: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    lineHeight: 24,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    width: INPUT_WIDTH,
    height: INPUT_WIDTH,
    borderRadius: INPUT_WIDTH / 2,
    backgroundColor: '#F5F5F5',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
  separator: {
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: 8,
  },
  resendContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  resendText: {
    color: '#666',
    fontSize: 14,
  },
});
