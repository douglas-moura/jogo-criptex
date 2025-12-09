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
    const { partida, setPartida, acertos, encerrarPartida } = useJogo()
    const navigation = useNavigation<any>()

    // Inicializa a partida apenas uma vez no mount
    useEffect(() => {
        const p = new Partida(new Date().getTime(), charadas)
        setPartida(p)
        return () => setPartida(null)
    }, [setPartida])
    
    console.log("letras tot:", partida ? partida.getId() : null, partida?.getLetras().length);

    useEffect(() => {
        if (partida && partida.getLetras().length == contarAcertos(acertos)) {
            encerrarPartida()
            setPartida(null)
            setTimeout(() => navigation.navigate("Parabens" as never), 1000)
        }
    }, [acertos, partida, encerrarPartida, navigation, setPartida])

    return (
        <View style={styles.tabuleiro}>
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