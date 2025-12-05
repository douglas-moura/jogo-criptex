import { View, Text, StyleSheet } from "react-native"
import BoxLetra from "./BoxLetra"

export default function TabuleiroPartida() {
    return (
        <View style={styles.tabuleiro}>
            <View style={styles.tabuleiroLinha}>
                <Text style={styles.linhaDica}>Campo da frase da dica</Text>
                <View style={styles.linhaLetras}>
                    <BoxLetra />
                    <BoxLetra />
                    <BoxLetra />
                    <BoxLetra />
                    <BoxLetra />
                    <BoxLetra />
                    <BoxLetra />
                </View>
            </View>
            <View style={styles.tabuleiroLinha}>
                <Text style={styles.linhaDica}>Campo da frase da dica</Text>
                <View style={styles.linhaLetras}>
                    <BoxLetra />
                    <BoxLetra />
                    <BoxLetra />
                    <BoxLetra />
                    <BoxLetra />
                    <BoxLetra />
                    <BoxLetra />
                </View>
            </View>
            <View style={styles.tabuleiroLinha}>
                <Text style={styles.linhaDica}>Campo da frase da dica</Text>
                <View style={styles.linhaLetras}>
                    <BoxLetra />
                    <BoxLetra />
                    <BoxLetra />
                    <BoxLetra />
                    <BoxLetra />
                    <BoxLetra />
                    <BoxLetra />
                </View>
            </View>
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
        justifyContent: 'flex-end'
    }
})