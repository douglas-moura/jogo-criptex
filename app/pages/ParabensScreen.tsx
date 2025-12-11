import { View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useJogo } from "../../src/context/JogoContext"
import { useState, useEffect } from "react"
import { Estatistica } from "../../src/types/interfaces"
import { salvarDesempenho } from "../../src/functions/desempenhos"
import BotaoPadrao from "../../src/components/BotaoPadrao"
import numToTime from "../../src/functions/numToTime"

export default function ParabensScreen() {
    const {tempo, dificuldadeSelecionada} = useJogo()
    const [tempoFinal, setTempoFinal] = useState(tempo)

    const desempenho: Estatistica = {
        qtd_partidas: 1,
        tempo: tempoFinal,
        pontuacao: 0,
    }

    useEffect(() => {
        salvarDesempenho(dificuldadeSelecionada, desempenho)
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20 }}>
            <Text>PARABÉNS! VOCÊ COMPLETOU A PARTIDA!</Text>
            <Text>Tempo: {numToTime(tempoFinal)}</Text>
            <Text>Dificuldade: {dificuldadeSelecionada}</Text>
            <View style={{ width: '60%', borderWidth: 1, borderColor: 'blue' }}>
                <BotaoPadrao
                    icone="arrow-back-outline"
                    texto="Jogar Novamente"
                    destino="Tabs"
                />
            </View>
        </SafeAreaView>
    )
}