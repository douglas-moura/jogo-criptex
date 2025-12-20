import { Text, StyleSheet } from "react-native"
import { paletaCores, componente } from "../styles/StylesGlobal"

export default function Rodape() {
    return (
        <Text style={[componente._texto_3, styles.rodape]}>Desenvolvido por Douglas Moura | 2025</Text>
    )
}

const styles = StyleSheet.create({
    rodape: {
        zIndex: 80,
        color: paletaCores._cinza_2,
        position: 'absolute',
        bottom: 0,
        marginVertical: 18,
        width: '100%',
        textAlign: 'center'
    }
})