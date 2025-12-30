import { View, Text, StyleSheet, Pressable } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { temas, componente } from "../styles/StylesGlobal"
import { useJogo } from "../context/JogoContext"
import numToTime from "../functions/numToTime"

export default function PausePelicula() {
    const { prefTema, tempo, setPause } = useJogo()
    const temaAtivo = prefTema ? temas.dark : temas.light

    return (
        <View style={[componente._conteudoCentral, styles.pauseContainer]}>
            <View style={styles.pauseTexto}>
                <Pressable onPress={() => setPause(false)}>
                    <Ionicons style={[temaAtivo._colorTexto]} name={'play-circle-outline'} size={72} />
                </Pressable>
                <Text style={[componente._titulo_1, temaAtivo._colorTexto]}>Retomar</Text>
                <Text style={[componente._texto_1, temaAtivo._colorTexto, { marginTop: 28 } ]}>Tempo: {numToTime(tempo)}</Text>
            </View>
            <View style={[temaAtivo._bgPagina, styles.pausePelicula]}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    pauseContainer: {
        zIndex: 99,
        position: 'absolute',
        width: '100%'
    },
    pauseTexto: {
        zIndex: 99,
        width: '100%',
        alignItems: 'center'
    },
    pausePelicula: {
        zIndex: 98,
        position: 'absolute',
        height: '100%',
        width: '100%',
        opacity: .9
    }
})