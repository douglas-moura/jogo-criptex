import { Text, Pressable, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from '@expo/vector-icons'

type IconName = keyof typeof Ionicons.glyphMap
type funcaoExtraBotao = () => void

export default function BotaoPadrao({ texto, destino, icone, type, onClick }: { texto: string; destino?: string; icone?: IconName, type?: string, onClick?: funcaoExtraBotao }): React.ReactElement {
    const navigation = useNavigation<any>()

    if (destino == "Voltar") {
        return (
            <Pressable onPress={() => {
                if (onClick) onClick()
                navigation.goBack()
            }} style={styles.botao}>
                {icone ? <Ionicons style={styles.botaoIcone} name={icone} size={16} /> : null }
                <Text style={styles.botaoTexto}>Voltar</Text>
            </Pressable>
        )
    } else {
        return (
            <Pressable
                onPress={() => {
                    if (onClick) onClick()
                    setTimeout(() => navigation.navigate(destino as never), 500)
                }}
                style={[styles.botao, type == 'primario' ? styles.botaoEstiloPrimario : styles.botaoEstiloSecundario]}
            >
                {icone ? <Ionicons style={styles.botaoIcone} name={icone} size={16} /> : null }
                <Text style={styles.botaoTexto}>{texto}</Text>
            </Pressable>
        )
    }
}

const styles = StyleSheet.create({
    botao: {
        flexDirection: 'row',
        padding: 10,
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        width: 'auto',
        boxSizing: 'border-box',
    },
    botaoTexto: {
        //marginLeft: 5,
        fontSize: 18,
        fontWeight: 600,
    },
    botaoIcone: {
        fontSize: 18,
        fontWeight: 600,
        marginRight: 5,
    },
    botaoEstiloPrimario: {
        backgroundColor: '#fca33eff',
    },
    botaoEstiloSecundario: {
        backgroundColor: '#f0f0f0ff',
    },
    botaoEstiloDefault: {
        backgroundColor: 'none'
    }
})