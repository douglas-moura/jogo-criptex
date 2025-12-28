import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Keyboard, Animated } from "react-native"
import { useEffect, useState, useRef } from "react"
import { dividirPalavra } from "../functions/dividirPalavra"
import { charadas } from "../../db/charadas"
import { Partida } from "../types/classes"
import { useJogo } from "../context/JogoContext"
import { useNavigation } from "@react-navigation/native"
import { selecionarCharadas } from "../functions/selecionarCharadas"
import { temas, componente } from "../styles/StylesGlobal"
import { linear } from "../functions/animacoesEfeitos"
import BoxLetra from "./BoxLetra"

export default function TabuleiroPartida() {
    const { partida, setPartida, acertos, tentativas, setTentativas, encerrarPartida, dificuldadeSelecionada, prefTema, prefAutoPreen, prefLimiteErros } = useJogo()
    const [ finalizada, setFinalizada ] = useState(false)
    const [ tecladoAltura, setTecladoAltura ] = useState(0)
    const linhaCharadaOpacity = useRef(new Animated.Value(0)).current
    const temaAtivo = prefTema ? temas.dark : temas.light
    const navigation = useNavigation<any>()

    switch (dificuldadeSelecionada) {
        case 'Fácil':
            var numLetraPalavras = 4
            break;
        case 'Médio':
            var numLetraPalavras = 6
            break;
        case 'Difícil':
            var numLetraPalavras = 8
            break;
        default:
            var numLetraPalavras = 3
            break;
    }

    // Inicializa a partida apenas uma vez no mount
    useEffect(() => {
        const p = new Partida(new Date().getTime(), selecionarCharadas(charadas, dificuldadeSelecionada), dificuldadeSelecionada)
        setTentativas([])
        setPartida(p)
        return () => setPartida(null)
    }, [setPartida])

    useEffect(() => {
        if (!partida || finalizada) return

        const venceuAuto = prefAutoPreen && partida.getLetras().length === acertos.qtd_acertos

        const venceuManual = !prefAutoPreen && (partida.getCharadas().length * numLetraPalavras) === acertos.qtd_acertos

        const perdeu = tentativas.length >= 3 && prefLimiteErros

        if (venceuAuto || venceuManual || perdeu) {
            setFinalizada(true)
            encerrarPartida()

            setTimeout(() => {
                setPartida(null)
                navigation.navigate("Parabens")
            }, 300)
        }
    }, [acertos, tentativas, partida, prefAutoPreen, prefLimiteErros])

    useEffect(() => {
        // animação das linhas
        linear(linhaCharadaOpacity, 1, 700)

        const showSub = Keyboard.addListener('keyboardDidShow', e => {
            setTecladoAltura(e.endCoordinates.height)
        })

        const hideSub = Keyboard.addListener('keyboardDidHide', () => {
            setTecladoAltura(0)
        })
        
        return () => {
            showSub.remove()
            hideSub.remove()
        }
    }, [])

    return (
        <KeyboardAvoidingView 
            style={{ flex: 1, width: '100%' }} 
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        >
            <ScrollView
                style={styles.tabuleiro}
                contentContainerStyle={{
                    alignItems: 'center',
                    paddingBottom: tecladoAltura - 40
                }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {partida?.getCharadas().map((item, index) => (
                    dividirPalavra(item.resposta).length == item.qtd_letras ?
                        <View style={[styles.tabuleiroLinha]} key={index}>
                            <Text style={[temaAtivo._colorTexto, componente._texto_3, styles.linhaDica]}>{item.dica}</Text>
                            <View style={styles.linhaLetras}>
                                {dividirPalavra(item.resposta).map((letra, index) => (
                                    partida.getLetras().map((l, indexL) => {
                                        if (l.letra === letra) {
                                            return <BoxLetra key={indexL} id={index} letra={l.letra} simb={l.simbolo} />
                                        }
                                    })
                                ))}
                            </View>
                        </View>
                    : null
                ))}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    tabuleiro: {
        flexGrow: 1,
        //backgroundColor: 'red',
        paddingTop: 8,
        width: '100%',
    },
    tabuleiroLinha: {
        height: 50,
        borderWidth: 0,
        //backgroundColor: 'orange',
        borderColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    linhaDica: {
        width: '30%',
    },
    linhaLetras: {
        gap: 2,
        width: '60%',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
})