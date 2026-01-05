import { View, Text, StyleSheet, Pressable, Animated, Image } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState, useCallback, useRef } from "react"
import { temas, componente } from "../../src/styles/StylesGlobal"
import { useFocusEffect } from "@react-navigation/native"
import { useJogo } from "../../src/context/JogoContext"
import { Usuario } from "../../src/types/classes"
import { linear } from "../../src/functions/animacoesEfeitos"
import MenuDificuldade from "../../src/components/MenuDificuldade"
import BotaoPadrao from "../../src/components/BotaoPadrao"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Rodape from "../../src/components/Rodape"
import ImagemTextura from "../../src/components/ImagemTextura"

export default function HomeScreen() {
    const { start, setStart, prefTema } = useJogo()
    const [ diff, setDiff ] = useState<boolean>(false)
    const temaAtivo = prefTema ? temas.dark : temas.light
    const logoOpacity = useRef(new Animated.Value(0)).current
    const logoPosition = useRef(new Animated.Value(-10)).current
    const menuPeliculaOpacity = useRef(new Animated.Value(0)).current
    const menuPosition = useRef(new Animated.Value(250)).current

    const abrirMenu = () => {
        setDiff(true)
        linear(menuPeliculaOpacity, 1, 300)
        linear(menuPosition, 1, 800)
    }

    const fecharMenu = () => {
        linear(menuPosition, 250, 300)
        linear(menuPeliculaOpacity, 0, 800)
        setTimeout(() => setDiff(false), 1200)
    }
    
    const salvarUsuario = async (u: Usuario): Promise<void> => {
        const checkUser = await AsyncStorage.getItem('@criptex:usuario')
        if (!checkUser) await AsyncStorage.setItem('@criptex:usuario', JSON.stringify(u.getPrefs()))
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

    useEffect(() => {
        // fade-in do logo
        linear(logoOpacity, 1, 400)
        linear(logoPosition, 1, 400)
    }, [])

    return (
        <SafeAreaView style={[ temaAtivo._bgPagina, componente._pagina, { paddingHorizontal: 0 } ]}>
            <ImagemTextura />
            <View style={componente._conteudoCentral}>
                <View>
                    <Animated.View
                        style={{
                            alignItems: 'center',
                            marginBottom: 20,
                            opacity: logoOpacity,
                            transform: [{
                                translateY: logoPosition
                            }]
                        }}>
                        <Text style={[temaAtivo._colorTexto, {fontSize: 62, fontFamily: 'Audiowide'} ]}>CRIPTEX</Text>
                    </Animated.View>
                    <View style={{ width: 160, alignSelf: 'center' }}>
                        <BotaoPadrao
                            icone="play"
                            texto="Iniciar"
                            destino="Início"
                            type="primario"
                            onClick={abrirMenu}
                        />
                    </View>
                </View>
                <View style={[ styles.menuDificuldadeContainer, { display: diff && !start ? 'flex' : 'none' } ]}>
                    <Animated.View style={{ opacity: menuPeliculaOpacity }}>
                        <Pressable onPress={() => fecharMenu()} style={[styles.pelicula, temaAtivo._bgPagina]}>
                            <Animated.View style={{ transform: [{ translateY: menuPosition }] }}>
                                <MenuDificuldade />
                            </Animated.View>
                        </Pressable>
                    </Animated.View>
                </View>
            </View>
            <Rodape />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    menuDificuldadeContainer: {
        height: '100%',
        width: '100%', 
        position: 'absolute',
        zIndex: 90,
    },
    pelicula: {
        height: '100%',
        width: '100%',
        opacity: .8,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
})