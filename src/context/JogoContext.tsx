import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { buscarUserPrefs } from '../functions/userPrefsFunctions'
import { Partida } from '../types/classes'

export type JogoContextType = {
    partida: Partida | null
    setPartida: (value: Partida | null) => void

    dificuldadeSelecionada: string
    setDificuldadeSelecionada: (value: string) => void

    start: boolean
    setStart: (value: boolean) => void

    pontos: number
    setPontos: (value: number) => void

    tempo: number
    setTempo: (value: number) => void

    acertos: string[]
    setAcertos: React.Dispatch<React.SetStateAction<string[]>>

    resetarJogo: () => void

    encerrarPartida: () => void

    prefTema: boolean
    setPrefTema: (value: boolean) => void

    prefAutoPreen: boolean
    setPrefAutoPreen: (value: boolean) => void

    prefLimiteErros: boolean
    setPrefLimiteErros: (value: boolean) => void

    prefExibirAcertos: boolean
    setPrefExibirAcertos: (value: boolean) => void
}

export type JogoProviderProps = {
    children: ReactNode
}

// CRIAR O CONTEXT
const JogoContext = createContext<JogoContextType | null>(null)

// PROVIDER
export function JogoProvider({ children }: JogoProviderProps) {
    const [partida, setPartida] = useState<Partida | null>(null)
    const [dificuldadeSelecionada, setDificuldadeSelecionada] = useState<string>('')
    const [start, setStart] = useState<boolean>(false)
    const [pontos, setPontos] = useState<number>(0)
    const [tempo, setTempo] = useState<number>(0)
    const [acertos, setAcertos] = useState<string[]>([])
    const [prefTema, setPrefTema] = useState<boolean>(false)
    const [prefAutoPreen, setPrefAutoPreen] = useState<boolean>(true)
    const [prefLimiteErros, setPrefLimiteErros] = useState<boolean>(true)
    const [prefExibirAcertos, setPrefExibirAcertos] = useState<boolean>(true)

    useEffect(() => {
        setTimeout(() => {
            start ? setTempo(tempo + 1) : setTempo(0)
        }, 1000)
        console.log(acertos.length);
        
    }, [start, tempo, acertos])

    useEffect(() => {
        buscarUserPrefs('@criptex:usuario').then((data) => {
            if (data) {
                setPrefTema(data.tema)
                setPrefAutoPreen(data.preenchimento)
                setPrefLimiteErros(data.limite_erros)
                setPrefExibirAcertos(data.mostrar_acertos)
            }
        })
    }, [])

    const resetarJogo = () => {
        if (start) {
            setStart(false)
            setPontos(0)
            setTempo(0)
            setAcertos([])
        }
    }

    const encerrarPartida = () => {
        setStart(false)
        setPontos(0)
        setTempo(tempo)
        setAcertos([])
    }

    return (
        <JogoContext.Provider value={{
            partida, setPartida,
            dificuldadeSelecionada,
            setDificuldadeSelecionada,
            start, setStart,
            pontos, setPontos,
            tempo, setTempo,
            acertos, setAcertos,
            resetarJogo, encerrarPartida,
            prefTema, setPrefTema,
            prefAutoPreen, setPrefAutoPreen,
            prefLimiteErros, setPrefLimiteErros,
            prefExibirAcertos, setPrefExibirAcertos
        }}>
            {children}
        </JogoContext.Provider>
    )
}

// CRIAR O HOOK
export function useJogo() {
    const context = useContext(JogoContext)

    if (!context) throw new Error('useJogo deve ser usado dentro de JogoProvider')

    return context
}