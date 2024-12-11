import {useState, useRef} from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import {useRouter, useLocalSearchParams} from 'expo-router';
import {ArrowLeft} from 'lucide-react-native';
import {useAuth} from '@/hooks/AuthContext';
import {VerificationInput} from '@/components/Input';
import {useTimer} from '@/hooks/useTimer';

const {width} = Dimensions.get('window');
const INPUT_WIDTH = (width - 140) / 6;

export default function VerifyScreen() {
  const {phone} = useLocalSearchParams();
  const router = useRouter();
  const {resendConfirmationCode, confirmSignup} = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const {timeLeft, resetTimer} = useTimer(29);

  // Add missing state and refs
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if code is complete
    if (newCode.every((digit) => digit) && newCode.length === 6) {
      handleSubmit(newCode.join(''));
    }
  };

  const handleSubmit = async (verificationCode: string) => {
    try {
      setLoading(true);
      setError(null);
      const success = await confirmSignup(phone as string, verificationCode);
      if (success) {
        router.push('/allset');
      }
    } catch (err) {
      setError('Invalid verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    if (timeLeft > 0 || loading) return;

    try {
      setLoading(true);
      await resendConfirmationCode(phone as string);
      resetTimer();
      setCode(Array(6).fill(''));
    } catch (err) {
      setError('Failed to resend code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.canGoBack() && router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <ArrowLeft size={24} color="#000" />
        </Pressable>
        <Text style={styles.progress}>2/3</Text>
      </View>

      <Text style={styles.title}>Enter 6-digit code</Text>
      <Text style={styles.subtitle}>
        We've sent your code in two parts: check your email for the first 3
        digits and your phone messages for the rest.
      </Text>

      <VerificationInput
        code={code}
        inputRefs={inputRefs}
        handleCodeChange={handleCodeChange}
      />

      {error && <Text style={styles.error}>{error}</Text>}

      <Pressable
        onPress={resendCode}
        disabled={timeLeft > 0 || loading}
        style={styles.resendContainer}
        accessibilityRole="button"
        accessibilityLabel="Resend verification code"
      >
        <Text
          style={[
            styles.resendText,
            (timeLeft > 0 || loading) && styles.resendTextDisabled,
          ]}
        >
          {loading
            ? 'Sending...'
            : `Resend code in ${String(timeLeft).padStart(2, '0')}s`}
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
  error: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 16,
  },
  resendContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  resendText: {
    color: '#666',
    fontSize: 14,
  },
  resendTextDisabled: {
    opacity: 0.5,
  },
});
