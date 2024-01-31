import { getNumberOfGrades, getFirstGrade, getLastGrade } from "../src/js/stats.js";

describe('getNumberOfGrades', () => {
	it('should return the correct number of grades', () => {
		expect(getNumberOfGrades([1, 2, 3])).toBe(3)
		expect(getNumberOfGrades([10, 20, 30, 40])).toBe(4)
	})
})

describe('getFirstGrade', () => {
	it('should return the first grade in the array', () => {
		expect(getFirstGrade([1, 2, 3])).toBe(1)
		expect(getFirstGrade([10, 20, 30, 40])).toBe(10)
	})
})

describe('getLastGrade', () => {
	it('should return the last grade in the array', () => {
		expect(getLastGrade([1, 2, 3])).toBe(3)
		expect(getLastGrade([10, 20, 30, 40])).toBe(40)
	})
})


