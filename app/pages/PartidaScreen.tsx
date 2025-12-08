import { View, Text } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { useJogo } from "../../src/context/JogoContext"
import { useEffect } from "react"
import BotaoPadrao from "../../src/components/BotaoPadrao"
import TabuleiroPartida from "../../src/components/TabuleiroPartida"
import numToTime from "../../src/functions/numToTime"

export default function PartidaScreen() {
    const { start, setStart, tempo } = useJogo()

    useEffect(() => {
        setStart(true)
    }, [start])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ width: '30%', borderWidth: 1, borderColor: 'blue' }}>
                <BotaoPadrao
                    icone="arrow-back-outline"
                    texto="Voltar"
                    destino="Voltar"
                />
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text>Tempo: {numToTime(tempo)}</Text>
            </View>
            <View style={{ flex: 1, paddingVertical: 20, alignItems: 'center' }}>
                <TabuleiroPartida />
            </View>
        </SafeAreaView>
    )
}