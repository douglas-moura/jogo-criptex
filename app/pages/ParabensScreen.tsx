import { View, Text, StyleSheet, Image, Animated } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useJogo } from "../../src/context/JogoContext"
import { useState, useEffect, useRef } from "react"
import { Estatistica } from "../../src/types/interfaces"
import { salvarDesempenho } from "../../src/functions/desempenhosFunctions"
import { componente, temas } from "../../src/styles/StylesGlobal"
import { linear } from "../../src/functions/animacoesEfeitos"
import BotaoPadrao from "../../src/components/BotaoPadrao"
import numToTime from "../../src/functions/numToTime"
import ImagemTextura from "../../src/components/ImagemTextura"

export default function ParabensScreen() {
    const { tempo, dificuldadeSelecionada, tentativas, prefLimiteErros, prefTema } = useJogo()
    const [ tempoFinal, setTempoFinal ] = useState(tempo)
    const [ erros, setErros ] = useState(tentativas.length)
    const imgOpacity = useRef(new Animated.Value(0)).current
    const imgTamanho = useRef(new Animated.Value(.8)).current
    const temaAtivo = prefTema ? temas.dark : temas.light

    const desempenho: Estatistica = {
        qtd_partidas: 1,
        tempo: tempoFinal,
        pontuacao: 0,
    }

    useEffect(() => {
        //console.log(erros)
        erros >= 3 && prefLimiteErros ? null : salvarDesempenho(dificuldadeSelecionada, desempenho)

        linear(imgOpacity, 1, 300)
        linear(imgTamanho, 1, 350)
    }, [])

    return (
        <SafeAreaView style={[ temaAtivo._bgPagina, componente._pagina, { gap: 20 } ]}>
            <ImagemTextura />
            <View style={[componente._container, componente._conteudoCentral, { alignItems: 'center' }]}>
                {
                    erros >= 3 && prefLimiteErros ? 
                        <View style={[ styles.imgContainer]}>
                            <Animated.View style={{ opacity: imgOpacity, transform: [{ scale: imgTamanho }] }}>
                                <Image source={require("../../assets/img/derrota.png")} style={{ width: 260, height: 260, marginHorizontal: 'auto' }} />
                            </Animated.View>
                            <Text style={[temaAtivo._colorTextoDestaque, componente._titulo_2, styles.titulo ]}>QUE PENA! VOCÊ ATINGIU O LIMITE DE ERROS!</Text>
                        </View>
                        :
                        <View style={[ styles.imgContainer]}>
                            <Animated.View style={{ opacity: imgOpacity, transform: [{ scale: imgTamanho }] }}>
                                <Image source={require("../../assets/img/vitoria.png")} style={{ width: 260, height: 260, marginHorizontal: 'auto' }} />
                            </Animated.View>
                            <Text style={[temaAtivo._colorTextoDestaque, componente._titulo_2, styles.titulo ]}>PARABÉNS! VOCÊ COMPLETOU A PARTIDA!</Text>
                        </View>
                }
                {
                    // test
                    erros >= 3 && prefLimiteErros ?
                        null
                        : <Text style={[temaAtivo._colorTexto, componente._titulo_3]}>Tempo: {numToTime(tempoFinal)}</Text>
                }
                <Text style={[temaAtivo._colorTexto, componente._titulo_4, { marginVertical: 12 } ]}>Dificuldade: {dificuldadeSelecionada}</Text>
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
        marginBottom: 28,
    },
    imgContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        width: 300,
        gap: 32
    }
})