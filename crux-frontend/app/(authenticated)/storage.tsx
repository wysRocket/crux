import {View, Text, Pressable, StyleSheet} from 'react-native';
import {ChevronRight, Trash2} from 'lucide-react-native';
import Header from '@/components/Header';

export default function StorageScreen() {
  const storageData = {
    used: 0.3,
    free: 0.7,
    breakdown: [
      {type: 'Video', size: '0.2MB', color: '#4A55A2'},
      {type: 'Photo', size: '0.1MB', color: '#FF4081'},
      {type: 'Files', size: '0.1MB', color: '#00C853'},
    ],
  };

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.content}>
        <Text style={styles.title}>Storage</Text>
        <Text style={styles.subtitle}>
          Keep Track of Your Space — See What's Stored and What's Left
        </Text>

        <View style={styles.card}>
          <View style={styles.storageBar}>
            <View
              style={[
                styles.storageUsed,
                {
                  width: `${
                    (storageData.used / (storageData.used + storageData.free)) *
                    100
                  }%`,
                },
              ]}
            />
          </View>
          <View style={styles.storageInfo}>
            <Text style={styles.storageText}>{storageData.used}GB used</Text>
            <Text style={styles.storageText}>{storageData.free}GB free</Text>
          </View>

          <Pressable style={styles.upgradeButton}>
            <Text style={styles.upgradeButtonText}>Upgrade storage ↑</Text>
          </Pressable>
        </View>

        <View style={styles.breakdownCard}>
          <Text style={styles.breakdownTitle}>Storage breakdown</Text>
          {storageData.breakdown.map((item, index) => (
            <Pressable key={item.type} style={styles.breakdownItem}>
              <View style={styles.breakdownLeft}>
                <View style={[styles.dot, {backgroundColor: item.color}]} />
                <Text style={styles.breakdownType}>{item.type}</Text>
              </View>
              <View style={styles.breakdownRight}>
                <Text style={styles.breakdownSize}>{item.size}</Text>
                <ChevronRight size={20} color="#666" />
              </View>
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.clearCacheButton}>
          <Text style={styles.clearCacheText}>Clear cache 0.3MB</Text>
        </Pressable>

        <Pressable style={styles.emptyTrashButton}>
          <Trash2 size={20} color="#FF4081" />
          <Text style={styles.emptyTrashText}>Empty trash 0.5MB</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  storageBar: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  storageUsed: {
    height: '100%',
    backgroundColor: '#4A55A2',
    borderRadius: 4,
  },
  storageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  storageText: {
    fontSize: 14,
    color: '#666',
  },
  upgradeButton: {
    backgroundColor: '#FF4081',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
  },
  upgradeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  breakdownCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  breakdownTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  breakdownLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  breakdownType: {
    fontSize: 16,
  },
  breakdownRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  breakdownSize: {
    fontSize: 16,
    color: '#666',
  },
  clearCacheButton: {
    backgroundColor: '#FFE0F0',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  clearCacheText: {
    color: '#FF4081',
    fontSize: 16,
    fontWeight: '500',
  },
  emptyTrashButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  emptyTrashText: {
    color: '#FF4081',
    fontSize: 16,
  },
});
