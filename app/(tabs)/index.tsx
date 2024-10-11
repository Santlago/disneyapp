import { DisneyClient } from '@/client/client';
import { CharacterComponent } from '@/components/CharacterComponent';
import { Character } from '@/models/character.interface';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [charactersList, setCharactersList] = useState<Array<Character>>([]);

  useEffect(() => {
    fetchCharacters();
  }, []);

  async function fetchCharacters() {
    const response = await DisneyClient.getCharacters();
    setCharactersList(response.data);
    console.log('Resposta: ', response.data);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={charactersList}
        renderItem={({ item }) => (
          <TouchableHighlight>
            <CharacterComponent {...item} />
          </TouchableHighlight>
        )}
        keyExtractor={(item, index) => (item._id ? item._id.toString() : index.toString())}
        contentContainerStyle={styles.flatListContent}
        onEndReached={fetchCharacters}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  flatListContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
});
