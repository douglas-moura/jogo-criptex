import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { Partida } from '../types/classes'

export type JogoContextType = {
    partida: Partida | null
    setPartida: (value: Partida | null) => void

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
}

export type JogoProviderProps = {
    children: ReactNode
}

// CRIAR O CONTEXT
const JogoContext = createContext<JogoContextType | null>(null)

// PROVIDER
export function JogoProvider({ children }: JogoProviderProps) {
    const [partida, setPartida] = useState<Partida | null>(null)
    const [start, setStart] = useState(false)
    const [pontos, setPontos] = useState(0)
    const [tempo, setTempo] = useState(0)
    const [acertos, setAcertos] = useState<string[]>([])

    useEffect(() => {
        setTimeout(() => {
            start ? setTempo(tempo + 1) : setTempo(0)
            console.log("acertos: ", acertos.length)
        }, 1000)
    }, [start, tempo, acertos])

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
        <JogoContext.Provider value={{ partida, setPartida, start, setStart, pontos, setPontos, tempo, setTempo, acertos, setAcertos, resetarJogo, encerrarPartida }}>
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