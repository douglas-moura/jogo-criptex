import { StyleSheet, View, FlatList } from "react-native"
import { useJogo } from "../context/JogoContext"
import { temas } from "../styles/StylesGlobal"
import BotaoPadrao from "./BotaoPadrao"

export default function MenuDificuldade() {
    const dificuldades: string[] = [ "Fácil", "Médio", "Difícil" ]
    const { resetarJogo, setDificuldadeSelecionada, prefTema } = useJogo()
    const temaAtivo = prefTema ? temas.dark : temas.light

    const iniciarPartida = (d: string) => {
        setDificuldadeSelecionada(d)
        resetarJogo()
    }
    
    return (
        <View style={[styles.listaContainer, temaAtivo._bgElemento]}>
            <FlatList
                style={{ width: '100%' }}
                data={dificuldades}
                renderItem={({ item }) => (
                    <View style={{ marginBottom: 8 }}>
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
        width: 300,
        height: 250,
        padding: 32,
        borderTopStartRadius: 32,
        borderTopEndRadius: 32,
    },
})