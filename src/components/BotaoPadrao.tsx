import { View, Text, Pressable, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from '@expo/vector-icons'

type IconName = keyof typeof Ionicons.glyphMap

export default function BotaoPadrao({ texto, destino, icone, type }: { texto: string; destino: string; icone?: IconName, type?: string }): React.ReactElement {
    const navigation = useNavigation<any>()

    if (destino === "Voltar") {
        return (
            <Pressable onPress={() => navigation.goBack()} style={styles.botao}>
                <Ionicons style={styles.botaoIcone} name={icone ?? 'help-outline'} size={16} />
                <Text style={styles.botaoTexto}>Voltar</Text>
            </Pressable>
        )
    } else {
        return (
            <Pressable
                onPress={() => navigation.navigate(destino as never)}
                style={[styles.botao, type == 'primario' ? styles.botaoEstiloPrimario : styles.botaoEstiloSecundario]}
            >
                <Ionicons style={styles.botaoIcone} name={icone ?? 'help-outline'} />
                <Text style={styles.botaoTexto}>{texto}</Text>
            </Pressable>
        )
    }
}

const styles = StyleSheet.create({
    botao: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        margin: 5,
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
        backgroundColor: '#DDD',
    },
})