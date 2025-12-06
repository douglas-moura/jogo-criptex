import { dividirPalavra } from "../functions/dividirPalavra"
import { embaralharArray } from "../functions/embaralharArray"
import { Charada, LetraCharada } from "./interfaces"

export class Partida {
    private id: number
    private charadas: Charada[]
    private letras: LetraCharada[] = []

    constructor(id: number, charadas: Charada[]) {
        this.id = id
        this.charadas = charadas
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

        letrasArrayUnif.map((caract, index) => {
            this.letras.push({
                caracter: caract,
                simbolo: index + 1
            })
        })
    }
}