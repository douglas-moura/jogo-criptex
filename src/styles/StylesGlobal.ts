import { StyleSheet } from "react-native"
import { Color } from "react-native/types_generated/Libraries/Animated/AnimatedExports"

export const paletaCores = {
    _primario: '#ED5761',
    _secundario: '#404B62',
    _sucesso: '#7ed321',
    _alerta: '#f5a623',
    _erro: '#f1001cff',
    _erro_escuro: '#960011ff',
    _cinza_1: '#F5F6F8',
    _cinza_2: '#e6e8ee',
    _cinza_3: '#c7cdda',
    //_cinza_4: '#546391', Use a _secundario no lugar deste
    _cinza_5: '#2c3343',
    _cinza_6: '#181c24',
    _preto: '#161515',
    _branco: '#fff'
}

export const temaClaro = {
    _bgPagina: {
        backgroundColor: paletaCores._cinza_1,
    },
    _bgElemento: {
        backgroundColor: paletaCores._cinza_2,
    },
    _sombraColor: {
        backgroundColor: paletaCores._cinza_3,
    },
    _borderColor: {
        borderColor: paletaCores._cinza_3,
    },
    _colorTexto: {
        color: paletaCores._preto,
    },
    _colorTextoDestaque: {
        color: paletaCores._primario,
    }
}

export const temaEscuro = {
    _bgPagina: {
        backgroundColor: paletaCores._cinza_6,
    },
    _bgElemento: {
        backgroundColor: paletaCores._secundario,
    },
    _sombraColor: {
        backgroundColor: paletaCores._cinza_5,
    },
    _borderColor: {
        borderColor: paletaCores._cinza_5,
    },
    _colorTexto: {
        color: paletaCores._branco,
    },
    _colorTextoDestaque: {
        color: paletaCores._primario,
    }
}

export const temas = {
    light: temaClaro,
    dark: temaEscuro
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
        marginHorizontal: 'auto',
        width: '85%'
    },
    _linha: {
        flexDirection: 'row',
        alignItems: 'center'
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
        color: paletaCores._cinza_1
    },
    _botao_secundario: {
        backgroundColor: paletaCores._secundario,
        color: paletaCores._cinza_1
    },
    _botao_alerta: {
        backgroundColor: paletaCores._erro,
        color: paletaCores._branco,
    },
    _botao_default: {
        backgroundColor: paletaCores._cinza_5,
        color: paletaCores._cinza_3
    },
    _sombraProjetada: {
        paddingBottom: 4,
        borderRadius: 8,
        overflow: 'hidden',
        marginHorizontal: 'auto',
    }
})