import { View, Text, StyleSheet, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect, useState } from 'react'
import { Estatistica } from "../../src/types/interfaces"
import { buscarDadosDesempenho, excluirDesempenhos } from "../../src/functions/desempenhosFunctions"
import { atualizarPrefsUserStorage } from "../../src/functions/userPrefsFunctions"
import { useJogo } from "../../src/context/JogoContext"
import { temas, componente } from "../../src/styles/StylesGlobal"
import { Switch } from 'react-native-paper'
import BotaoPadrao from "../../src/components/BotaoPadrao"
import EstatisticaContainer from "../../src/components/EstatisticaContainer"

export default function ContaScreen() {    
    const { prefTema, setPrefTema, prefAutoPreen, setPrefAutoPreen, prefLimiteErros, setPrefLimiteErros, prefExibirAcertos, setPrefExibirAcertos } = useJogo()
    const [ desempFacil, setDesempFacil ] = useState<Estatistica | null>(null)
    const [ desempMedio, setDesempMedio ] = useState<Estatistica | null>(null)
    const [ desempDificil, setDesempDificil ] = useState<Estatistica | null>(null)
    const [ temaAtivo, setTemaAtivo ] = useState(temas.light)

    const onClickExcluirDesempenhos = () => {        
        excluirDesempenhos('Fácil')
        setDesempFacil(null)
        
        excluirDesempenhos('Médio')
        setDesempMedio(null)
        
        excluirDesempenhos('Difícil')
        setDesempDificil(null)
    }
    
    // montar a tela com dados de desempenhos
    useEffect(() => {      
        buscarDadosDesempenho('Fácil').then((data) => setDesempFacil(data))
        buscarDadosDesempenho('Médio').then((data) => setDesempMedio(data))
        buscarDadosDesempenho('Difícil').then((data) => setDesempDificil(data))
    }, [])

    // atuliza o Storage e renderiza o layout sempre que há uma mudança nos valores de desempenho ou preferências
    useEffect(() => {
        //if (!prefExibirAcertos) setPrefAutoPreen(false)    
        atualizarPrefsUserStorage(prefTema, prefAutoPreen, prefLimiteErros, prefExibirAcertos)
    }, [desempFacil, desempMedio, desempDificil, prefTema, prefAutoPreen, prefLimiteErros, prefExibirAcertos])

    useEffect(() => {
        setTemaAtivo(prefTema ? temas.dark : temas.light)
    }, [prefTema])

    return (
        <SafeAreaView style={[ temaAtivo._bgPagina, componente._pagina ]}>
            <ScrollView style={{ height: '100%', paddingTop: 40, flexGrow: 1 }} showsVerticalScrollIndicator={false} >
                <Text style={[temaAtivo._colorTexto, componente._titulo_1]}>Minha Conta</Text>
                {/*<Text style={styles.titulo_3}>Olá, Nome</Text>*/}
                <View style={styles.container}>
                    <Text style={[temaAtivo._colorTexto, componente._titulo_3]}>Preferências</Text>
                    <View style={styles.linhaContainer}>
                        <Text style={temaAtivo._colorTexto}>Modo Escuro</Text>
                        <Switch value={prefTema} onValueChange={() => setPrefTema(!prefTema)} />
                    </View>
                    <View style={styles.linhaContainer}>
                        <Text style={temaAtivo._colorTexto}>Auto Preechimento</Text>
                        <Switch value={prefAutoPreen} onValueChange={() => setPrefAutoPreen(!prefAutoPreen)} />
                    </View>
                    <View style={styles.linhaContainer}>
                        <Text style={temaAtivo._colorTexto}>Limite de Erros</Text>
                        <Switch value={prefLimiteErros} onValueChange={() => setPrefLimiteErros(!prefLimiteErros)} />
                    </View>
                    <View style={styles.linhaContainer}>
                        <Text style={temaAtivo._colorTexto}>Exibir Acertos/Erros</Text>
                        <Switch value={prefExibirAcertos} onValueChange={() => setPrefExibirAcertos(!prefExibirAcertos)} />
                    </View>
                </View>
                <View style={styles.container}>
                    <Text style={[temaAtivo._colorTexto, componente._titulo_3]}>Estatísticas</Text>
                    <EstatisticaContainer titulo='Fácil' data={desempFacil ?? null} />
                    <EstatisticaContainer titulo='Médio' data={desempMedio ?? null} />
                    <EstatisticaContainer titulo='Difícil' data={desempDificil ?? null} />
                </View>
                <View style={[styles.container, { alignItems: 'center' }]}>
                    <BotaoPadrao
                        texto="Excluir Dados"
                        destino="Minha Conta"
                        type="alerta"
                        onClick={onClickExcluirDesempenhos}
                    />
                    <View style={{marginTop: 20, marginBottom: 50, alignItems: 'center'}}>
                        <Text style={[componente._texto_3, {color: '#bbb'}]}>Versão 1.0.0</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
    },
    linhaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    containerEstatisticas: {
        marginVertical: 6,
        borderWidth: 1,
        paddingHorizontal: 24,
        paddingVertical: 18,
        borderRadius: 16
    },
    iconeEstatistica: {
        marginBottom: 6
    }
})