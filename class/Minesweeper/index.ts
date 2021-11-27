interface minesweeperConfigurations {
    boardRowsLength: number;
    boardColumnsLength: number;
    mineQuantity: number;
}

interface position {
    row: number;
    column: number;
}

interface board {
    minesPositions: position[];
    positions: any[];
}

export class Minesweeper {
    boardConfiguration: minesweeperConfigurations;
    board: board;
    gotIt: boolean;
    

    constructor() {
        this.boardConfiguration = {
            boardRowsLength: 11,
            boardColumnsLength: 11,
            mineQuantity: 1
        }
        this.board = {
            minesPositions: [],
            positions: []
        };
        this.gotIt = false;
        this.init();
    }

    init() {
        this.generateEmptyBoard();
        this.generateMinePosition();
    }

    generateEmptyBoard(): void {
        for (let row = 0; row < this.boardConfiguration.boardRowsLength; row++) {
            this.board.positions.push([]);
            for (let column = 0; column < this.boardConfiguration.boardColumnsLength; column++) {
                this.board.positions[row][column] = 0;
            }
        }
    }

    generateMinePosition(): void {
        while(this.board.minesPositions.length < this.boardConfiguration.mineQuantity) {
            const row = this.getRandomInt(0, this.boardConfiguration.boardRowsLength);
            const column = this.getRandomInt(0, this.boardConfiguration.boardColumnsLength);
            
            this.board.minesPositions.push({row, column});
            // this.board.positions[1][3] = 'X';
        }
    }

    getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    printBoard(): void {
        for (let row = 0; row < this.boardConfiguration.boardRowsLength; row++) {
            let line = "";
            this.board.positions[row].forEach((pos: number) => {
                line = line + ` ${pos}`;
            });
            console.log(line);
        }
    }

    checkTries(position: position) {
        this.gotIt = this.board.minesPositions.find((element) => element.row === position.row && element.column === position.column) ? true : false;
        
        if (!this.gotIt) {
            console.log('\nPoxa, você errou! tente novamente\n');
            this.setTry(position);
            this.showHint(position);
            this.printBoard();
        } else {
            console.log('\nVocê é bom mesmo hein bixo!');
        }

    }

    setTry(position: position): void {
        this.board.positions[position.row][position.column] === 0 ? this.board.positions[position.row][position.column] = 1 : null;
    }

    showHint(position: position): void {
        let hint = ""

        if (position.row > this.board.minesPositions[0].row) {
            hint += "O monstro está mais para cima "
        } else if (position.row === this.board.minesPositions[0].row) {
            hint += "Hummm tem algo nessa linha "
        } else {
            hint += "O monstro está mais para baixo "
        }

        if (position.column > this.board.minesPositions[0].column) {
            hint += "a esquerda"
        } else if (position.column === this.board.minesPositions[0].column) {
            hint += "nesta coluna"
        } else {
            hint += "a direita"
        }
        console.log('Dica: ' + hint + '\n');
    }

}