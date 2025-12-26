import { StyleSheet } from "react-native"

export const paletaCores = {
    _primario: '#F22942',
    _secundario: '#FE7210',
    _sucesso: '#7ed321',
    _alerta: '#f5a623',
    _erro: '#f1001cff',
    _erro_escuro: '#960011ff',
    _cinza_1: '#e8e8e8',
    _cinza_2: '#888',
    _cinza_3: '#3a3a3a',
    _preto: '#252525',
    _branco: '#fff'
}

export const componente = StyleSheet.create({
    _pagina: {
        flex: 1,
        justifyContent: 'flex-start',
        //alignItems: 'center'
        //paddingHorizontal: 30,
    },
    _conteudoCentral: {
        height: '100%',
        justifyContent: 'center',
    },
    _container: {
        marginHorizontal: 30
    },
    _titulo_1: {
        fontSize: 32,
        fontFamily: 'FredokaB'
    },
    _titulo_2: {
        fontSize: 26,
        fontFamily: 'FredokaB'
    },
    _titulo_3: {
        fontSize: 20,
        fontFamily: 'FredokaM'
    },
    _titulo_4: {
        fontSize: 18,
        fontFamily: 'FredokaM'
    },
    _texto_1: {
        fontSize: 16,
        fontFamily: 'FredokaR'
    },
    _texto_2: {
        fontSize: 12,
        fontFamily: 'FredokaR'
    },
    _texto_3: {
        fontSize: 10,
        fontFamily: 'FredokaR'
    },
    _texto_4: {
        fontSize: 8,
        fontFamily: 'FredokaR'
    },
    _botao_texto: {
        color: paletaCores._branco,
        fontFamily: 'FredokaM',
        fontSize: 18,
    },
    _botao_primario: {
        backgroundColor: paletaCores._primario,
        color: paletaCores._branco
    },
    _botao_secundario: {
        backgroundColor: paletaCores._secundario,
        color: paletaCores._branco
    },
    _botao_alerta: {
        backgroundColor: paletaCores._erro,
        color: paletaCores._branco,
    },
    _botao_default: {
        backgroundColor: paletaCores._cinza_3,
        color: paletaCores._preto
    },
})

export const temaClaro = {
    _bgPagina: {
        backgroundColor: paletaCores._branco,
    },
    _colorTexto: {
        color: paletaCores._cinza_3,
    },
    _borderColor: {
        borderColor: paletaCores._cinza_1,
    }
}

export const temaEscuro = {
    _bgPagina: {
        backgroundColor: paletaCores._preto,
    },
    _colorTexto: {
        color: paletaCores._cinza_1,
    },
    _borderColor: {
        borderColor: paletaCores._cinza_3,
    }
}

export const temas = {
    light: temaClaro,
    dark: temaEscuro
}