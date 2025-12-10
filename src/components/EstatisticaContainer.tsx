import { View, Text, StyleSheet } from "react-native"
import { componente } from "../styles/StylesGlobal"

export default function EstatisticaContainer() {
    return (
        <View style={styles.containerEstatisticas}>
            <Text style={componente._titulo_3}>Fácil</Text>
            <View style={styles.linhaContainer}>
                <View>
                    <Text style={componente._texto_2}>Partidas</Text>
                    <Text style={[componente._texto_1, { fontWeight: 900 }]}>99</Text>
                </View>
                <View>
                    <Text style={componente._texto_2}>Melhor Tempo</Text>
                    <Text style={[componente._texto_1, { fontWeight: 900 }]}>00:00</Text>
                </View>
                <View>
                    <Text style={componente._texto_2}>Melhor Pontuação</Text>
                    <Text style={[componente._texto_1, { fontWeight: 900 }]}>5.432</Text>
                </View>
            </View>
        </View>
    )
} 

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20
    },
    linhaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    containerEstatisticas: {
        marginVertical: 6,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 24,
        paddingVertical: 18,
        borderRadius: 16
    },
    iconeEstatistica: {
        marginBottom: 6
    },
})