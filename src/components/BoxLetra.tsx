import { View, Text, TextInput, NativeSyntheticEvent, TextInputChangeEventData } from "react-native"
import { useJogo } from "../context/JogoContext"
import { useEffect, useState } from "react"

function checarLetra(letraPalpite: string, letraCerta: string): boolean {
    return letraPalpite.toLocaleUpperCase() == letraCerta.toLocaleUpperCase()
}

export default function BoxLetra({letra, simb}: {letra: string, simb: number}) {
    const { acertos, setAcertos } = useJogo()
    const [value, setValue] = useState('')
    const [statusLetra, setStatusLetra] = useState<boolean>(acertos.includes(letra))

    const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        const palpite = e.nativeEvent.text

        setValue(palpite)
        setStatusLetra(checarLetra(palpite, letra || ''))
        
        if (checarLetra(palpite, letra || '') && !acertos.includes(palpite)) {
            setAcertos(prev => {
                if (!prev.includes(letra)) {
                    return [...prev, letra]   // <-- sempre a letra CORRETA
                }
                return prev
            })
        }
    }

    useEffect(() => {
        setStatusLetra(acertos.includes(letra))
        acertos.includes(letra) ? setValue(letra) : setValue('')
    }, [acertos])

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
                    backgroundColor: value == '' ? 'white' : statusLetra ? 'lightgreen' : 'red'
                }} maxLength={1} value={value} onChange={handleChange} editable={!statusLetra} />
            </View>
            <Text style={{
                fontSize: 10,
            }}>{simb}</Text>
        </View>
    )
}