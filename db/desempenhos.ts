import AsyncStorage from "@react-native-async-storage/async-storage"
import { Estatistica } from "../src/types/interfaces"

export const quantidadePartidas = async (chave: string): Promise<number> => {
    let qtd: number = 1
    const response = await AsyncStorage.getItem('@desempenho:' + chave.toLocaleLowerCase())
    const data: Estatistica = response ? JSON.parse(response) : null
    if (response) qtd = data.qtd_partidas
    console.log('qtd', qtd)
    
    return qtd
}