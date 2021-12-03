import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';

export const solveB = (_arr: any[]): any => {
	let arr = [..._arr] as string[];
	let ones = 0;
	let zeroes = 0;
	let buffer = ''
	let length = (arr[0] as string).length;
	let charIndex;
	let arrLength = arr.length;
	for (charIndex = 0; charIndex < length; charIndex++) {
		for (let index = 0; index < arrLength; index++) {
			const element = arr[index];
			if (element.charAt(charIndex) === '0')
				zeroes++;
			else
				ones++;
		}
		if(zeroes>ones)
		buffer+='1';
		else
		buffer+='0';
		arr = arr.filter((arrItem)=>arrItem.charAt(charIndex)===buffer[buffer.length-1]);
		arrLength = arr.length;
		zeroes = 0;
		ones = 0;
		if(arr.length==1)
		break;
	}
	arr;
	return parseInt(arr[0],2);
};

export const solve = (_arr: any[]): any => {
	let arr = [..._arr] as string[];
	let ones = 0;
	let zeroes = 0;
	let buffer = ''
	let length = (arr[0] as string).length;
	let charIndex;
	let arrLength = arr.length;
	for (charIndex = 0; charIndex < length; charIndex++) {
		for (let index = 0; index < arrLength; index++) {
			const element = arr[index];
			if (element.charAt(charIndex) === '0')
				zeroes++;
			else
				ones++;
		}
		if(zeroes>ones)
		buffer+='0';
		else
		buffer+='1';
		arr = arr.filter((arrItem)=>arrItem.charAt(charIndex)===buffer[buffer.length-1]);
		arrLength = arr.length;
		zeroes = 0;
		ones = 0;
		if(arr.length==1)
		break;
	}
	arr;
	return parseInt(arr[0],2);
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
		const result = solve(processInput(exampleInput));
		const result1 = solveB(processInput(exampleInput));
		result; //?
		assert.deepEqual(result*result1, 230);
	});

	it('Result', () => {
		const result = solve(processInput(puzzleInput));
		const result1 = solveB(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result*result1, 2845944);
	});
});

