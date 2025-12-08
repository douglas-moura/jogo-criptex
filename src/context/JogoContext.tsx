import { createContext, useContext, useState, ReactNode } from 'react'
import { LetraCharada } from '../types/interfaces'
import { useEffect } from 'react'

export type JogoContextType = {
    start: boolean
    setStart: (value: boolean) => void

    pontos: number
    setPontos: (value: number) => void

    tempo: number
    setTempo: (value: number) => void

    acertos: string[]
    setAcertos: React.Dispatch<React.SetStateAction<string[]>>
}

export type JogoProviderProps = {
    children: ReactNode
}

// CRIAR O CONTEXT
const JogoContext = createContext<JogoContextType | null>(null)

// PROVIDER
export function JogoProvider({ children }: JogoProviderProps) {
    const [start, setStart] = useState(false)
    const [pontos, setPontos] = useState(0)
    const [tempo, setTempo] = useState(0)
    const [acertos, setAcertos] = useState<string[]>([])

    setTimeout(() => {
        if (start) setTempo(tempo + 1)
    }, 1000)

    return (
        <JogoContext.Provider value={{ start, setStart, pontos, setPontos, tempo, setTempo, acertos, setAcertos }}>
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