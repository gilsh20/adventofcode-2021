import { exampleInput, puzzleInput } from "./puzzle-input";
import { assert } from 'chai';

export const solve = (_arr: any[]): any => {
	const arr = [..._arr];
	//return arr.filter((value, index, array) => index > 0 && value > array[index - 1]).length;
	let valuesArr = [];
	let cnt = 0
	arr.forEach((value)=>{
		if(valuesArr.length === 3)
		{
			let sum = valuesArr[0]+valuesArr[1]+valuesArr[2];
			valuesArr[0] = valuesArr[1];
			valuesArr[1] = valuesArr[2];
			valuesArr[2] =value;
	
			let nextSum = valuesArr[0]+valuesArr[1]+valuesArr[2];
	
			if(nextSum>sum)
			   cnt++;
		}
		else
		{
			valuesArr.push(value);
		}

	    
		
	});
	return cnt;
};

const processInput = (input: string): any => {
	const n =
		input.split('\n')
			.map(n => n.trim())
			.filter((v) => !!v)
			.map(Number);

	return n;
};

describe('Day', () => {
	it('Test Case 1', () => {
		const result = solve(processInput(exampleInput));
		result; //?
		assert.deepEqual(result, 5);
	});

	it('Result', () => {
		const result = solve(processInput(puzzleInput));
		result; //?
		assert.deepEqual(result, 1618);
	});
});

