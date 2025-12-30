import { dividirPalavra } from "../functions/dividirPalavra"
import { embaralharArray } from "../functions/embaralharArray"
import { Charada, LetraCharada, Preferencias } from "./interfaces"

export class Partida {
    private id: number
    private charadas: Charada[]
    private dificuldade: string = ''
    private letras: LetraCharada[] = []
    private qts_charadas: number = 10
    private vitoria: boolean = false

    constructor(id: number, charadas: Charada[], dificuldade: string) {
        this.id = id
        this.charadas = embaralharArray(charadas).slice(0, this.qts_charadas)
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

    public setQtsCharadas(qtd: number): void {
        this.qts_charadas = qtd
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

    public getQtsCharadas(): number {
        return this.qts_charadas
    }

    public setCharadas(charadasArray: Charada[]): void {
        this.charadas = charadasArray
    }

    public getVitoria(): boolean {
        return this.vitoria
    }

    public setVitoria(vit: boolean): void {
        this.vitoria = vit
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

export class Usuario {
    private id: number
    private prefs: Preferencias = {
        tema: true,
        preenchimento: false,
        limite_erros: true,
        mostrar_acertos: false,
    }

    public constructor(id: number) {
        this.id = id
    }

    public getId(): number {
        return this.id
    }

    public setId(i: number): void {
        this.id = i
    }

    public getPrefs(): Preferencias {
        return this.prefs
    }

    public setPrefs(p: Preferencias): void {
        this.prefs = p
    }
}