import {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Switch,
} from 'react-native';
import {
  ArrowLeft,
  Bell,
  ChevronDown,
  Menu,
  Plus,
  Search,
  Trash2,
} from 'lucide-react-native';

const IMAGES = Array(30)
  .fill(null)
  .map((_, i) => ({
    id: i,
    uri: `/placeholder.svg?height=100&width=100`,
    selected: false,
  }));

const FOLDERS = [
  {id: 1, name: 'Personal', users: [], expanded: false},
  {id: 2, name: 'Barcelona', users: [1, 2, 3], expanded: false},
  {id: 3, name: 'New Year 2024', users: [1, 2, 3], expanded: false},
  {id: 4, name: "Valentine's Day at work", users: [1, 2, 3], expanded: true},
  {id: 5, name: 'Independence Day 2024', users: [], expanded: false},
  {id: 6, name: 'Halloween Party', users: [], expanded: false},
];

export default function UploadMedia() {
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [createMemory, setCreateMemory] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleImageSelection = (id: number) => {
    setSelectedImages((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>UPLOAD MEDIA</Text>
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
        {/* Image Grid */}
        <View style={styles.imageGrid}>
          {IMAGES.map((image) => (
            <TouchableOpacity
              key={image.id}
              onPress={() => toggleImageSelection(image.id)}
              style={styles.imageContainer}
            >
              <Image source={{uri: image.uri}} style={styles.image} />
              <View
                style={[
                  styles.imageOverlay,
                  selectedImages.includes(image.id) && styles.imageSelected,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Selection Actions */}
        {selectedImages.length > 0 && (
          <View style={styles.selectionActions}>
            <Text style={styles.selectionCount}>
              {selectedImages.length} selected
            </Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity>
                <Text style={styles.renameButton}>Rename</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Trash2 size={20} color="#FF0000" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Create Memory Toggle */}
        <View style={styles.memoryToggle}>
          <Text style={styles.memoryText}>Create a memory</Text>
          <Switch
            value={createMemory}
            onValueChange={setCreateMemory}
            trackColor={{false: '#E0E0E0', true: '#E0E0FF'}}
            thumbColor={createMemory ? '#2196F3' : '#f4f3f4'}
          />
        </View>

        {/* Choose Folder Section */}
        <View style={styles.folderSection}>
          <View style={styles.folderHeader}>
            <Text style={styles.folderTitle}>Choose folder</Text>
            <TouchableOpacity style={styles.createNewButton}>
              <Plus size={16} color="#FF4081" />
              <Text style={styles.createNewText}>Create new</Text>
            </TouchableOpacity>
          </View>

          {/* Search Folder */}
          <View style={styles.searchContainer}>
            <Search size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search folder"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Recently Used */}
          <Text style={styles.sectionTitle}>Recently used</Text>
          {FOLDERS.slice(0, 3).map((folder) => (
            <TouchableOpacity key={folder.id} style={styles.folderItem}>
              <View style={styles.folderItemLeft}>
                <View style={styles.radioButton}>
                  {folder.expanded && <View style={styles.radioButtonInner} />}
                </View>
                <Text style={styles.folderName}>{folder.name}</Text>
              </View>
              {folder.users.length > 0 && (
                <View style={styles.userAvatars}>
                  {folder.users.map((user, index) => (
                    <Image
                      key={index}
                      source={{uri: `/placeholder.svg?height=24&width=24`}}
                      style={[styles.userAvatar, {marginLeft: index * -8}]}
                    />
                  ))}
                </View>
              )}
              <ChevronDown size={20} color="#666" />
            </TouchableOpacity>
          ))}

          {/* All Folders */}
          <Text style={styles.sectionTitle}>All folders</Text>
          {FOLDERS.map((folder) => (
            <TouchableOpacity key={folder.id} style={styles.folderItem}>
              <View style={styles.folderItemLeft}>
                <View style={styles.radioButton}>
                  {folder.expanded && <View style={styles.radioButtonInner} />}
                </View>
                <Text style={styles.folderName}>{folder.name}</Text>
              </View>
              {folder.users.length > 0 && (
                <View style={styles.userAvatars}>
                  {folder.users.map((user, index) => (
                    <Image
                      key={index}
                      source={{uri: `/placeholder.svg?height=24&width=24`}}
                      style={[styles.userAvatar, {marginLeft: index * -8}]}
                    />
                  ))}
                </View>
              )}
              <ChevronDown size={20} color="#666" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
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
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 4,
  },
  imageContainer: {
    width: '16.666%',
    aspectRatio: 1,
    padding: 2,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  imageOverlay: {
    position: 'absolute',
    top: 2,
    left: 2,
    right: 2,
    bottom: 2,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  imageSelected: {
    backgroundColor: 'rgba(33, 150, 243, 0.3)',
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  selectionActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  selectionCount: {
    fontSize: 16,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  renameButton: {
    color: '#FF4081',
    fontSize: 16,
  },
  memoryToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  memoryText: {
    fontSize: 16,
    color: '#666',
  },
  folderSection: {
    padding: 16,
  },
  folderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  folderTitle: {
    fontSize: 16,
    color: '#666',
  },
  createNewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  createNewText: {
    color: '#FF4081',
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  folderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 8,
  },
  folderItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#666',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2196F3',
  },
  folderName: {
    fontSize: 16,
  },
  userAvatars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  userAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  continueButton: {
    backgroundColor: '#FF4081',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
