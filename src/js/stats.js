/*
 * @param {array} grades
 */
export function getNumberOfGrades(grades) {
  return grades.length;
}

/*
 * @param {array} grades
 */
export function getFirstGrade(grades) {
  return grades[0];
}

/*
 * @param {array} grades
 */
export function getLastGrade(grades) {
  return grades.at(-1);
}

export function getAverageGrade(grades) {
  let sum = 0;

  grades.forEach((grade) => {
    sum += grade;
  });

  const average = sum / grades?.length || 0;

  return average;
}
