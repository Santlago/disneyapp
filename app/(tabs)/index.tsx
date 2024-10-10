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
  }, [])

  async function fetchCharacters() {
    console.log('response');

    const response = await DisneyClient.getCharacters();
    setCharactersList(response.data);
    console.log('Resposta: ', response.data);
  }

  return (
    <SafeAreaView>
      <FlatList
        data={charactersList}
        renderItem={
          ((characterDetails) => {
            return (
              <TouchableHighlight
              // onPress={() =>
              //   navigation.navigate('Pokemon details', { name: characterDetails.item.name })
              // }
              >
                <CharacterComponent {...characterDetails.item} />
              </TouchableHighlight>
            )
          })
        }
        onEndReached={fetchCharacters}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
