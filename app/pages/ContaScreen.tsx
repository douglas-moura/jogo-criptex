import { View, Text, StyleSheet, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Switch } from 'react-native-paper'
import { useEffect, useState } from 'react'
import { Estatistica, Preferencias } from "../../src/types/interfaces"
import { buscarDadosDesempenho, excluirDesempenhos } from "../../src/functions/desempenhosFunctions"
import { dificuldades } from "../../db/desempenhos"
import { Usuario } from "../../src/types/classes"
import { buscarUserPrefs, atualizarPrefsUserStorage } from "../../src/functions/userPrefsFunctions"
import BotaoPadrao from "../../src/components/BotaoPadrao"
import EstatisticaContainer from "../../src/components/EstatisticaContainer"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function ContaScreen() {    
    const [checkTema, setCheckedTema] = useState<boolean>(true)
    const [checkPreenc, setCheckPreenc] = useState<boolean>(true)
    const [checkLimite, setCheckLimite] = useState<boolean>(true)
    const [checkAcertos, setCheckAcertos] = useState<boolean>(true)
    const [desempFacil, setDesempFacil] = useState<Estatistica | null>(null)
    const [desempMedio, setDesempMedio] = useState<Estatistica | null>(null)
    const [desempDificil, setDesempDificil] = useState<Estatistica | null>(null)

    const onClickExcluirDesempenhos = () => {        
        excluirDesempenhos('Fácil')
        setDesempFacil(null)
        
        excluirDesempenhos('Médio')
        setDesempMedio(null)
        
        excluirDesempenhos('Difícil')
        setDesempDificil(null)
    }
    
    // montar a tela com dados de preferências e desempenhos
    useEffect(() => {
        buscarUserPrefs('@criptex:usuario').then((data) => {
            if (data) {
                setCheckedTema(data.tema)
                setCheckPreenc(data.preenchimento)
                setCheckLimite(data.limite_erros)
                setCheckAcertos(data.mostrar_acertos)
            }
        })        
        buscarDadosDesempenho('Fácil').then((data) => setDesempFacil(data))
        buscarDadosDesempenho('Médio').then((data) => setDesempMedio(data))
        buscarDadosDesempenho('Difícil').then((data) => setDesempDificil(data))
    }, [])

    // atuliza o Storage e renderiza o layout sempre que há uma mudança nos valores de desmpenho ou preferências
    useEffect(() => {        
        atualizarPrefsUserStorage(checkTema, checkPreenc, checkLimite, checkAcertos)
    }, [
        desempFacil,
        desempMedio,
        desempDificil,
        checkTema,
        checkPreenc,
        checkLimite,
        checkAcertos
    ])

    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
            <ScrollView style={{ height: '120%' }} showsVerticalScrollIndicator={false} >
                <Text style={styles.titulo_1}>Minha Conta</Text>
                {/*<Text style={styles.titulo_3}>Olá, Nome</Text>*/}
                <View style={styles.container}>
                    <Text style={styles.titulo_2}>Preferências</Text>
                    <View style={styles.linhaContainer}>
                        <Text style={styles.texto_1}>Modo Escuro</Text>
                        <Switch value={checkTema} onValueChange={() => setCheckedTema(!checkTema)} />
                    </View>
                    <View style={styles.linhaContainer}>
                        <Text style={styles.texto_1}>Auto Preechimento</Text>
                        <Switch value={checkPreenc} onValueChange={() => setCheckPreenc(!checkPreenc)} />
                    </View>
                    <View style={styles.linhaContainer}>
                        <Text style={styles.texto_1}>Limite de Erros</Text>
                        <Switch value={checkLimite} onValueChange={() => setCheckLimite(!checkLimite)} />
                    </View>
                    <View style={styles.linhaContainer}>
                        <Text style={styles.texto_1}>Mostrar de Acertos/Erros</Text>
                        <Switch value={checkAcertos} onValueChange={() => setCheckAcertos(!checkAcertos)} />
                    </View>
                </View>
                <View style={styles.container}>
                    <Text style={styles.titulo_2}>Estatísticas</Text>
                    <EstatisticaContainer titulo='Fácil' data={desempFacil ?? null} />
                    <EstatisticaContainer titulo='Médio' data={desempMedio ?? null} />
                    <EstatisticaContainer titulo='Difícil' data={desempDificil ?? null} />
                </View>
                <View style={styles.container}>
                    <BotaoPadrao
                        texto="Excluir Dados"
                        destino="Minha Conta"
                        onClick={onClickExcluirDesempenhos}
                    />
                </View>
                <View style={{marginVertical: 20, alignItems: 'center'}}>
                    <Text style={[styles.texto_3, {color: '#bbb'}]}>Versão 1.0.0</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20
    },
    linhaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    containerEstatisticas: {
        marginVertical: 6,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 24,
        paddingVertical: 18,
        borderRadius: 16
    },
    iconeEstatistica: {
        marginBottom: 6
    },
    titulo_1: {
        fontSize: 32,
        fontWeight: 900,
        marginBottom: 16
    },
    titulo_2: {
        fontSize: 26,
        fontWeight: 900,
        marginBottom: 8,
    },
    titulo_3: {
        fontSize: 20,
        fontWeight: 800,
        marginBottom: 4,
    },
    texto_1: {
        fontSize: 16
    },
    texto_2: {
        fontSize: 12
    },
    texto_3: {
        fontSize: 10
    }
})