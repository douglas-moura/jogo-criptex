import { Charada } from "../types/interfaces"

export const selecionarCharadas = (arrayCharadas: Charada[], diff: string): Charada[] => {
    const novoArray: Charada[] = []
    let numeroLetras: number = 0

    switch (diff) {
        case 'Fácil':
            numeroLetras = 4
            break

        case 'Médio':
            numeroLetras = 6
            break
            
        case 'Difícil':
            numeroLetras = 8
            break
    }

    arrayCharadas.map((charada, index) => {
        if (charada.qtd_letras == numeroLetras) novoArray.push(charada)
    }) 
    return novoArray
}