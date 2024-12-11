import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'

const accordionData = [
  {
    id: 'boating',
    emoji: '🚤',
    image: 'https://raw.githubusercontent.com/kevin-powell/accordion/8551c559e3e8d9a9cca7a983c9e8903ef533f189/public/assets/boat.webp',
    title: 'Boating',
    content: 'Port mutiny draught handsomely ye furl flogging line shrouds hulk. Spirits Plate Fleet code of conduct.',
  },
  {
    id: 'anchoring',
    emoji: '⚓️',
    image: 'https://raw.githubusercontent.com/kevin-powell/accordion/8551c559e3e8d9a9cca7a983c9e8903ef533f189/public/assets/anchor.webp',
    title: 'Anchoring',
    content: 'Ahoy league hands Sea Legs keelhaul salmagundi fire ship crimp Privateer galleon. Booty boom yard boatswain quarter.',
  },
  {
    id: 'fishing',
    emoji: '🎣',
    image: 'https://raw.githubusercontent.com/kevin-powell/accordion/8551c559e3e8d9a9cca7a983c9e8903ef533f189/public/assets/fishing.webp',
    title: 'Fishing',
    content: 'No prey, no pay heave down splice the main brace furl cable snow walk the plank chase guns piracy bucko.',
  },
  {
    id: 'lighthouses',
    emoji: '🔦',
    image: 'https://raw.githubusercontent.com/kevin-powell/accordion/8551c559e3e8d9a9cca7a983c9e8903ef533f189/public/assets/lighthouse.webp',
    title: 'Lighthouses',
    content: 'Deadlights squiffy salmagundi cable pinnace parrel topsail Corsair Arr mizzenmast.',
  },
  {
    id: 'reefs',
    emoji: '🪸',
    image: 'https://raw.githubusercontent.com/kevin-powell/accordion/8551c559e3e8d9a9cca7a983c9e8903ef533f189/public/assets/reef.webp',
    title: 'Reefs',
    content: 'Keel yard poop deck brigantine gaff six pounders bring a spring upon her cable interloper lad pink.',
  },
]

export default function HorizontalAccordion() {
  const [openId, setOpenId] = useState<string | null>('boating')

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <ScrollView horizontal style={styles.accordionWrapper}>
      {accordionData.map(item => (
        <View key={item.id} style={styles.accordionItem}>
          <TouchableOpacity onPress={() => toggleAccordion(item.id)} style={styles.summary}>
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Image source={{ uri: item.image }} style={styles.image} />
          </TouchableOpacity>
          {openId === item.id && (
            <View style={styles.detailsContent}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.content}>{item.content}</Text>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  accordionWrapper: {
    flexDirection: 'row',
    padding: 16,
  },
  accordionItem: {
    width: 200,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#f4f6f9',
  },
  summary: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  emoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 16,
  },
  detailsContent: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: '#444',
  },
})