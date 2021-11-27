'use strict'
import { Minesweeper } from "./class/Minesweeper";
const readline = require('readline')

const board = new Minesweeper();
let row;
let column;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const questRow = () => {
    return new Promise<string>((resolve, reject) => {
        rl.question('\nSelecione uma linha: ', (answer: string) => {
            resolve(answer)
        })
    })
}

const questColumn = () => {
    return new Promise<string>((resolve, reject) => {
        rl.question('\nBacana! Agora selecione uma coluna: ', (answer: string) => {
            resolve(answer)
        })
    })
}


const main = async () => {
    console.log("================================")
    console.log(
        "Para jogar o game é bem simples! \nBasta selecionar uma linha e uma coluna\n" +
        "Cada vez que você errar será marcado com o número 1 a casa que você tentou. Além de \n" +
        "receber uma dica que irá facilitar sua vida\n\n" +
        "VAMOS LAAAAAAAAAAAAAAAAA"
    )
    console.log("================================\n")

    board.printBoard();

    do {
        row = await questRow();
        column = await questColumn()
        board.checkTries(
            {
                row: parseInt(row),
                column: parseInt(column)
            }
        );
    } while (!board.gotIt);

    rl.close()
}

main()
