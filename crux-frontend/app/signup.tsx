import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';
import {Link, useRouter} from 'expo-router';
import {ArrowLeft} from 'lucide-react-native';
import {useState} from 'react';
import useAuth from '../hooks/useAuth';

export default function SignUp() {
  const router = useRouter();
  const {signup, loading, error} = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSignup = async () => {
    const success = await signup({
      firstName,
      lastName,
      email,
      phone,
    });
    if (success) {
      router.push({pathname: '/verify/[phone]', params: {phone}});
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.canGoBack() && router.back()}>
          <ArrowLeft size={24} color="#000" />
        </Pressable>
        <Text style={styles.progress}>1/3</Text>
      </View>

      <Text style={styles.title}>Let's get to know you!</Text>
      <Text style={styles.subtitle}>
        Your journey starts here — just a few quick details.
      </Text>

      <View style={styles.form}>
        <Text style={styles.label}>Your name</Text>
        <View style={styles.nameInputs}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="First name"
            placeholderTextColor="#666"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Last name"
            placeholderTextColor="#666"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="yourname@crux.com"
          placeholderTextColor="#666"
          inputMode="email"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Phone number</Text>
        <TextInput
          style={styles.input}
          placeholder="+1 (333) 000-0000"
          placeholderTextColor="#666"
          inputMode="tel"
          value={phone}
          onChangeText={setPhone}
        />

        {error && <Text style={styles.errorText}>{error}</Text>}

        <Pressable
          style={styles.nextButton}
          onPress={handleSignup}
          disabled={loading}
        >
          <ArrowLeft
            size={24}
            color="#fff"
            style={{transform: [{rotate: '180deg'}]}}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  form: {
    gap: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  nameInputs: {
    flexDirection: 'row',
    gap: 16,
  },
  input: {
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    fontSize: 16,
  },
  halfInput: {
    flex: 1,
  },
  nextButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF4081',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});
