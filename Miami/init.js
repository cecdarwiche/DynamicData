//arays
//numeric
let numbers = [10, 45, 56, 7, 90]

//strings
let names = ["Cecile", "William", "John", "Peter"]

// access values of an array
console.log(names[0])
console.log(numbers[2])

// array iteration
names.forEach( (value, index)=> {
    //inside item
    console.log(value, index)
    if(value == "John"){
        console.log("Found John in position " + index)
    }
})

/* ANOTHER WAY
for(let i = 0; i < numbers.length; i++){
    console.log(numbers[i])
}
 */

//javascript objects
let person = {
    firstName: "William", //person.firstName --> to access it 
    lastName: "Jattin",
    occupation: "Lecturer",
    email: "email@email.com",
    getName: ()=>{
        console.log("My name is " + this.firstName)
    }
}

console.log(person.firstName)

//JSON -- industry standard for storing data (does not store functions only key values)
let data = {
    brand: {
        name: "Miami Travel Site", //data.brand.name
        link: "/",
        img: "/images/logo.png"
    },
    links: [
        {
            text: "Home",
            href:"/"
        },{
            text: "Nightlife",
            href:"/nightlife"
        },{
            text: "Beaches",
            href:"/beaches"
        },{
            text: "About",
            href:"/about"
        }
    ]

}
