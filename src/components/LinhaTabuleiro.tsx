import { View, Text, StyleSheet, Animated } from "react-native"
import { componente, temas } from "../styles/StylesGlobal"
import { dividirPalavra } from "../functions/dividirPalavra"
import { Charada, LetraCharada } from "../types/interfaces"
import { useJogo } from "../context/JogoContext"
import { useRef, useEffect } from "react"
import { shake } from "../functions/animacoesEfeitos"
import BoxLetra from "./BoxLetra"

export default function Linhatabuleiro({ id, charada, letras, statusPartida }: { id: number, charada: Charada, letras: LetraCharada[], statusPartida: boolean }) {
    const { prefTema } = useJogo()
    const temaAtivo = prefTema ? temas.dark : temas.light
    const linhaEscada = useRef(new Animated.Value(1)).current

    useEffect(() => {
        if (statusPartida) {
            shake(linhaEscada, 1.05, (id + 1) * 100)
        }
    }, [statusPartida])

    return (
        <Animated.View style={[componente._sombraProjetada, temaAtivo._sombraColor, { marginVertical: 2, transform: [{ scale: linhaEscada }] } ]} key={id}>
            <View style={[temaAtivo._bgElemento, styles.tabuleiroLinha]}>
                <Text style={[temaAtivo._colorTexto, componente._texto_3, styles.linhaDica]}>{charada.dica}</Text>
                <View style={[styles.linhaLetras]}>
                    {dividirPalavra(charada.resposta).map((letra, index) => (
                        letras.map((l, indexL) => {
                            if (l.letra === letra) {
                                return <BoxLetra key={indexL} id={index} letra={l.letra} simb={l.simbolo} />
                            }
                        })
                    ))}
                </View>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    tabuleiroLinha: {
        height: 56,
        paddingHorizontal: 8,
        borderRadius: 8,
        //backgroundColor: 'orange',
        borderColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    linhaDica: {
        width: '30%',
        paddingLeft: 4
    },
    linhaLetras: {
        gap: 2,
        width: '60%',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
})