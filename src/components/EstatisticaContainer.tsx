import { View, Text, StyleSheet } from "react-native"
import { componente } from "../styles/StylesGlobal"
import { Estatistica } from "../types/interfaces"
import numToTime from "../functions/numToTime"

export default function EstatisticaContainer({titulo, data}: {titulo: string, data: Estatistica | null}) {    
    return (
        <View style={styles.containerEstatisticas}>
            <Text style={componente._titulo_3}>{titulo}</Text>
            <View style={styles.linhaContainer}>
                <View>
                    <Text style={componente._texto_2}>Partidas</Text>
                    <Text style={[componente._texto_1, { fontWeight: 900 }]}>{data ? data.qtd_partidas : 0}</Text>
                </View>
                <View>
                    <Text style={componente._texto_2}>Melhor Tempo</Text>
                    <Text style={[componente._texto_1, { fontWeight: 900 }]}>{numToTime(data ? data.tempo : 0)}</Text>
                </View>
                {/*}
                <View>
                    <Text style={componente._texto_2}>Maior Pontuação</Text>
                    <Text style={[componente._texto_1, { fontWeight: 900 }]}>{data ? data.pontuacao : 0}</Text>
                </View>
                */}
            </View>
        </View>
    )
} 

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20
    },
    containerEstatisticas: {
        marginVertical: 6,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 24,
        paddingVertical: 18,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    linhaContainer: {
        width: '60%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconeEstatistica: {
        marginBottom: 6
    },
})