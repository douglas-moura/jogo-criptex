import { StatusBar } from 'expo-status-bar'
import { useJogo } from '../context/JogoContext'
import { paletaCores, temas } from '../styles/StylesGlobal'

export default function StatusBarComponente() {
    const { prefTema } = useJogo()
    const temaAtivo = prefTema ? temas.dark : temas.light

    return (
        <StatusBar
            style={prefTema ? 'light' : 'dark'}
            backgroundColor={paletaCores._primario}
        />
    )
}