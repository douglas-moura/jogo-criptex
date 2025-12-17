import { View, Text, TextInput, NativeSyntheticEvent, TextInputChangeEventData } from "react-native"
import { useJogo } from "../context/JogoContext"
import { useEffect, useState } from "react"

function checarLetra(letraPalpite: string, letraCerta: string): boolean {
    return letraPalpite.toLocaleUpperCase() == letraCerta.toLocaleUpperCase()
}

export default function BoxLetra({letra, simb}: {letra: string, simb: number}) {
    //const inputRef = useRef<TextInput>(null)
    const { acertos, setAcertos, prefAutoPreen, prefExibirAcertos } = useJogo()
    const [ value, setValue ] = useState('')
    const [ statusLetra, setStatusLetra ] = useState<boolean>(acertos.includes(letra))

    const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        // pega letra palpite
        const palpite = e.nativeEvent.text

        // atualiza valor do input e status da letra
        setValue(palpite)

        // checa se o palpite está correto
        setStatusLetra(checarLetra(palpite, letra || ''))
        
        // se estiver correto, adiciona aos acertos
        if (checarLetra(palpite, letra || '')) {
            if (prefAutoPreen) {
                if (!acertos.includes(letra)) {
                    // adiciona letra aos acertos no contexto
                    setAcertos(prev => {
                        if (!prev.includes(letra)) {
                            return [...prev, letra]   // <-- sempre a letra CORRETA
                        }
                        return prev
                    })
                }
            } else {
                // adiciona letra aos acertos no contexto
                setAcertos(prev => {
                    return [...prev, letra]   // <-- sempre a letra CORRETA
                })
            }
            
        }
    }

    useEffect(() => {
        // atualiza o status da letra e valor do input sempre que há mudança nos acertos
        setStatusLetra(acertos.includes(letra))
        if (prefAutoPreen && prefExibirAcertos) {
            acertos.includes(letra) ? setValue(letra) : null
        }
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
                    backgroundColor: (value == '' || !prefExibirAcertos) ? '#efefef' : statusLetra && value == letra ? 'lightgreen' : 'red'
                }} maxLength={1} value={value} onChange={handleChange} editable={!statusLetra || !prefExibirAcertos}  />
            </View>
            <Text style={{
                fontSize: 10,
            }}>{simb}</Text>
        </View>
    )
}