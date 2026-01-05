import { View, Text, StyleSheet } from "react-native"
import { componente } from "../styles/StylesGlobal"
import { Estatistica } from "../types/interfaces"
import { temas } from "../styles/StylesGlobal"
import { useJogo } from "../context/JogoContext"
import numToTime from "../functions/numToTime"

export default function EstatisticaContainer({titulo, data}: {titulo: string, data: Estatistica | null}) {
    const { prefTema } = useJogo()
    const temaAtivo = prefTema ? temas.dark : temas.light

    return (
        <View style={[styles.containerEstatisticas, temaAtivo._borderColor, temaAtivo._bgPagina]}>
            <Text style={[ temaAtivo._colorTexto, componente._titulo_3 ]}>{titulo}</Text>
            <View style={styles.linhaContainer}>
                <View>
                    <Text style={[temaAtivo._colorTexto, componente._texto_2]}>Partidas</Text>
                    <Text style={[temaAtivo._colorTexto, componente._texto_1, {fontFamily: 'FredokaB'} ]}>{data ? data.qtd_partidas : 0}</Text>
                </View>
                <View>
                    <Text style={[temaAtivo._colorTexto, componente._texto_2]}>Melhor Tempo</Text>
                    <Text style={[temaAtivo._colorTexto, componente._texto_1, {fontFamily: 'FredokaB'}]}>{numToTime(data ? data.tempo : 0)}</Text>
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
        paddingHorizontal: 24,
        paddingVertical: 18,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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