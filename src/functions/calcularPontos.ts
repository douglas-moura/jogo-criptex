export const calcularPontos = (tempo: number, acertos: number, erros: number): number => {
    const pontosBase = acertos * 10
    const bonusTempo = Math.max(0, 100 - tempo)
    const penalidadeErros = erros * 5
    const totalPontos = pontosBase + bonusTempo - penalidadeErros
    return Math.max(0, totalPontos)
}