import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';
import {Link, useRouter} from 'expo-router';
import {AntDesign} from '@expo/vector-icons';
import {useState} from 'react';
import {useAuth} from '@/hooks/AuthContext';

export default function Login() {
  const router = useRouter();
  const {signin, loading, error} = useAuth();
  const [identifier, setIdentifier] = useState('');

  const handleSignin = async () => {
    const success = await signin(identifier, 'password');
    if (success) {
      router.push({
        pathname: '/verify/[phone]',
        params: {phone: identifier},
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Crux</Text>
        <Text style={styles.subtitle}>
          Securely Store, Share, and Cherish Your Memories.
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email or phone number"
          placeholderTextColor="#666"
          value={identifier}
          onChangeText={setIdentifier}
        />

        {error && <Text style={styles.errorText}>{error}</Text>}

        <Pressable
          style={styles.signInButton}
          onPress={handleSignin}
          disabled={loading}
        >
          <Text style={styles.signInButtonText}>Sign in</Text>
        </Pressable>

        <Link href="/signup" asChild>
          <Pressable style={styles.signUpButton}>
            <Text style={styles.signUpButtonText}>Sign up</Text>
          </Pressable>
        </Link>

        <View style={styles.socialButtons}>
          <Pressable style={styles.socialButton}>
            <AntDesign name="linkedin-square" size={24} color="#0077B5" />
          </Pressable>
          <Pressable style={styles.socialButton}>
            <AntDesign name="google" size={24} color="#DB4437" />
          </Pressable>
          <Pressable style={styles.socialButton}>
            <AntDesign name="instagram" size={24} color="#E4405F" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    lineHeight: 24,
  },
  form: {
    gap: 16,
  },
  input: {
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    fontSize: 16,
  },
  signInButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF4081',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  signUpButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFE0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#FF4081',
    fontSize: 16,
    fontWeight: '600',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});
