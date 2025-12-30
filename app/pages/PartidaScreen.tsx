import { View, Text, StyleSheet, Pressable } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { useJogo } from "../../src/context/JogoContext"
import { useEffect } from "react"
import { componente, paletaCores, temas } from "../../src/styles/StylesGlobal"
import { Ionicons } from "@expo/vector-icons"
import BotaoPadrao from "../../src/components/BotaoPadrao"
import TabuleiroPartida from "../../src/components/TabuleiroPartida"
import numToTime from "../../src/functions/numToTime"
import PausePelicula from "../../src/components/PausePelicula"

export default function PartidaScreen() {
    const { setStart, pause, setPause, tempo, tentativas, resetarJogo, prefTema, prefLimiteErros } = useJogo()
    const temaAtivo = prefTema ? temas.dark : temas.light

    useEffect(() => { setTimeout(() => setStart(true), 500) }, [])

    const encerrarPartida = () => resetarJogo()

    return (
        <SafeAreaView style={[ temaAtivo._bgPagina, componente._pagina ]}>
            <View style={[componente._container, componente._linha, { justifyContent: 'space-between' } ]}>
                <View>
                    <BotaoPadrao
                        icone="arrow-back-outline"
                        texto="Voltar"
                        destino="Voltar"
                        onClick={encerrarPartida}
                    />
                </View>
                <Pressable style={componente._linha} onPress={() => setPause(!pause)}>
                    <Text style={[temaAtivo._colorTexto, componente._titulo_4]}>{pause ? 'Pausado' : 'Pausar'}</Text>
                    <Ionicons style={[temaAtivo._colorTexto, { marginLeft: 4 } ]} name={pause ? 'play-circle-outline' : 'pause-circle-outline'} size={32} />
                </Pressable>
            </View>
            <View style={[componente._container, componente._linha, styles.cabecalho, temaAtivo._borderColor]}>
                <View style={componente._linha}>
                    <Ionicons style={{ marginRight: 8, color: paletaCores._primario }} name={'time-outline'} size={24} />
                    <Text style={[temaAtivo._colorTexto, componente._titulo_4, { width: 55 } ]}>{numToTime(tempo)}</Text>
                </View>
                {
                    prefLimiteErros ?
                        <View style={componente._linha}>
                            <Text style={[componente._titulo_4, { color: paletaCores._primario, marginRight: 4 } ]}>Erros:</Text>
                            <Text style={[temaAtivo._colorTexto, componente._titulo_4]}>{3 - tentativas.length}</Text>
                        </View>
                        : null
                }
            </View>
            <View style={{ height: 10 * (56 + 8) + 8, alignItems: 'center' }}>
                <TabuleiroPartida />
            </View>
            { pause ? <PausePelicula /> : null }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    cabecalho: {
        gap: 32,
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 1,
        marginBottom: 12,
        padding: 8
    }
})