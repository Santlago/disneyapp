import { DisneyClient } from '@/client/client';
import { CharacterComponent } from '@/components/CharacterComponent';
import { Character } from '@/models/character.interface';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, TextInput, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [charactersList, setCharactersList] = useState<Array<Character>>([]); 
  const [filteredCharacters, setFilteredCharacters] = useState<Array<Character>>([]); 
  const [searchQuery, setSearchQuery] = useState(''); 

  useEffect(() => {
    fetchCharacters();
  }, []);

  // Função para buscar todos os personagens
  async function fetchCharacters() {
    const response = await DisneyClient.getCharacters();
    setCharactersList(response.data);  
    setFilteredCharacters(response.data);  
    console.log('Resposta: ', response.data);
  }

  // Função para realizar a pesquisa
  function handleSearch() {
    if (searchQuery) {
      const filtered = charactersList.filter(character =>
        character.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCharacters(filtered);  
    } else {
      setFilteredCharacters(charactersList); 
    }
  }

  // Função para lidar com a finalização da edição do campo de pesquisa (pressionar Enter)
  function handleSubmitEditing() {
    handleSearch();
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Barra de Pesquisa */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquise um personagem"
          value={searchQuery}
          onChangeText={setSearchQuery}  
          onSubmitEditing={handleSubmitEditing} 
          blurOnSubmit={true}  
        />
        {/* Botão de pesquisa */}
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Pesquisar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Personagens */}
      {filteredCharacters.length > 0 ? (
        <FlatList
          data={filteredCharacters}  
          renderItem={({ item }) => (
            <TouchableOpacity>
              <CharacterComponent {...item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => (item._id ? item._id.toString() : index.toString())}
          contentContainerStyle={styles.flatListContent}
        />
      ) : (
        <View style={styles.emptyMessageContainer}>
          <Text style={styles.emptyMessageText}>Não encontrado</Text>
        </View>
      )}
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
  searchContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    height: 50,
    width: '90%',
    borderColor: '#3498db',
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: '#fff',
    marginTop: 40,
  },
  searchButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
    width: 330
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyMessageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyMessageText: {
    fontSize: 18,
    color: '#7f8c8d',
  },
});
