import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import { useEffect, useState } from "react"
import { dividirPalavra } from "../functions/dividirPalavra"
import { charadas } from "../../db/charadas"
import { Partida } from "../types/classes"
import { useJogo } from "../context/JogoContext"
import { contarAcertos } from "../functions/contarAcertos"
import { useNavigation } from "@react-navigation/native"
import { selecionarCharadas } from "../functions/selecionarCharadas"
import BoxLetra from "./BoxLetra"

export default function TabuleiroPartida() {
    const { partida, setPartida, acertos, tentativas, setTentativas, encerrarPartida, dificuldadeSelecionada, prefAutoPreen, prefLimiteErros } = useJogo()
    const navigation = useNavigation<any>()
    const [finalizada, setFinalizada] = useState(false)

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

    return (
        <KeyboardAvoidingView 
            style={{ flex: 1 }} 
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView
                contentContainerStyle={styles.tabuleiro}
                keyboardShouldPersistTaps="always"
            >
                {partida?.getCharadas().map((item, index) => (
                    dividirPalavra(item.resposta).length == item.qtd_letras /*&& dividirPalavra(item.resposta).length == 7*/ ?
                        <View style={styles.tabuleiroLinha} key={index}>
                            <Text style={styles.linhaDica}>{item.dica}</Text>
                            <View style={styles.linhaLetras}>
                                {dividirPalavra(item.resposta).map((letra, index) => (
                                    partida.getLetras().map((l, indexL) => {
                                        if (l.letra === letra) {
                                            return <BoxLetra key={indexL} letra={l.letra} simb={l.simbolo} />
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
        //flex: 1,
        borderWidth: 1,
        borderColor: 'red',
        width: 350
    },
    tabuleiroLinha: {
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
        gap: 2,
    },
    linhaDica: {
        width: '30%',
        fontSize: 10,
    },
    linhaLetras: {
        width: '60%',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
})