import { View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useJogo } from "../../src/context/JogoContext"
import { useState, useEffect } from "react"
import BotaoPadrao from "../../src/components/BotaoPadrao"
import numToTime from "../../src/functions/numToTime"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Estatistica } from "../../src/types/interfaces"
import { quantidadePartidas } from "../../db/desempenhos"

const salvarDesempenho = async (chave: string, dados: Estatistica) => {
    const keys = await AsyncStorage.getAllKeys() // Obtém todas as chaves
    const items = await AsyncStorage.multiGet(keys) // Obtém todos os pares chave-valor
    //await AsyncStorage.removeItem('@desempenho:' + chave.toLocaleLowerCase())
    
    try {
        const response = await AsyncStorage.getItem('@desempenho:' + chave.toLocaleLowerCase())

        if (!response) {
            await AsyncStorage.setItem('@desempenho:' + chave.toLocaleLowerCase(), JSON.stringify(dados))
        } else {
            const response = await AsyncStorage.getItem('@desempenho:' + chave.toLocaleLowerCase())
            const data: Estatistica = response ? JSON.parse(response) : null
            const novoDesemp = await AsyncStorage.setItem('@desempenho:' + chave.toLocaleLowerCase(), JSON.stringify(compararDesempenhos(data, dados)))
        }
        
    } catch (e) {
        console.log("Nenhum dado encontrado:", e)
        return null
    }
    console.log("Todos os itens do AsyncStorage:", items)
}

const compararDesempenhos = (dadosSalvos: Estatistica, dadosNovos: Estatistica): Estatistica => {
    let novoArrayDesempenho: Estatistica = {
        qtd_partidas: 0,
        tempo: 0,
        pontuacao: 0,
    }

    novoArrayDesempenho.tempo = dadosSalvos.tempo <= dadosNovos.tempo ? dadosSalvos.tempo : dadosNovos.tempo
    novoArrayDesempenho.pontuacao = dadosSalvos.pontuacao >= dadosNovos.pontuacao ? dadosSalvos.pontuacao : dadosNovos.pontuacao
    novoArrayDesempenho.qtd_partidas = dadosSalvos.qtd_partidas++

    return novoArrayDesempenho
}

export default function ParabensScreen() {
    const {tempo, dificuldadeSelecionada} = useJogo()
    const [tempoFinal, setTempoFinal] = useState(tempo)
    const [numQuantidadePartidas, SetNumQuantidadePartidas] = useState(0)

    const desempenho: Estatistica = {
        qtd_partidas: numQuantidadePartidas,
        tempo: tempoFinal,
        pontuacao: 0,
    }

    useEffect(() => {
        quantidadePartidas(dificuldadeSelecionada).then((dados) => {
            SetNumQuantidadePartidas(dados)
        })

        salvarDesempenho(dificuldadeSelecionada, desempenho)

        console.log('QTD', desempenho.qtd_partidas)
    }, [desempenho])

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