import { View, Text, StyleSheet } from "react-native"
import { palavras } from "../../db/dicas_palavras"
import BoxLetra from "./BoxLetra"

export default function TabuleiroPartida() {
    return (
        <View style={styles.tabuleiro}>
            {palavras.map((item, index) => (
                <View style={styles.tabuleiroLinha} key={index}>
                    <Text style={styles.linhaDica}>{item.dica}</Text>
                    <View style={styles.linhaLetras}>
                        {Array.from({ length: item.qtd_letras }).map((_, i) => (
                            <BoxLetra key={i} />
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