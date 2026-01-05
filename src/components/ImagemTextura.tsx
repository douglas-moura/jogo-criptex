import { Image } from "react-native"
import { useJogo } from "../context/JogoContext"

export default function ImagemTextura() {
    const { prefTema } = useJogo()
    return <Image source={require("../../assets/img/bg_textura.png")} style={{ position: 'absolute', opacity: prefTema ? 1 : .3, width: '100%', height: '100%', marginHorizontal: 'auto' }} />
}