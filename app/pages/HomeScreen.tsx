import { View, Text, Pressable } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import BotaoPadrao from "../../src/components/BotaoPadrao"
import { useJogo } from "../../src/context/JogoContext"


export default function HomeScreen() {
    const { start, resetarJogo } = useJogo()
    
    const iniciarNovaPartida = () => {
        resetarJogo()
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
                        destino="Partida"
                        type="primario"
                        onClick={iniciarNovaPartida}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}