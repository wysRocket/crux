import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {ChevronRight} from 'lucide-react-native';

import {theme} from '@/constants/Colors';

interface CardProps {
  name: string;
  relation: string;
  photoCount: number;
  avatarUrl: string | undefined;
  backgroundColor?: string;
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({
  name,
  relation,
  photoCount,
  avatarUrl,
  backgroundColor = theme.colors.accent,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor}]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <View style={styles.leftContent}>
          <Image source={{uri: avatarUrl}} style={styles.avatar} />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.relation}>{relation}</Text>
            <Text style={styles.photoCount}>{photoCount} photos</Text>
          </View>
        </View>
        <View style={styles.arrowContainer}>
          <ChevronRight size={20} color="#000" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  relation: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.text,
    opacity: 0.7,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  photoCount: {
    fontSize: 14,
    color: theme.colors.text,
    opacity: 0.6,
  },
  arrowContainer: {
    width: 32,
    height: 32,
    backgroundColor: 'white',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});
