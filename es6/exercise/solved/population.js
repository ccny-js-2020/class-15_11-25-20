const arrayOfCountries = [
   { name: 'China', population: 1386395000 },
   { name: 'Costa Rica', population: 4905000 },
   { name: 'Brazil', population: 209288000 },
   { name: 'France', population: 67118000 },
   { name: 'Germany', population: 82695000 },
   { name: 'Finland', population: 5511300 },
   { name: 'Canada', population: 36290000 },
   { name: 'United States', population: 325700000 }
];

const population = [
	'Brazil',
	'United States',
	'Costa Rica'
]

// forEach is the same as looping
// for(var i = 0; i < arrayOfCountries.length; i++){
//   console.log(arrayOfCountries[i])
// }
arrayOfCountries.forEach((country) => {
	console.log(country);
});

var onlyCountries = arrayOfCountries.map((country) => country.name);
console.log(onlyCountries)

var largerCountries = arrayOfCountries.filter((country) => country.population > 10000000);
console.log(largerCountries)

var addAllCountries = arrayOfCountries.reduce((a,b) => a + b.population, 0);
console.log(addAllCountries)

function getPopulation(countryObjArray, populationArray){
	const filteredCountries = countryObjArray.filter((item) => populationArray.indexOf(item.name) !== -1);
  console.log(filteredCountries)
	return filteredCountries.reduce((a,b) => a + b.population, 0)
}
console.log(getPopulation(arrayOfCountries, population)/population.length)
