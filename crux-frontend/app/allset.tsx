import {useEffect} from 'react';
import {View, Text, Pressable, StyleSheet, Animated, Image} from 'react-native';
import {useRouter} from 'expo-router';
import {ArrowLeft, ArrowRight} from 'lucide-react-native';

type Nominee = {
  id: string;
  name: string;
  type: string;
  avatar: string;
  color: string;
};

export default function AllSet() {
  const router = useRouter();
  const nominees: Nominee[] = [
    {
      id: '1',
      name: 'Johny',
      type: 'Brother',
      avatar: '@/assets/images/placeholder1.png',
      color: '#E8F5E9',
    },
    {
      id: '2',
      name: 'Mom',
      type: 'Mom',
      avatar: '@/assets/images/placeholder1.png',
      color: '#E3F2FD',
    },
    {
      id: '3',
      name: 'Max',
      type: 'Friend',
      avatar: '@/assets/images/placeholder1.png',
      color: '#FCE4EC',
    },
  ];

  // Create animated values for each nominee
  const animations = nominees.map(() => new Animated.Value(0));

  useEffect(() => {
    // Sequence the animations
    const sequence = nominees.map((_, index) => {
      return Animated.timing(animations[index], {
        toValue: 1,
        duration: 500,
        delay: index * 200, // Stagger the animations
        useNativeDriver: true,
      });
    });

    // Start the sequence after a brief delay
    setTimeout(() => {
      Animated.sequence(sequence).start();
    }, 500);
  }, []);

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={24} color="#000" />
      </Pressable>

      <View style={styles.content}>
        <Text style={styles.title}>All set!</Text>
        <Text style={styles.subtitle}>
          We created folders for your nominees, you can start adding your files.
        </Text>

        <View style={styles.cardsContainer}>
          {nominees.map((nominee, index) => (
            <Animated.View
              key={nominee.id}
              style={[
                styles.card,
                {backgroundColor: nominee.color},
                {
                  transform: [
                    {
                      translateY: animations[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [100, 0],
                      }),
                    },
                  ],
                  opacity: animations[index],
                },
              ]}
            >
              <View style={styles.cardContent}>
                <View>
                  <Image
                    source={require('@/assets/images/profile-pic.png')}
                    style={styles.avatar}
                  />
                  <Text style={styles.cardType}>{nominee.type}</Text>
                  <Text style={styles.cardName}>{nominee.name}</Text>
                </View>
                <Pressable style={styles.cardButton}>
                  <ArrowRight size={20} color="#000" />
                </Pressable>
              </View>
            </Animated.View>
          ))}
        </View>

        <Pressable
          style={styles.uploadButton}
          onPress={() => router.push('/profile')}
        >
          <Text style={styles.uploadButtonText}>Upload files</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 20,
    paddingTop: 40,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  cardsContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 40,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  cardName: {
    fontSize: 24,
    fontWeight: '600',
  },
  cardButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButton: {
    backgroundColor: '#FF4081',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginTop: 'auto',
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
