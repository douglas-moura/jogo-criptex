import { Preferencias } from "../types/interfaces"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const buscarUserPrefs = async (chave: string): Promise<Preferencias | null> => {
    try {
        const response = await AsyncStorage.getItem(chave)
        const data: Preferencias = response ? JSON.parse(response) : null
        //console.log('User achado', data)
        return data
    } catch (erro) {
        //console.log('Erro ao buscar dados usuário', erro)
        return null
    }
}

export const atualizarPrefsUserStorage = async (t: boolean, p: boolean, l: boolean, a: boolean): Promise<void> => {
    const novasPrefs: Preferencias = {
        tema: t,
        preenchimento: p,
        limite_erros: l,
        mostrar_acertos: a
    }
    
    await AsyncStorage.setItem('@criptex:usuario', JSON.stringify(novasPrefs))
    //console.log('User atualizado: ', await AsyncStorage.getItem('@criptex:usuario'))
}