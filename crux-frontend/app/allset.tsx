import {useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import {ArrowRight} from 'react-native-feather';
import Svg, {Path} from 'react-native-svg';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

interface NomineeCardProps {
  name: string;
  relation: string;
  color: string;
  delay: number;
  avatarUrl: string;
  wavePattern: string;
}

const WaveBackground = ({color, pattern}: {color: string; pattern: string}) => (
  <Svg
    style={[StyleSheet.absoluteFill, {width: '100%', height: '100%'}]}
    viewBox="0 0 1440 320"
    preserveAspectRatio="none"
  >
    <Path d={pattern} fill={color} />
  </Svg>
);

const NomineeCard = ({
  name,
  relation,
  color,
  delay,
  avatarUrl,
  wavePattern,
}: NomineeCardProps) => {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          damping: 15,
          mass: 1,
          stiffness: 130,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [delay]);

  return (
    <Animated.View
      style={[
        styles.nomineeCard,
        {
          transform: [{translateY}],
          opacity,
        },
      ]}
    >
      <WaveBackground color={color} pattern={wavePattern} />
      <View style={styles.nomineeContent}>
        <View style={styles.leftContent}>
          <Image
            source={require('@/assets/images/profile-pic.png')}
            style={styles.avatar}
          />
          <View style={styles.textContent}>
            <Text style={styles.nomineeRelation}>{relation}</Text>
            <Text style={styles.nomineeName}>{name}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.arrowButton}>
          <ArrowRight stroke="#000000" width={20} height={20} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const AllSet = () => {
  const nominees = [
    {
      name: 'Johny',
      relation: 'Brother',
      color: '#BAFFC9',
      delay: 0,
      avatarUrl: '@/assets/images/placeholder1.png',
      wavePattern:
        'M0,32L48,37.3C96,43,192,53,288,80C384,107,480,149,576,160C672,171,768,149,864,133.3C960,117,1056,107,1152,101.3C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
    },
    {
      name: 'Mom',
      relation: 'Mom',
      color: '#BAE1FF',
      delay: 200,
      avatarUrl: '@/assets/images/placeholder1.png',
      wavePattern:
        'M0,64L48,80C96,96,192,128,288,133.3C384,139,480,117,576,101.3C672,85,768,75,864,90.7C960,107,1056,149,1152,160C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
    },
    {
      name: 'Max',
      relation: 'Friend',
      color: '#FFB3BA',
      delay: 400,
      avatarUrl: '@/assets/images/placeholder1.png',
      wavePattern:
        'M0,96L48,112C96,128,192,160,288,176C384,192,480,192,576,176C672,160,768,128,864,117.3C960,107,1056,117,1152,122.7C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
    },
  ];

  const titleOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(1200),
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, {opacity: titleOpacity}]}>
        <Text style={styles.title}>All set!</Text>
        <Text style={styles.subtitle}>
          We created folders for your nominees, you can start adding your files.
        </Text>
      </Animated.View>

      <View style={styles.cardsContainer}>
        {nominees.map((nominee) => (
          <NomineeCard key={nominee.name} {...nominee} />
        ))}
      </View>

      <Animated.View style={{opacity: buttonOpacity}}>
        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>Upload files</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  nomineeCard: {
    height: 100,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  nomineeContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  textContent: {
    gap: 4,
  },
  nomineeRelation: {
    fontSize: 14,
    color: '#666666',
    textTransform: 'uppercase',
    borderRadius: 18,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  nomineeName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  arrowButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  uploadButton: {
    backgroundColor: '#FF69B4',
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AllSet;
