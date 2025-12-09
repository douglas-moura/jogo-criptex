import { View, Text, StyleSheet, Pressable } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import BotaoPadrao from "../../src/components/BotaoPadrao"
import { useJogo } from "../../src/context/JogoContext"
import MenuDificuldade from "../../src/components/MenuDificuldade"
import { useState } from "react"


export default function HomeScreen() {
    const { start, resetarJogo } = useJogo()
    const [ diff, setDiff ] = useState<boolean>(false)
    
    const iniciarNovaPartida = () => {
        setDiff(true)
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View>
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <Text style={{ fontSize: 72, fontWeight: '800' }}>CRIPTEX</Text>
                </View>
                <View style={{ width: 160, alignSelf: 'center' }}>
                    <BotaoPadrao
                        icone="play-outline"
                        texto="Iniciar"
                        destino="Home"
                        type="primario"
                        onClick={iniciarNovaPartida}
                    />
                </View>
            </View>
            <Pressable onPress={() => setDiff(false)} style={[styles.menuDificuldadeContainer, { display: diff && !start ? 'flex' : 'none' } ]}>
                <MenuDificuldade />
            </Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    menuDificuldadeContainer: {
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