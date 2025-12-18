import { View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useJogo } from "../../src/context/JogoContext"
import { useState, useEffect } from "react"
import { Estatistica } from "../../src/types/interfaces"
import { salvarDesempenho } from "../../src/functions/desempenhosFunctions"
import { temas } from "../../src/styles/StylesGlobal"
import BotaoPadrao from "../../src/components/BotaoPadrao"
import numToTime from "../../src/functions/numToTime"

export default function ParabensScreen() {
    const { tempo, dificuldadeSelecionada, tentativas, prefLimiteErros, prefTema } = useJogo()
    const [ tempoFinal, setTempoFinal ] = useState(tempo)
    const [ temaAtivo, setTemaAtivo ] = useState(temas.light)
    const [ erros, setErros ] = useState(tentativas.length)

    const desempenho: Estatistica = {
        qtd_partidas: 1,
        tempo: tempoFinal,
        pontuacao: 0,
    }

    useEffect(() => {
        //console.log(erros)
        erros >= 3 && prefLimiteErros ? null : salvarDesempenho(dificuldadeSelecionada, desempenho)
    }, [])
    
    useEffect(() => {
        setTemaAtivo(prefTema ? temas.dark : temas.light)
    }, [prefTema])

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20, backgroundColor: temaAtivo.backgroundColor }}>
            { erros >= 3 && prefLimiteErros ? <Text>LIMITE DE ERROS ATINGIDO!</Text> : <Text>PARABÉNS! VOCÊ COMPLETOU A PARTIDA!</Text> }
            { erros >= 3 && prefLimiteErros ? null : <Text>Tempo: {numToTime(tempoFinal)}</Text> }
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