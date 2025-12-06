import { View, Text, StyleSheet } from "react-native"
import { dividirPalavra } from "../functions/dividirPalavra"
import { charadas } from "../../db/charadas"
import { Partida } from "../types/classes"
import BoxLetra from "./BoxLetra"

export default function TabuleiroPartida() {
    const partida = new Partida(1, charadas)
    const partidaLetras = partida.getLetras()
    console.log('letras partida', partidaLetras)

    return (
        <View style={styles.tabuleiro}>
            {partida.getCharadas().map((item, index) => (
                <View style={styles.tabuleiroLinha} key={index}>
                    <Text style={styles.linhaDica}>{item.dica}</Text>
                    <View style={styles.linhaLetras}>
                        {dividirPalavra(item.resposta).map((letra, index) => (
                            partidaLetras.map((l, indexL) => {
                                if (l.caracter === letra) {
                                    return <BoxLetra key={index} letra={letra} caract={l.simbolo} />
                                }
                            })
                        ))}
                    </View>
                </View>
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
    },
    linhaDica: {
        width: '40%',
        fontSize: 12,
    },
    linhaLetras: {
        width: '60%',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    }
})