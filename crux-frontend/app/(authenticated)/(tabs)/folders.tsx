import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {
  Bell,
  ChevronDown,
  Grid,
  Home,
  Menu,
  MoreVertical,
  Plus,
  Search,
  User,
  Edit,
  Folder,
} from 'lucide-react-native';

const photos = [
  {
    id: 'daughter',
    type: 'folder',
    label: 'DAUGHTER',
    name: 'Sophie',
    count: '23 photos',
    color: '#E3F2FD',
    image: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 'fireworks',
    type: 'image',
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    id: 'wreath',
    type: 'image',
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    id: 'street',
    type: 'image',
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    id: 'sparkler',
    type: 'image',
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    id: 'toast',
    type: 'image',
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    id: 'sparklers',
    type: 'image',
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    id: 'candle',
    type: 'image',
    image: '/placeholder.svg?height=200&width=200',
  },
];

export default function NewYearFolder() {
  const [isGridView, setIsGridView] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={{uri: '/placeholder.svg?height=40&width=40'}}
            style={styles.profilePic}
          />
          <Text style={styles.headerText}>Alice K.</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Search size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Bell size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Menu size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Title Section */}
        <Text style={styles.title}>New Year 2024</Text>

        {/* Tags */}
        <View style={styles.tags}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>FAMILY</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>WIFE</Text>
          </View>
          <View style={styles.avatarGroup}>
            <Image
              source={{uri: '/placeholder.svg?height=24&width=24'}}
              style={styles.avatarSmall}
            />
            <Image
              source={{uri: '/placeholder.svg?height=24&width=24'}}
              style={[styles.avatarSmall, styles.avatarOverlap]}
            />
            <Image
              source={{uri: '/placeholder.svg?height=24&width=24'}}
              style={[styles.avatarSmall, styles.avatarOverlap]}
            />
          </View>
        </View>

        {/* Filters */}
        <View style={styles.filters}>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>By size</Text>
            <ChevronDown size={20} color="#000" />
          </TouchableOpacity>
          <View style={styles.viewControls}>
            <TouchableOpacity onPress={() => setIsGridView(true)}>
              <Grid size={24} color={isGridView ? '#000' : '#999'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButton}>
              <MoreVertical size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Photo Grid */}
        <View style={styles.photoGrid}>
          {photos.map((photo) => (
            <View
              key={photo.id}
              style={[
                styles.gridItem,
                photo.type === 'folder' && {backgroundColor: photo.color},
              ]}
            >
              {photo.type === 'folder' ? (
                <View style={styles.folderContent}>
                  <Image
                    source={{uri: photo.image}}
                    style={styles.avatarSmall}
                  />
                  <Text style={styles.folderLabel}>{photo.label}</Text>
                  <Text style={styles.folderName}>{photo.name}</Text>
                  <Text style={styles.folderCount}>{photo.count}</Text>
                  <Text style={styles.arrowIcon}>→</Text>
                </View>
              ) : (
                <Image source={{uri: photo.image}} style={styles.photoImage} />
              )}
            </View>
          ))}
        </View>

        {/* Footer Count */}
        <Text style={styles.photoCount}>143 photos, 80 videos</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
  },
  iconButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tags: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  tagText: {
    fontSize: 14,
    color: '#666',
  },
  avatarGroup: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  avatarSmall: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#DDD',
  },
  avatarOverlap: {
    marginLeft: -8,
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  filterText: {
    marginRight: 4,
  },
  viewControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreButton: {
    marginLeft: 16,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -4,
  },
  gridItem: {
    width: '50%',
    padding: 4,
  },
  folderContent: {
    padding: 16,
    borderRadius: 16,
    height: 160,
    position: 'relative',
  },
  folderLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 12,
  },
  folderName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  folderCount: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  arrowIcon: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    fontSize: 20,
  },
  photoImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
  },
  photoCount: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 16,
  },
});
