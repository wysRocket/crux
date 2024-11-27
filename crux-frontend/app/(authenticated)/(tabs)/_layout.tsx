import {View, Pressable, StyleSheet, Dimensions} from 'react-native';
import {Tabs} from 'expo-router';
import {Home, Folder, Plus, Edit2, User} from 'lucide-react-native';

const {width} = Dimensions.get('window');
const TAB_BAR_WIDTH = width * 0.8; // 80% of screen width

import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

function CustomTabBar({state, navigation, descriptors}: BottomTabBarProps) {
  return (
    <View style={styles.tabBarWrapper}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          // Determine the icon based on the route name
          let Icon = Home;
          switch (route.name) {
            case 'home':
              Icon = Home;
              break;
            case 'folders':
              Icon = Folder;
              break;
            case 'add':
              Icon = Plus;
              break;
            case 'edit':
              Icon = Edit2;
              break;
            case 'profile':
              Icon = User;
              break;
          }

          // Special styling for the add button
          if (route.name === 'add') {
            return (
              <Pressable
                key={route.key}
                onPress={onPress}
                style={styles.addButton}
              >
                <Icon size={24} color="#FFF" />
              </Pressable>
            );
          }

          return (
            <Pressable key={route.key} onPress={onPress} style={styles.tab}>
              <Icon
                size={24}
                color={isFocused ? '#fff' : 'rgba(255, 255, 255, 0.5)'}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="folders" />
      <Tabs.Screen name="add" />
      <Tabs.Screen name="edit" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  tabBar: {
    width: TAB_BAR_WIDTH,
    height: 64,
    backgroundColor: '#4A55A2',
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
});
