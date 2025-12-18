import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import { useEffect } from "react"
import { dividirPalavra } from "../functions/dividirPalavra"
import { charadas } from "../../db/charadas"
import { Partida } from "../types/classes"
import { useJogo } from "../context/JogoContext"
import { contarAcertos } from "../functions/contarAcertos"
import { useNavigation } from "@react-navigation/native"
import { selecionarCharadas } from "../functions/selecionarCharadas"
import BoxLetra from "./BoxLetra"

export default function TabuleiroPartida() {
    const { partida, setPartida, acertos, encerrarPartida, dificuldadeSelecionada, prefAutoPreen } = useJogo()
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
        setPartida(p)
        return () => setPartida(null)
    }, [setPartida])

    useEffect(() => {
        // Estes são os 2 modos de encerrar a partida de acordo com a preferência de autopreenchimento
        if (prefAutoPreen) {
            if (partida && partida.getLetras().length == acertos.qtd_acertos) {
                encerrarPartida()
                setTimeout(() => {
                    setPartida(null)
                    navigation.navigate("Parabens" as never)
                }, 300)
            }
        } else {
            if (partida && (partida.getCharadas().length * numLetraPalavras) == acertos.qtd_acertos) {
                encerrarPartida()
                setTimeout(() => {
                    setPartida(null)
                    navigation.navigate("Parabens" as never)
                }, 300)
            }
        }
    }, [acertos, partida, encerrarPartida, navigation, setPartida])

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