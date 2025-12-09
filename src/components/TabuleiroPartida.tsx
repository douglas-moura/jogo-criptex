import { View, Text, StyleSheet } from "react-native"
import { useEffect, useMemo, useState } from "react"
import { dividirPalavra } from "../functions/dividirPalavra"
import { charadas } from "../../db/charadas"
import { Partida } from "../types/classes"
import { useJogo } from "../context/JogoContext"
import { contarAcertos } from "../functions/contarAcertos"
import { useNavigation } from "@react-navigation/native"
import BoxLetra from "./BoxLetra"

export default function TabuleiroPartida() {
    let partida: Partida | null = useMemo(() => new Partida(new Date().getTime(), charadas), [])
    const [partidaAtual, setPartidaAtual] = useState<Partida | null>(partida)
    const partidaLetras = partidaAtual ? partidaAtual.getLetras() : []
    const partidaCharadas = partidaAtual ? partidaAtual.getCharadas() : []
    console.log("letras tot:", partidaAtual ? partidaAtual.getId() : null, partidaLetras.length);

    partidaLetras.map((l, index) => {
        //console.log("letra:",index, l.letra)
    })
    
    const { acertos, encerrarPartida } = useJogo()
    const navigation = useNavigation<any>()

    useEffect(() => {
        if (partidaLetras.length == contarAcertos(acertos)) {
            encerrarPartida()
            setPartidaAtual(null)
            setTimeout(navigation.navigate("Parabens" as never), 1000)
        }
    }, [acertos])

    return (
        <View style={styles.tabuleiro}>
            {partidaCharadas.map((item, index) => (
                dividirPalavra(item.resposta).length == item.qtd_letras /*&& dividirPalavra(item.resposta).length == 7*/ ?
                    <View style={styles.tabuleiroLinha} key={index}>
                        <Text style={styles.linhaDica}>{item.dica}</Text>
                        <View style={styles.linhaLetras}>
                            {dividirPalavra(item.resposta).map((letra, index) => (
                                partidaLetras.map((l, indexL) => {
                                    if (l.letra === letra) {
                                        return <BoxLetra key={indexL} letra={l.letra} simb={l.simbolo} />
                                    }
                                })
                            ))}
                        </View>
                    </View>
                : null
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    tabuleiro: {
        flex: 1,
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
        width: '40%',
        fontSize: 10,
    },
    linhaLetras: {
        width: '60%',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
})