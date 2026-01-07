import { Image, StyleSheet } from "react-native"
import { useJogo } from "../context/JogoContext"

export default function ImagemTextura() {
    const { prefTema } = useJogo()

    if (prefTema) {
        return <Image
            source={require("../../assets/img/bg_textura-dark.png")}
            style={[styles.imgStyle, { opacity: .4 }]}
        />
    } else {
        return <Image
            source={require("../../assets/img/bg_textura-dark.png")}
            style={[styles.imgStyle, { opacity: 1 }]}
        />
    }
}

const styles = StyleSheet.create({
    imgStyle: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        marginHorizontal: 'auto'
    }
})