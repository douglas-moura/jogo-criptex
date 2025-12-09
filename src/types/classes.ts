import { dividirPalavra } from "../functions/dividirPalavra"
import { embaralharArray } from "../functions/embaralharArray"
import { Charada, LetraCharada } from "./interfaces"

export class Partida {
    private id: number
    private charadas: Charada[]
    private dificuldade: string = ''
    private letras: LetraCharada[] = []

    constructor(id: number, charadas: Charada[], dificuldade: string) {
        this.id = id
        this.charadas = embaralharArray(charadas).slice(0, 12)
        this.dificuldade = dificuldade
        this.gerarCharadasTabuleiro()
    }

    public getId(): number {
        return this.id
    }

    public setId(numId: number): void {
        this.id = numId
    }

    public getCharadas(): Charada[] {
        return this.charadas
    }

    public setCharadas(charadasArray: Charada[]): void {
        this.charadas = charadasArray
    }

    public getDificuldade(): string {
        return this.dificuldade
    }

    public setDificuldade(dificuldade: string): void {
        this.dificuldade = dificuldade
    }

    public getLetras(): LetraCharada[] {
        return this.letras
    }

    public setLetras(letrasArray: LetraCharada[]): void {
        this.letras = letrasArray
    }

    public gerarCharadasTabuleiro(): void {
        const charadas = this.getCharadas()
        const letrasArray: string[] = []
        
        charadas.map((item, index) => {
            letrasArray.push(...dividirPalavra(item.resposta))
        })

        const letrasArrayUnif = embaralharArray([...new Set(letrasArray)])

        letrasArrayUnif.map((letra, index) => {
            this.letras.push({
                letra: letra,
                simbolo: index + 1,
                acerto: false
            })
        })
    }

    public limparPartida(): void {
        this.letras = []
        this.charadas = []
    }
}