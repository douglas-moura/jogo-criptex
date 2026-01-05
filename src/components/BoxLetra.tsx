import { View, Text, TextInput, NativeSyntheticEvent, TextInputChangeEventData, Animated, StyleSheet } from "react-native"
import { useEffect, useState, useRef } from "react"
import { temas, componente } from "../styles/StylesGlobal"
import { useJogo } from "../context/JogoContext"
import { linear, shake } from "../functions/animacoesEfeitos"

function checarLetra(letraPalpite: string, letraCerta: string): boolean {
    return letraPalpite.toLocaleUpperCase() == letraCerta.toLocaleUpperCase()
}

export default function BoxLetra({id, letra, simb}: {id: number, letra: string, simb: number}) {
    //const inputRef = useRef<TextInput>(null)
    const { acertos, setAcertos, tentativas, setTentativas, prefTema, prefAutoPreen, prefExibirAcertos } = useJogo()
    const [ value, setValue ] = useState('')
    const [ statusLetra, setStatusLetra ] = useState<boolean>(acertos.letrasAcertadas.includes(letra))
    const [ historicoLetras, setHistoricoLetras ] = useState<string[]>([])
    const boxEscala = useRef(new Animated.Value(0)).current
    const boxPosition = useRef(new Animated.Value(0)).current
    const temaAtivo = prefTema ? temas.dark : temas.light

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
                if (prefExibirAcertos) {
                    shake(boxPosition, -4, 1000)
                    shake(boxEscala, 1.1, 5000)
                }
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

    useEffect(() => {
        linear(boxEscala, 1, (id + 1) * 100)
    }, [])

    return (
        <Animated.View style={[styles.letraContainer, { scaleX: boxEscala, scaleY: boxEscala }]}>
            <Animated.View style={[temaAtivo._borderColor, styles.letraBox, { transform: [{ translateY: boxPosition }] } ]}>
                <TextInput
                    style={[
                        componente._texto_2,
                        styles.letraInput,
                        { backgroundColor: (value == '' || !prefExibirAcertos) ? temaAtivo._bgElemento.backgroundColor : statusLetra && value == letra ? 'lightgreen' : 'red' }
                    ]}
                    maxLength={1}
                    value={value}
                    onChange={handleChange}
                    editable={!statusLetra || !prefExibirAcertos}
                />
            </Animated.View>
            <Text style={[temaAtivo._colorTexto, componente._texto_4, styles.simbolo]}>{simb}</Text>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    letraContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 24,
        height: 40,
        borderWidth: 0,
    },
    letraBox: {
        width: '100%',
        aspectRatio: 1 / 1,
        borderRadius: 4, 
        borderWidth: 1,
        overflow: 'hidden',
    },
    letraInput: {
        color: 'black',
        borderBottomWidth: 0,
        borderColor: 'black',
        width: '100%',
        height: '100%',
        padding: 0,
        textAlign: 'center',
    },
    simbolo: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        alignItems: 'flex-end',
        //padding: 2,
        borderRadius: 500,
        aspectRatio: 1 / 1,
        textAlign: 'center'
    }
})