import { View, Text } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { useJogo } from "../../src/context/JogoContext"
import { useEffect, useState } from "react"
import { temas } from "../../src/styles/StylesGlobal"
import BotaoPadrao from "../../src/components/BotaoPadrao"
import TabuleiroPartida from "../../src/components/TabuleiroPartida"
import numToTime from "../../src/functions/numToTime"

export default function PartidaScreen() {
    const { setStart, tempo, acertos, tentativas, resetarJogo, prefTema, prefLimiteErros } = useJogo()
    const [ temaAtivo, setTemaAtivo ] = useState(temas.light)

    useEffect(() => { setTimeout(() => setStart(true), 500) }, [])
    
    useEffect(() => {
        setTemaAtivo(prefTema ? temas.dark : temas.light)
    }, [prefTema])

    const encerrarPartida = () => resetarJogo()

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: temaAtivo.backgroundColor }}>
            <View style={{ width: '30%', borderWidth: 1, borderColor: 'blue' }}>
                <BotaoPadrao
                    icone="arrow-back-outline"
                    texto="Voltar"
                    destino="Voltar"
                    onClick={encerrarPartida}
                />
            </View>
            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 20 }}>
                <Text>Tempo: {numToTime(tempo)}</Text>
                { prefLimiteErros ? <Text>Erros: {3 - tentativas.length}</Text> : null }
                {/* <Text>Pontos: {calcularPontos(tempo, acertos.qtd_acertos, tentativas.length)}</Text> */}
            </View>
            <View style={{ flex: 1, paddingVertical: 20, alignItems: 'center' }}>
                <TabuleiroPartida />
            </View>
        </SafeAreaView>
    )
}