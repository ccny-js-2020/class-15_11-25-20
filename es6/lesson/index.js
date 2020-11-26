/*
	const and let are part of es6
*/

/*
	arrow functions
*/
//instead of writing this
// function myAdditionFunction(a,b){
// 	return a + b;
// }
//you can write this
let myAdditionFunction = (a,b) => {
	return a + b
}

console.log(myAdditionFunction(1,1))

/*
	different ways to loop and return new array
*/
var animals = ['elephant', 'gorilla', 'giraffe', 'monkey', 'rhino', 'hippo'];
var numbers = [12, 13, 132, 5534, 49309, 1948, 101, 4001]
var students = [{name: "bob", age: "25"},{name: "jill", age: 22}]

//forEach is the same as a for loop
animals.forEach((animal, i) => {
	console.log("animal: " + animal);
	console.log("i: " + i);
});

//map is like a for loop with logic
//that returns an array with the boolean value for all of the indexes based on the logic
//in this case, we're going to return an array where each index has a boolean value if the letter 'g' is in a string from the animals array above
//look at the console.log below
var whichAnimalsHaveG = animals.map((animal) => {
	return animal.indexOf('g') > -1;
});

var studentNames = students.map((student) => {
	return student.name;
});
//filter will return an array based on operator logic
//unlike map, it will return an array with only the values that match the logic
//in this case, it is filtering if the first letter of a string in the animals array is "g"
//look at the console.log below
var animalsWithG = animals.filter((animal) => {
	return animal.charAt(0) === "g"
});
//reduce will do some time of combination of the indexes in array
//it can get very complex
//in this case, it is adding all of the indexes in the numbers array together
//look at the console.log below
var numbersAddedTogether = numbers.reduce((a,b) => {
	return a + b
}, 0);

console.log(whichAnimalsHaveG);
console.log(animalsWithG);
console.log(numbersAddedTogether);
console.log(studentNames);
