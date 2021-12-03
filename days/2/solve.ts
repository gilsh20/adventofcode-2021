import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';

export const solve = (_arr: any[]): any => {
	const arr = [..._arr];
	let hor = 0;
	let depth = 0;
	let aim = 0;
	for (let index = 0; index < arr.length; index++) {
		const element = arr[index] as string;
		if(element.includes('forward'))
		{
			hor += Number(element.replace('forward','').trim());
			depth += aim *  Number(element.replace('forward','').trim());
		}

		else if(element.includes('down'))
		{
			aim  +=  Number(element.replace('down','').trim());

		}
		else 
		{
			aim -= Number(element.replace('up','').trim());
		}
	}	
	return hor * depth;
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
		result; //?
		assert.deepEqual(result, 900);
	});

	it('Result', () => {
		const result = solve(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 1971232560);
	});
});

