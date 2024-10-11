import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Button } from 'react-native';

interface SearchBarProps {
  onSearch: (query: string) => void; 
  onTyping: (query: string) => void; 
}

export function SearchBar({ onSearch, onTyping }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  function handleTyping(query: string) {
    setSearchQuery(query);
    onTyping(query);
  }

  function handleConfirmSearch() {
    onSearch(searchQuery); 
  }

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a character"
        value={searchQuery}
        onChangeText={handleTyping} 
        onSubmitEditing={handleConfirmSearch} 
      />
      <Button title="Search" onPress={handleConfirmSearch} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    height: 40,
    width: '70%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
});
