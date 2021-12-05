import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';

interface PointLine {
	left: Point;
	right: Point;
}
interface Point {
	x: number;
	y: number;
}
const createPoints = (segmants: string[]): PointLine[] => {
	const pointLines = [];
	segmants.forEach(segmant => {
		const [leftSeg, rightSeg] = segmant.split('->');
		const [leftSegX, leftSegY] = leftSeg.split(',');
		const [rightSegX, rightSegY] = rightSeg.split(',');
		const leftPoint = <Point>{ "x": Number(leftSegX), "y": Number(leftSegY) };
		const rightPoint = <Point>{ "x": Number(rightSegX), "y": Number(rightSegY) };
		pointLines.push(<PointLine>{ "left": leftPoint, "right": rightPoint })
	});
	return pointLines;
}

const moreThan2 = (hashmap: object): number => {
	const keys = Object.keys(hashmap);
	let cnt = 0;
	for (let index = 0; index < keys.length; index++) {
		const keyName = keys[index];
		if (hashmap[keyName] > 1)
			cnt += 1;
	}
	return cnt;
}

export const solve = (_arr: any[]): any => {
	const arr = [..._arr];
	let hash = {};
	const pointsLines = createPoints(arr);
	pointsLines.forEach((pointLine, i) => {
		console.log("hi");

		if ((pointLine.left.x !== pointLine.right.x)) {
			pointLine;
			let min = Math.min(pointLine.left.x, pointLine.right.x);
			let max = Math.max(pointLine.left.x, pointLine.right.x);
			for (let index = min; index <= max; index++) {
				if (hash[index + '-' + pointLine.left.y])
					hash[index + '-' + pointLine.left.y]++;
				else
					hash[index + '-' + pointLine.left.y] = 1;

			}
		}

		if ((pointLine.left.y !== pointLine.right.y)) {
			let min = Math.min(pointLine.left.y, pointLine.right.y);
			let max = Math.max(pointLine.left.y, pointLine.right.y);
			for (let index = min; index <= max; index++) {
				if (hash[pointLine.left.x + '-' + index])
					hash[pointLine.left.x + '-' + index]++;
				else
					hash[pointLine.left.x + '-' + index] = 1;

			}
		}
	});
	hash;

	return moreThan2(hash);
};

export const solvePt2 = (_arr: any[]): any => {
	const arr = [..._arr];
	let hash = {};
	const pointsLines = createPoints(arr);
	pointsLines.forEach((pointLine, i) => {

		if ((Math.abs(pointLine.left.y - pointLine.right.y) === Math.abs(pointLine.left.x - pointLine.right.x))) {

			const leftX = pointLine.left.x;
			const leftY = pointLine.left.y;
			const rightX = pointLine.right.x;
			const rightY = pointLine.right.y;

			//e.g: 8,8 -> 0,0
			if (leftX > rightX && leftY > rightY) {
				let indexX = leftX;
				let indexY = leftY;

				while (indexX >= rightX) {
					
					if (hash[indexX + '-' + indexY])
						hash[indexX + '-' + indexY]++;
					else
						hash[indexX + '-' + indexY] = 1;
					indexX--;
					indexY--;
				}
			}


			//e.g: 0,8 -> 8,0
			else if (leftX < rightX && leftY < rightY) {
				let indexX = leftX;
				let indexY = leftY;

				while (indexX <= rightX) {
					if (hash[indexX + '-' + indexY])
						hash[indexX + '-' + indexY]++;
					else
						hash[indexX + '-' + indexY] = 1;
					indexX++;
					indexY++;
				}
			}
			//e.g: 8,0 -> 0,8
			else if (leftX > rightX && leftY < rightY) {
				let indexX = leftX;
				let indexY = leftY;

				while (indexX >= rightX) {
					if (hash[indexX + '-' + indexY])
						hash[indexX + '-' + indexY]++;
					else
						hash[indexX + '-' + indexY] = 1;
					indexX--;
					indexY++;
				}
			}

			//e.g: 8,8 -> 0,0
			else if(leftX < rightX && leftY > rightY){
				let indexX = leftX;
				let indexY = leftY;

				while (indexX <= rightX) {
					if (hash[indexX + '-' + indexY])
						hash[indexX + '-' + indexY]++;
					else
						hash[indexX + '-' + indexY] = 1;
					indexX++;
					indexY--;
				}
			}

			//WTF is that?
			// let minX = Math.min((pointLine.left.x, pointLine.left.y), (pointLine.right.x, pointLine.right.y));
			// minX
			// let maxX = Math.max(pointLine.left.x, pointLine.right.x);

			// let minY = Math.min(pointLine.left.y, pointLine.right.y);
			// let maxY = Math.max(pointLine.left.y, pointLine.right.y);


			// while (minX < maxX && minY < maxY) {

			// 	if (hash[minX + '-' + minY])
			// 	hash[minX + '-' + minY]++;
			// else
			// 	hash[minX + '-' + minY] = 1;
			// 	minX++;
			// 	minY++;
			// }


		}

		else if ((pointLine.left.x !== pointLine.right.x && pointLine.left.y === pointLine.right.y)) {
			pointLine;
			let min = Math.min(pointLine.left.x, pointLine.right.x);
			let max = Math.max(pointLine.left.x, pointLine.right.x);
			for (let index = min; index <= max; index++) {
				if (hash[index + '-' + pointLine.left.y])
					hash[index + '-' + pointLine.left.y]++;
				else
					hash[index + '-' + pointLine.left.y] = 1;

			}
		}

		else if ((pointLine.left.y !== pointLine.right.y && pointLine.left.x === pointLine.right.x)) {
			let min = Math.min(pointLine.left.y, pointLine.right.y);
			let max = Math.max(pointLine.left.y, pointLine.right.y);
			for (let index = min; index <= max; index++) {
				if (hash[pointLine.left.x + '-' + index])
					hash[pointLine.left.x + '-' + index]++;
				else
					hash[pointLine.left.x + '-' + index] = 1;

			}
		}


	});
	hash;
	return moreThan2(hash);
};



const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim())
			.filter((v) => !!v)
	// .map(Number);

	return n;
};

describe('Day', () => {
	it('Test Case 1', () => {
		const result = solvePt2(processInput(exampleInput));
		result; //?
		assert.deepEqual(result, 12);
	});

	it('Result', () => {
		const result = solvePt2(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 12);
	});
});

