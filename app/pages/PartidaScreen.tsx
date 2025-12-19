import { View, Text } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { useJogo } from "../../src/context/JogoContext"
import { useEffect } from "react"
import { componente, temas } from "../../src/styles/StylesGlobal"
import { Ionicons } from "@expo/vector-icons"
import BotaoPadrao from "../../src/components/BotaoPadrao"
import TabuleiroPartida from "../../src/components/TabuleiroPartida"
import numToTime from "../../src/functions/numToTime"

export default function PartidaScreen() {
    const { setStart, tempo, tentativas, resetarJogo, prefTema, prefLimiteErros } = useJogo()
    const temaAtivo = prefTema ? temas.dark : temas.light

    useEffect(() => { setTimeout(() => setStart(true), 500) }, [])

    const encerrarPartida = () => resetarJogo()

    return (
        <SafeAreaView style={[ temaAtivo._bgPagina, componente._pagina ]}>
            <View>
                <BotaoPadrao
                    icone="arrow-back-outline"
                    texto="Voltar"
                    destino="Voltar"
                    onClick={encerrarPartida}
                />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginBottom: 12 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Ionicons style={[temaAtivo._colorTexto, { marginRight: 8 }]} name={'time-outline'} size={24} />
                    <Text style={[temaAtivo._colorTexto, componente._titulo_3]}>{numToTime(tempo)}</Text>
                </View>
                { prefLimiteErros ? <Text style={[temaAtivo._colorTexto, componente._titulo_4]}>Erros: {3 - tentativas.length}</Text> : null }
                {/* <Text>Pontos: {calcularPontos(tempo, acertos.qtd_acertos, tentativas.length)}</Text> */}
            </View>
            <View style={[ temaAtivo._borderColor, { height: 12 * 50 + 30, padding: 12, alignItems: 'center', borderWidth: 1, borderRadius: 8 } ]}>
                <TabuleiroPartida />
            </View>
        </SafeAreaView>
    )
}