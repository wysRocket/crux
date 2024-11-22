import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Plus, ChevronRight} from 'lucide-react-native';
import Header from '@/components/Header';
import HorizontalAccordion from '@/components/horizontal-accordion';

const {width} = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

export default function HomeScreen() {
  const folders = [
    {
      id: 1,
      type: 'SAFE VAULT',
      name: 'My docs',
      photos: 23,
      color: '#E8F5E9',
    },
    {
      id: 2,
      type: 'DAUGHTER',
      name: 'Sophie',
      photos: 23,
      color: '#E3F2FD',
      avatar: '/placeholder.svg?height=24&width=24',
    },
    {
      id: 3,
      type: 'WIFE',
      name: 'Hanna',
      photos: 23,
      color: '#FCE4EC',
      avatar: '/placeholder.svg?height=24&width=24',
    },
    {
      id: 4,
      type: 'SON',
      name: 'Nick',
      photos: 23,
      color: '#FFF8E1',
      avatar: '/placeholder.svg?height=24&width=24',
    },
  ];

  const nominees = [
    {id: 1, image: '/placeholder.svg?height=40&width=40'},
    {id: 2, image: '/placeholder.svg?height=40&width=40'},
    {id: 3, image: '/placeholder.svg?height=40&width=40'},
    {id: 4, image: '/placeholder.svg?height=40&width=40'},
    {id: 5, image: '/placeholder.svg?height=40&width=40'},
  ];

  const storage = {
    total: 1,
    used: 0.3,
    breakdown: [
      {type: 'Video', size: '235MB', color: '#4A55A2'},
      {type: 'Photo', size: '41MB', color: '#FF4081'},
      {type: 'Files', size: '24MB', color: '#00C853'},
    ],
  };

  const renderFolderCard = (folder: (typeof folders)[0]) => (
    <TouchableOpacity
      key={folder.id}
      style={[styles.folderCard, {backgroundColor: folder.color}]}
    >
      {folder.avatar ? (
        <View style={styles.folderHeader}>
          <Image
            source={require('@/assets/images/profile-pic.png')}
            style={styles.folderAvatar}
          />
          <Text style={styles.folderType}>{folder.type}</Text>
        </View>
      ) : (
        <Text style={styles.folderType}>{folder.type}</Text>
      )}
      <View style={styles.folderInfo}>
        <Text style={styles.folderName}>{folder.name}</Text>
        <Text style={styles.folderCount}>{folder.photos} photos</Text>
      </View>
      <ChevronRight size={20} color="#000" style={styles.folderArrow} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Camera roll</Text>
        <HorizontalAccordion />

        <Text style={styles.sectionTitle}>Legacy folders</Text>
        <View style={styles.folderGrid}>{folders.map(renderFolderCard)}</View>

        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Nominee Progress</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, {width: '62%'}]} />
          </View>
          <Text style={styles.progressText}>38% left</Text>
        </View>

        <Text style={styles.sectionTitle}>Your nominees</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.nominees}
        >
          <TouchableOpacity style={styles.addNomineeButton}>
            <Plus size={24} color="#666" />
          </TouchableOpacity>
          {nominees.map((nominee) => (
            <Image
              key={nominee.id}
              source={require('@/assets/images/profile-pic.png')}
              style={styles.nomineeAvatar}
            />
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Recents</Text>
        <View style={styles.folderGrid}>{folders.map(renderFolderCard)}</View>

        <View style={styles.storageCard}>
          <View style={styles.storageBreakdown}>
            {storage.breakdown.map((item) => (
              <View key={item.type} style={styles.storageItem}>
                <View
                  style={[styles.storageDot, {backgroundColor: item.color}]}
                />
                <Text style={styles.storageType}>{item.type}</Text>
                <Text style={styles.storageSize}>{item.size}</Text>
              </View>
            ))}
          </View>
          <View style={styles.storageChart}>
            <View style={styles.storageRing}>
              <Text style={styles.storageCurrent}>0.3 GB</Text>
              <Text style={styles.storageTotal}>/ 1 GB</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeButtonText}>Upgrade storage ↑</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cameraRoll: {
    marginBottom: 24,
  },
  photoCard: {
    marginRight: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  mainPhotoCard: {
    width: width - 32,
    height: 200,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  dateOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  folderGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  folderCard: {
    width: CARD_WIDTH,
    padding: 16,
    borderRadius: 16,
    position: 'relative',
  },
  folderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  folderAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  folderType: {
    fontSize: 12,
    fontWeight: '600',
    opacity: 0.6,
  },
  folderInfo: {
    marginTop: 8,
  },
  folderName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  folderCount: {
    fontSize: 14,
    opacity: 0.6,
  },
  folderArrow: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  progressCard: {
    backgroundColor: '#4A55A2',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  progressTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  progressText: {
    color: '#fff',
    fontSize: 14,
  },
  nominees: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  addNomineeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  nomineeAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  storageCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  storageBreakdown: {
    marginBottom: 16,
  },
  storageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  storageDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  storageType: {
    flex: 1,
    fontSize: 14,
  },
  storageSize: {
    fontSize: 14,
    color: '#666',
  },
  storageChart: {
    alignItems: 'center',
    marginBottom: 16,
  },
  storageRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: '#FF4081',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storageCurrent: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  storageTotal: {
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
});
