import { View, Text, TextInput, NativeSyntheticEvent, TextInputChangeEventData } from "react-native"
import { useJogo } from "../context/JogoContext"
import { useEffect, useState } from "react"

function checarLetra(letraPalpite: string, letraCerta: string): boolean {
    return letraPalpite.toLocaleUpperCase() == letraCerta.toLocaleUpperCase()
}

export default function BoxLetra({letra, simb}: {letra: string, simb: number}) {
    //const inputRef = useRef<TextInput>(null)
    const { acertos, setAcertos, tentativas, setTentativas, prefAutoPreen, prefExibirAcertos } = useJogo()
    const [ value, setValue ] = useState('')
    const [ statusLetra, setStatusLetra ] = useState<boolean>(acertos.letrasAcertadas.includes(letra))
    const [ historicoLetras, setHistoricoLetras ] = useState<string[]>([])

    const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        // pega letra palpite
        const palpite = e.nativeEvent.text

        // atualiza valor do input e status da letra
        setValue(palpite)

        // inclui letra no histórico de palpites
        if (palpite != '') setHistoricoLetras(prev => [...prev, palpite])

        // define status da letra (certa ou errada)
        setStatusLetra(checarLetra(palpite, letra || ''))
        
        // verifica se a letra está correta para atualizar os acertos
        if (checarLetra(palpite, letra || '')) {
            // se a letra certa já esta nos acertos, não faz nada
            if (!acertos.letrasAcertadas.includes(letra)) {
                // adiciona letra aos acertos no contexto
                setAcertos(prev => {
                    return {
                        ...prev,
                        letrasAcertadas: [...prev.letrasAcertadas, letra],
                        qtd_acertos: prev.qtd_acertos + 1
                    }
                })
            } else {
                setAcertos(prev => {
                    return {
                        ...prev,
                        qtd_acertos: prev.qtd_acertos + 1
                    }
                })
            }
        } else {
            if (palpite != '') { 
                setTentativas(prev => [
                    ...prev,
                    {
                        letraErrada: palpite,
                        simbolo: simb,
                    }
                ])
            }

            // se a letra estava certa e o usuário errou agora, remove dos acertos e do histórico
            if (historicoLetras.includes(letra)) {
                setAcertos(prev => {
                    return {
                        ...prev,
                        letrasAcertadas: prev.letrasAcertadas.filter(l => l != letra),
                        qtd_acertos: prev.qtd_acertos - 1
                    }
                })
                setHistoricoLetras(prev => prev.filter(l => l != letra))
            }
        }
    }
    
    // AUTOPREENCHIMENTO DAS LETRAS
    useEffect(() => {
        if (prefAutoPreen) {
            setStatusLetra(acertos.letrasAcertadas.includes(letra))
            acertos.letrasAcertadas.includes(letra) ? setValue(letra) : null

            if (tentativas.length > 0 && !acertos.letrasAcertadas.includes(letra)) {
                tentativas.forEach(t => {
                    if (t.simbolo == simb) {
                        setValue(t.letraErrada)
                        setStatusLetra(false)
                    }
                })
            }
        }
    }, [acertos, tentativas])

    //console.log('hist: ', historicoLetras.pop());

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