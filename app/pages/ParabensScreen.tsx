import { View, Text, StyleSheet, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useJogo } from "../../src/context/JogoContext"
import { useState, useEffect } from "react"
import { Estatistica } from "../../src/types/interfaces"
import { salvarDesempenho } from "../../src/functions/desempenhosFunctions"
import { componente, temas } from "../../src/styles/StylesGlobal"
import BotaoPadrao from "../../src/components/BotaoPadrao"
import numToTime from "../../src/functions/numToTime"

export default function ParabensScreen() {
    const { tempo, dificuldadeSelecionada, tentativas, prefLimiteErros, prefTema } = useJogo()
    const [ tempoFinal, setTempoFinal ] = useState(tempo)
    const [ erros, setErros ] = useState(tentativas.length)
    const temaAtivo = prefTema ? temas.dark : temas.light

    const desempenho: Estatistica = {
        qtd_partidas: 1,
        tempo: tempoFinal,
        pontuacao: 0,
    }

    useEffect(() => {
        //console.log(erros)
        erros >= 3 && prefLimiteErros ? null : salvarDesempenho(dificuldadeSelecionada, desempenho)
    }, [])

    return (
        <SafeAreaView style={[ temaAtivo._bgPagina, componente._pagina, { gap: 20 } ]}>
            <View style={[componente._container, componente._conteudoCentral, { alignItems: 'center' }]}>
                {erros >= 3 && prefLimiteErros ? 
                    <Text style={[temaAtivo._colorTexto, componente._titulo_2, styles.titulo ]}>LIMITE DE ERROS ATINGIDO!</Text> :
                    <View style={{ flexDirection: 'column', alignItems: 'center', width: 300, gap: 32 }}>
                        <Image source={require("../../assets/img/recompensa.png")} style={{ width: 120, height: 120, marginHorizontal: 'auto' }} />
                        <Text style={[temaAtivo._colorTexto, componente._titulo_2, styles.titulo ]}>PARABÉNS! VOCÊ COMPLETOU A PARTIDA!</Text>
                    </View>
                }
                { erros >= 3 && prefLimiteErros ? null : <Text style={[temaAtivo._colorTexto, componente._titulo_3]}>Tempo: {numToTime(tempoFinal)}</Text> }
                <Text style={[temaAtivo._colorTexto, componente._titulo_4, { marginVertical: 18 }]}>Dificuldade: {dificuldadeSelecionada}</Text>
                <View style={{ width: '80%', borderWidth: 0, borderColor: 'blue', marginTop: 32 }}>
                    <BotaoPadrao
                        icone="arrow-back-outline"
                        texto="Jogar Novamente"
                        destino="Tabs"
                        type="secundario"
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    titulo: {
        textAlign: 'center',
        marginBottom: 12,
    }
})