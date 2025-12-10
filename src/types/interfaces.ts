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