import { StyleSheet } from "react-native"

export const componente = StyleSheet.create({
    _titulo_1: {
        fontSize: 32,
        fontWeight: 900,
    },
    _titulo_2: {
        fontSize: 26,
        fontWeight: 900,
    },
    _titulo_3: {
        fontSize: 20,
        fontWeight: 800,
    },
    _texto_1: {
        fontSize: 16
    },
    _texto_2: {
        fontSize: 12
    },
    _texto_3: {
        fontSize: 10
    }
})

export const temaClaro = {
    backgroundColor: '#ccc',
}

export const temaEscuro = {
    backgroundColor: '#252525',
}

export const temas = {
    light: temaClaro,
    dark: temaEscuro
}