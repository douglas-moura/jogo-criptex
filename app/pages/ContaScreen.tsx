import { View, Text, StyleSheet, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Switch } from 'react-native-paper'
import { useState } from 'react'
import BotaoPadrao from "../../src/components/BotaoPadrao"

export default function ContaScreen() {
    const [checked, setChecked] = useState(false)

    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
            <ScrollView style={{ height: '100%' }}>
                <Text style={styles.titulo_1}>Minha Conta</Text>
                {/*<Text style={styles.titulo_3}>Olá, Nome</Text>*/}
                <View style={styles.container}>
                    <Text style={styles.titulo_2}>Preferências</Text>
                    <View style={styles.linhaContainer}>
                        <Text style={styles.texto_1}>Modo Escuro</Text>
                        <Switch value={checked} onValueChange={() => setChecked(!checked)} />
                    </View>
                    <View style={styles.linhaContainer}>
                        <Text style={styles.texto_1}>Auto Preechimento</Text>
                        <Switch value={checked} onValueChange={() => setChecked(!checked)} />
                    </View>
                    <View style={styles.linhaContainer}>
                        <Text style={styles.texto_1}>Limite de Erros</Text>
                        <Switch value={checked} onValueChange={() => setChecked(!checked)} />
                    </View>
                    <View style={styles.linhaContainer}>
                        <Text style={styles.texto_1}>Mostrar de Acertos/Erros</Text>
                        <Switch value={checked} onValueChange={() => setChecked(!checked)} />
                    </View>
                </View>
                <View style={styles.container}>
                    <Text style={styles.titulo_2}>Estatísticas</Text>
                    <View style={styles.containerEstatisticas}>
                        <Text style={styles.titulo_3}>Fácil</Text>
                        <View style={styles.linhaContainer}>
                            <View>
                                <Text style={styles.texto_2}>Partidas</Text>
                                <Text style={[styles.texto_1, { fontWeight: 900 }]}>99</Text>
                            </View>
                            <View>
                                <Text style={styles.texto_2}>Melhor Tempo</Text>
                                <Text style={[styles.texto_1, { fontWeight: 900 }]}>00:00</Text>
                            </View>
                            <View>
                                <Text style={styles.texto_2}>Melhor Pontuação</Text>
                                <Text style={[styles.texto_1, { fontWeight: 900 }]}>5.432</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.containerEstatisticas}>
                        <Text style={styles.titulo_3}>Médio</Text>
                        <View style={styles.linhaContainer}>
                            <View>
                                <Text style={styles.texto_2}>Partidas</Text>
                                <Text style={[styles.texto_1, { fontWeight: 900 }]}>99</Text>
                            </View>
                            <View>
                                <Text style={styles.texto_2}>Melhor Tempo</Text>
                                <Text style={[styles.texto_1, { fontWeight: 900 }]}>00:00</Text>
                            </View>
                            <View>
                                <Text style={styles.texto_2}>Melhor Pontuação</Text>
                                <Text style={[styles.texto_1, { fontWeight: 900 }]}>5.432</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.containerEstatisticas}>
                        <Text style={styles.titulo_3}>Difícil</Text>
                        <View style={styles.linhaContainer}>
                            <View>
                                <Text style={styles.texto_2}>Partidas</Text>
                                <Text style={[styles.texto_1, { fontWeight: 900 }]}>99</Text>
                            </View>
                            <View>
                                <Text style={styles.texto_2}>Melhor Tempo</Text>
                                <Text style={[styles.texto_1, { fontWeight: 900 }]}>00:00</Text>
                            </View>
                            <View>
                                <Text style={styles.texto_2}>Melhor Pontuação</Text>
                                <Text style={[styles.texto_1, { fontWeight: 900 }]}>5.432</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.container}>
                    <BotaoPadrao
                        texto="Excluir Dados"
                    />
                </View>
                <View style={{marginVertical: 20, alignItems: 'center'}}>
                    <Text style={[styles.texto_3, {color: '#bbb'}]}>Versão 1.0.00</Text>
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