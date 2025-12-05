import { View, Text } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import BotaoPadrao from "../../src/components/BotaoPadrao"
import TabuleiroPartida from "../../src/components/TabuleiroPartida"

export default function PartidaScreen() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ width: '30%', borderWidth: 1, borderColor: 'blue' }}>
                <BotaoPadrao
                    icone="arrow-back-outline"
                    texto="Voltar"
                    destino="Voltar"
                />
            </View>
            <View style={{ flex: 1, paddingVertical: 20, alignItems: 'center' }}>
                <TabuleiroPartida />
            </View>
        </SafeAreaView>
    )
}