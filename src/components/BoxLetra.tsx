import { View, Text, TextInput } from "react-native"

export default function BoxLetra({letra, caract}: {letra?: string, caract?: number}) {
    return (
        <View style={{ flexDirection: 'column', alignItems: 'center', gap: 2, width: 28 }}>
            <View style={{ borderWidth: 0, borderColor: 'green', aspectRatio: 1, justifyContent: 'center', alignItems: 'center'}}>
                <TextInput style={{
                    fontSize: 16,
                    color: 'black',
                    borderBottomWidth: 1,
                    borderColor: 'black',
                    width: '100%',
                    padding: 0,
                    textAlign: 'center',
                }} maxLength={1} />
            </View>
            <Text style={{
                fontSize: 10,
            }}>{caract}</Text>
        </View>
    )
}