import { View, Text, TextInput } from "react-native"

export default function BoxLetra() {
    return (
        <View style={{ borderWidth: 1, borderColor: 'green', aspectRatio: 1, justifyContent: 'center', alignItems: 'center', width: 28 }}>
            <TextInput style={{
                fontSize: 16,
                color: 'black',
                borderBottomWidth: 1,
                borderColor: 'black',
                width: '100%',
                padding: 0,
                textAlign: 'center'
            }} maxLength={1}/>
        </View>
    )
}