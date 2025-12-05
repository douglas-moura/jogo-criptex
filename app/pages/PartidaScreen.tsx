import { View, Text } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import BotaoPadrao from "../../src/components/BotaoPadrao"

export default function PartidaScreen() {
    return (
        <SafeAreaView>
            <View style={{ width: '30%' }}>
                <BotaoPadrao
                    icone="arrow-back-outline"
                    texto="Voltar"
                    destino="Voltar"
                />
            </View>
            <Text>Partida Screen</Text>
        </SafeAreaView>
    )
}