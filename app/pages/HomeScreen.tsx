import { View, Text, StyleSheet, Pressable } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { useJogo } from "../../src/context/JogoContext"
import { useEffect, useState, useCallback } from "react"
import { Usuario } from "../../src/types/classes"
import { temas, componente } from "../../src/styles/StylesGlobal"
import { useFocusEffect } from "@react-navigation/native"
import MenuDificuldade from "../../src/components/MenuDificuldade"
import BotaoPadrao from "../../src/components/BotaoPadrao"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Rodape from "../../src/components/Rodape"

export default function HomeScreen() {
    const { start, setStart, prefTema } = useJogo()
    const [ diff, setDiff ] = useState<boolean>(false)
    const temaAtivo = prefTema ? temas.dark : temas.light
    
    const iniciarNovaPartida = () => {
        setDiff(true)
    }
    
    const salvarUsuario = async (u: Usuario): Promise<void> => {
        const checkUser = await AsyncStorage.getItem('@criptex:usuario')

        if (!checkUser) {
            await AsyncStorage.setItem('@criptex:usuario', JSON.stringify(u.getPrefs()))
            //console.log('User Salvo: ', await AsyncStorage.getItem('@criptex:usuario'))
        }

        //console.log('User Já Presente: ', await AsyncStorage.getItem('@criptex:usuario'))
    }

    useEffect(() => {
        const p = new Usuario(new Date().getTime())
        salvarUsuario(p)
    }, [salvarUsuario])

    useFocusEffect(
        useCallback(() => {
            setDiff(false)
            setStart(false)
        }, [])
    )

    return (
        <SafeAreaView style={[ temaAtivo._bgPagina, componente._pagina, { paddingHorizontal: 0 } ]}>
            <View style={componente._conteudoCentral}>
                <View>
                    <View style={{ alignItems: 'center', marginBottom: 20 }}>
                        <Text style={[temaAtivo._colorTexto, { fontSize: 72, fontWeight: '800' }]}>CRIPTEX</Text>
                    </View>
                    <View style={{ width: 160, alignSelf: 'center' }}>
                        <BotaoPadrao
                            icone="play"
                            texto="Iniciar"
                            destino="Início"
                            type="primario"
                            onClick={iniciarNovaPartida}
                        />
                    </View>
                </View>
                <Pressable onPress={() => setDiff(false)} style={[styles.menuDificuldadeContainer, { display: diff && !start ? 'flex' : 'none' } ]}>
                    <MenuDificuldade />
                </Pressable>
            </View>
            <Rodape />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    menuDificuldadeContainer: {
        zIndex: 90,
        position: 'absolute',
        padding: 24,
        width: '100%',
        height: '120%',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: '#161616cc'
    }
})