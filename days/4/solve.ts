import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';
import * as lodash from 'lodash'
const LINE_SEPARATOR = '\n';
const LENGTH = 5;
interface Board {
	lines: number[][];
	// matches: boolean[][];
}



const createBoards = (lines: string[]) => {
	let boards: Board[] = [];
	let cnt = 0;
	let matrixBuff: number[][] = [];
	for (let index = 0; index < lines.length; index++) {
		const line = lines[index];
		if (cnt == LENGTH) {
			boards.push(<Board>{ "lines": [].concat(matrixBuff).concat(lodash.zip(...matrixBuff)), "boardComplete": false })
			// boards[boards.length-1].matches = Array(LENGTH+LENGTH).fill(Array(LENGTH).fill(false));
			matrixBuff = [];
			cnt = 0;
		}
		matrixBuff.push(line.split(' ').map((v => Number(v))))
		cnt++;


	}
	if (cnt === LENGTH) {
		boards.push(<Board>{ "lines": [].concat(matrixBuff), "boardComplete": false })
	}
	return boards;

}

const initNumbers = (s: string): number[] => {
	return s.split(',').filter(s => { return s.length > 0 }).map(n => Number(n));
}

const isBoardCompleted = (lines: number[][]): boolean => {
	return lines.some((line) => {
		return line.every((lineV) => lineV === null)
	})
}

export const solvePt2 = (_arr: any[]): any => {

	let arr = [..._arr] as string[];
	const numbers = lodash.flattenDeep(initNumbers(arr[0]));

	arr.shift();
	console.log(arr);

	let playersBoard = createBoards(arr);
	let pushedBoards = [];
	let winnerBoard: { boardID: number, retVal: number } = null;
	console.log(JSON.stringify(playersBoard));

	numbers.forEach(number => {
		playersBoard.forEach((playerBoard, boardIndex) => {
			if (pushedBoards.includes(boardIndex))
				return;
			playerBoard.lines.forEach((line, lineIndex) => {
				let findNumber = line.findIndex((lineV) => lineV === number);
				if (findNumber > -1) {
					line[findNumber] = null;
				}
				if (isBoardCompleted(playerBoard.lines)) {
					let sumOfUnmarked = lodash.flattenDeep([playerBoard.lines[0], playerBoard.lines[1], playerBoard.lines[2], playerBoard.lines[3], playerBoard.lines[4]])
					sumOfUnmarked = lodash.sum(sumOfUnmarked);
					if ((sumOfUnmarked * number) > 0) {
						pushedBoards.push(boardIndex);
						winnerBoard = { "boardID": boardIndex, "retVal": (sumOfUnmarked * number) }
					}
				}
			})

			if (isBoardCompleted(playerBoard.lines)) {
				let sumOfUnmarked = lodash.flattenDeep([playerBoard.lines[0], playerBoard.lines[1], playerBoard.lines[2], playerBoard.lines[3], playerBoard.lines[4]])
				sumOfUnmarked = lodash.sum(sumOfUnmarked);
				if ((sumOfUnmarked * number) > 0) {
					pushedBoards.push(boardIndex);
					winnerBoard = { "boardID": boardIndex, "retVal": (sumOfUnmarked * number) }

				}
			}
		});
	});

	return winnerBoard.retVal;
};

export const solve = (_arr: any[]): any => {

	let arr = [..._arr] as string[];
	const numbers = lodash.flattenDeep(initNumbers(arr[0]));

	arr.shift();
	console.log(arr);

	let playersBoard = createBoards(arr);

	let winnerBoard: { boardID: number, retVal: number } = null;
	console.log(JSON.stringify(playersBoard));

	numbers.forEach(number => {
		playersBoard.forEach((playerBoard, boardIndex) => {

			playerBoard.lines.forEach((line, lineIndex) => {
				let findNumber = line.findIndex((lineV) => lineV === number);
				if (findNumber > -1) {
					line[findNumber] = null;
				}
				if (isBoardCompleted(playerBoard.lines)) {
					let sumOfUnmarked = lodash.flattenDeep([playerBoard.lines[0], playerBoard.lines[1], playerBoard.lines[2], playerBoard.lines[3], playerBoard.lines[4]])
					sumOfUnmarked = lodash.sum(sumOfUnmarked);
					if (winnerBoard === null)
						winnerBoard = { "boardID": boardIndex, "retVal": (sumOfUnmarked * number) }
				}
			})

			if (isBoardCompleted(playerBoard.lines)) {
				let sumOfUnmarked = lodash.flattenDeep([playerBoard.lines[0], playerBoard.lines[1], playerBoard.lines[2], playerBoard.lines[3], playerBoard.lines[4]])
				sumOfUnmarked = lodash.sum(sumOfUnmarked);
				if (winnerBoard === null)
					winnerBoard = { "boardID": boardIndex, "retVal": (sumOfUnmarked * number) }
			}
		});
	});

	return winnerBoard.retVal;
};


// export const solve2 = (_arr: any[]): any => {
// 	let arr = [..._arr] as any;
// 	arr
// 	const bingoNumbers:number[] = splitCommaAndToNumber(arr[0]);
// 	console.log(bingoNumbers);

// 	arr.shift();
// 	const bingoBoards = groupByN(5, arr);

// 	const numberOfBoards = bingoBoards.length;
// 	let bingoBoardChecks = Array(numberOfBoards).fill([[false, false, false, false, false], [false, false, false, false, false], [false, false, false, false, false], [false, false, false, false, false], [false, false, false, false, false]])
// 	for (let bingoNumberIndex = 0; bingoNumberIndex < bingoNumbers.length; bingoNumberIndex++) {
// 		const currentBingoNumber = bingoNumbers[bingoNumberIndex];

// 		for (let bingoBoardsIndex = 0; bingoBoardsIndex < bingoBoards.length; bingoBoardsIndex++) {
// 			const bingoBoardRows = bingoBoards[bingoBoardsIndex];
// 			for (let bingoBoardRowsIndex = 0; bingoBoardRowsIndex < bingoBoardRows.length; bingoBoardRowsIndex++) {
// 				const bingoBoardRow = splitSpaceAndToNumber(bingoBoardRows[bingoBoardRowsIndex].toString());
// 				for (let bingoBoardRowElemIndex = 0; bingoBoardRowElemIndex < bingoBoardRow.length; bingoBoardRowElemIndex++) {
// 					const element = bingoBoardRow[bingoBoardRowElemIndex];
// 					if (element === currentBingoNumber) {
// 						bingoBoardChecks[bingoBoardsIndex][bingoBoardRowsIndex][bingoBoardRowElemIndex] = true;											
// 						if(isBingo(bingoBoardChecks[bingoBoardsIndex]))
// 						{
// 							console.log(bingoBoardsIndex);

// 						}
// 					}
// 				}
// 			}
// 		}
// 	}
// };


// export const solve = (_arr: any[]): any => {
// 	const arr = [..._arr] as any;	
// 	let hashMap = {};	
// 	const bingoNumbers = splitCommaAndToNumber(arr[0]);
// 	const bingoBoards = groupByN(5, arr);
// 	bingoBoards.shift();
// 	const numberOfBoards = bingoBoards.length;

// 	for (let numberIndex = 0; numberIndex < bingoNumbers.length && bingoNumbers[numberIndex]!==undefined; numberIndex++) { //foreach bingo number
// 		const currentBingoNumber = bingoNumbers[numberIndex];
// 		for (let boardIndex = 0; boardIndex < numberOfBoards; boardIndex++) { //foreach board
// 			const currentBoard = splitSpaceAndToNumber(bingoBoards[boardIndex]);	
// 			console.log(currentb);

// 			for (let ro = 0; ro < array.length; ro++) {
// 				const element = array[ro];

// 			}

// 		}
// 	}

// 	hashMap;

// 	return arr;
// };

const processInput = (input: string): any => {
	const n =
		input.trim().split(LINE_SEPARATOR).map(v => v.trim()).filter((v) => !!v)

	return n;
};

describe('Day', () => {
	it('Test Case 1', () => {
		const result = solvePt2(processInput(exampleInput));
		result; //?
		assert.deepEqual(result, 4512);
	});

	it('Result', () => {
		const result = solvePt2(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 65325);
	});
});

