import { Character } from "@/models/character.interface";
import { Image, Text, View, StyleSheet } from "react-native";

export function CharacterComponent(props: Character) {
    return (
        <View style={styles.cardContainer}>
            <Image
                source={{ uri: props.imageUrl }}
                style={styles.characterImage}
            />
            <Text style={styles.characterName}>{props.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
        width: 250,  
        justifyContent: 'center',
    },
    characterImage: {
        width: 200,  
        height: 200,  
        borderRadius: 100, 
        marginBottom: 15,
    },
    characterName: {
        fontSize: 20,  
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
});
