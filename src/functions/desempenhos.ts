import AsyncStorage from "@react-native-async-storage/async-storage"
import { Estatistica } from "../types/interfaces"

export const salvarDesempenho = async (chave: string, dados: Estatistica) => {
    const keys = await AsyncStorage.getAllKeys() // Obtém todas as chaves
    const items = await AsyncStorage.multiGet(keys) // Obtém todos os pares chave-valor
    //await AsyncStorage.removeItem('@criptex:desempenho-fácil')
    
    chave = chave ?? 'teste'
    
    try {
        const response = await AsyncStorage.getItem('@criptex:desempenho-' + chave.toLocaleLowerCase())

        if (!response) {
            await AsyncStorage.setItem('@criptex:desempenho-' + chave.toLocaleLowerCase(), JSON.stringify(dados))
        } else {
            const data: Estatistica = response ? JSON.parse(response) : null
            const novoDesemp: Estatistica = compararDesempenhos(data, dados)
            await AsyncStorage.setItem('@criptex:desempenho-' + chave.toLocaleLowerCase(), JSON.stringify(novoDesemp))
        }
    } catch (e) {
        console.log("Nenhum dado encontrado:", e)
        return null
    }
    
    console.log("Todos os itens do AsyncStorage:", items)
}

export const compararDesempenhos = (dadosSalvos: Estatistica, dadosNovos: Estatistica): Estatistica => {
    let novoArrayDesempenho: Estatistica = {
        tempo: dadosSalvos.tempo <= dadosNovos.tempo ? dadosSalvos.tempo : dadosNovos.tempo,
        pontuacao: dadosSalvos.pontuacao >= dadosNovos.pontuacao ? dadosSalvos.pontuacao : dadosNovos.pontuacao,
        qtd_partidas: dadosSalvos.qtd_partidas + 1,
    }
    
    return novoArrayDesempenho
}