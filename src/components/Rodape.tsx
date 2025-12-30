import { Text, StyleSheet } from "react-native"
import { paletaCores, componente, temas } from "../styles/StylesGlobal"
import { useJogo } from "../context/JogoContext"

export default function Rodape() {
    const { prefTema } = useJogo()
    const temaAtiVo = prefTema ? temas.dark : temas.light

    return (
        <Text style={[componente._texto_3, temaAtiVo._colorTexto, styles.rodape]}>Desenvolvido por Douglas Moura | 2025</Text>
    )
}

const styles = StyleSheet.create({
    rodape: {
        zIndex: 80,
        position: 'absolute',
        bottom: 0,
        marginVertical: 18,
        width: '100%',
        textAlign: 'center'
    }
})