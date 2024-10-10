import { Character } from "@/models/character.interface";
import { Image, Text, View } from "react-native";

export function CharacterComponent(props: Character) {
    return (
        <View style={styles.stepContainer}>
            <Text style={styles.text}>{props.name}</Text>
            <Image
                source={{ uri: props.imageUrl }}
            />
        </View>
    );
}

const styles = {
    stepContainer: {
        gap: 20,
        marginBottom: 8,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'red',
    }
}