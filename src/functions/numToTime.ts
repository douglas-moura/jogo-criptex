export default function numToTime(t: number): string {
    // código para converter numero em formato de tempo
    // código de terceiros

    let s: number = t % 60
    let m: number = t / 60 >= 1 ? Math.floor(t / 60) : 0

    let segundos: string = s < 10 ? "0" + s.toString() : s.toString()
    let minutos: string = m < 10 ? "0" + m.toString() : m.toString()
  
    return minutos + ":" + segundos
}