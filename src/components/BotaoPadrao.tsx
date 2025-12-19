import { Text, Pressable, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from '@expo/vector-icons'
import { componente, paletaCores, temas } from "../styles/StylesGlobal"
import { useJogo } from "../context/JogoContext"
import { useEffect, useState } from "react"
import { Shadow } from 'react-native-shadow-2'

type IconName = keyof typeof Ionicons.glyphMap
type funcaoExtraBotao = () => void


export default function BotaoPadrao({ texto, destino, icone, type, onClick }: { texto: string; destino?: string; icone?: IconName, type?: string, onClick?: funcaoExtraBotao }): React.ReactElement {
    const { prefTema } = useJogo()
    const temaAtivo = prefTema ? temas.dark : temas.light
    const navigation = useNavigation<any>()

    const estiloBotao = (type: string) => {
        switch (type) {
            case 'primario':
                return componente._botao_primario
            case 'secundario':
                return componente._botao_secundario
            case 'alerta':
                return componente._botao_alerta
            default:
                return componente._botao_default
        }
    }

    if (destino == "Voltar") {
        return (
            <Pressable
                style={[styles.botao, styles.botaoSimples]}
                onPress={() => {
                    if (onClick) onClick()
                    navigation.goBack()
                }}
            >
                {icone ? <Ionicons style={[temaAtivo._colorTexto, styles.botaoIcone]} name={icone} /> : null }
                <Text style={[temaAtivo._colorTexto, componente._titulo_3]}>Voltar</Text>
            </Pressable>
        )
    } else {
        return (
            <Pressable
                style={[estiloBotao(type || 'default'), styles.botao, styles.botaoEstilizado, styles.card]}
                onPress={() => {
                    if (onClick) onClick()
                    setTimeout(() => navigation.navigate(destino as never), 500)
                }}
            >
                {icone ? <Ionicons style={[estiloBotao(type || 'default'), styles.botaoIcone]} name={icone} size={16} /> : null }
                <Text style={[ componente._botao_texto ]}>{texto}</Text>
            </Pressable>
        )
    }
}

const styles = StyleSheet.create({
    botaoSimples: {
        width: '100%',
    },
    botaoEstilizado: {
        marginHorizontal: 'auto',
        justifyContent: 'center',
    },
    botao: {
        borderRadius: 100,
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
    },
    botaoIcone: {
        fontSize: 24,
        fontWeight: 600,
        marginRight: 5,
    },
    card: {
        borderRadius: 100,
        overflow: 'hidden',

        // iOS
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,

        // Android
        elevation: 5,
    },
})