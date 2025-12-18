export interface Charada {
    id: number;
    dica: string;
    qtd_letras: number;
    resposta: string;
    letras?: LetraCharada[];
    caract?: number;
}

export interface LetraCharada {
    letra: string;
    simbolo: number;
    acerto: boolean;
}

export interface Estatistica {
    qtd_partidas: number;
    tempo: number;
    pontuacao: number;
}

export interface Preferencias {
    tema: boolean;
    preenchimento: boolean;
    limite_erros: boolean;
    mostrar_acertos: boolean;
}

export interface AcertosPartida {
    qtd_acertos: number,
    letrasAcertadas: string[];
}

export interface TentativaPartida {
    letraErrada: string;
    simbolo: number;
}