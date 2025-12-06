import { View, Text, TextInput, NativeSyntheticEvent, TextInputChangeEventData } from "react-native"
import { useState } from "react"

function checarLetra(letraPalpite: string, letraCerta: string): boolean {
    return letraPalpite.toLocaleUpperCase() == letraCerta.toLocaleUpperCase()
}

export default function BoxLetra({letra, caract}: {letra?: string, caract?: number}) {
    const [value, setValue] = useState('')
    const [acerto, setAcerto] = useState<boolean>(false)

    const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        const novoValor = e.nativeEvent.text
        setValue(novoValor)
        setAcerto(checarLetra(novoValor, letra || ''))
    }

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
                    backgroundColor: value == '' ? 'white' : acerto ? 'lightgreen' : 'red'
                }} maxLength={1} value={value} onChange={handleChange} editable={!acerto} />
            </View>
            <Text style={{
                fontSize: 10,
            }}>{caract}</Text>
        </View>
    )
}