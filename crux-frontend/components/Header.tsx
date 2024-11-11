import {View, Text, Image, Pressable, StyleSheet} from 'react-native';
import {Search, Bell, Menu} from 'lucide-react-native';
import {useRouter} from 'expo-router';

export default function Header() {
  const router = useRouter();
  return (
    <View style={styles.header}>
      <Pressable
        style={styles.headerLeft}
        onPress={() => router.push('/profile')}
      >
        <Image
          source={require('@/assets/images/profile-pic.png')}
          style={styles.headerAvatar}
        />
        <Text style={styles.headerName}>Alice K.</Text>
      </Pressable>
      <View style={styles.headerRight}>
        <Pressable style={styles.iconButton}>
          <Search size={22} color="#333" strokeWidth={2} />
        </Pressable>
        <Pressable style={styles.iconButton}>
          <Bell size={22} color="#333" strokeWidth={2} />
        </Pressable>
        <Pressable style={styles.iconButton}>
          <Menu size={22} color="#333" strokeWidth={2} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  headerName: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 16,
  },
  iconButton: {
    padding: 4,
  },
});
