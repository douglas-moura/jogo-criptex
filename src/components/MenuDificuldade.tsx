import { StyleSheet, View, Text, FlatList } from "react-native"
import BotaoPadrao from "./BotaoPadrao"
import { useJogo } from "../context/JogoContext"

export default function MenuDificuldade() {
    const dificuldades: string[] = [ "Fácil", "Médio", "Difícil" ]
    const { resetarJogo, setDificuldadeSelecionada } = useJogo()

    const iniciarPartida = (d: string) => {
        setDificuldadeSelecionada(d)
        resetarJogo()
    }
    
    return (
        <View style={styles.listaContainer}>
            <FlatList
                data={dificuldades}
                renderItem={({ item }) => (
                    <View style={{ width: '100%', alignSelf: 'center' }}>
                        <BotaoPadrao
                            texto={item}
                            destino="Partida"
                            onClick={() => iniciarPartida(item)}
                        />
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    listaContainer: {
        width: '100%',
        height: '40%',
        padding: 36,
        borderTopStartRadius: 32,
        borderTopEndRadius: 32,
        backgroundColor: '#fff'
    },
    listaTexto: {
        textAlign: 'center',
        fontSize: 24,
        borderBottomWidth: .75,
        borderColor: "#f7a01fff",
        paddingVertical: 16,
        color: "#333"
    }
})