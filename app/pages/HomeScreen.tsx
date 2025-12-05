import { View, Text, Pressable } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import BotaoPadrao from "../../src/components/BotaoPadrao"

export default function HomeScreen() {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View>
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <Text style={{ fontSize: 72, fontWeight: '800' }}>CRIPTEX</Text>
                </View>
                <View style={{ width: 160, alignSelf: 'center' }}>
                    <BotaoPadrao
                        icone="play-outline"
                        texto="Jogar"
                        destino="Partida"
                        type="primario"
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}