//import module into application
const express = require('express')

// app variable so we don't have to type express all the time
const app = express()
//select static routing
app.use(express.static('./public'))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))

const handler = require('./lib/handler')

//Setup template engine
const handlebars = require('express-handlebars')
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');



//to set the port execte: port = 8080 node miami
//^^ what you would use to overwrite the port 
// if we specify a port when we run the application, use that value otherwise assign 3000
const port = process.env.port || 3000

let navigation = require("./data/navigation.json")

//import slideshow data
let slideshow = require("./data/slideshow.json")

//import gallery data
let gallery = require('./data/gallery.json')

//import page data
let content = require('./data/pages.json')

//import destinations
let destinations = require('./data/destinations.json')

// create some routes
//  SYNTAX: app.get('pass parameter we want to request', (request, response) =>...)
app.get('/', (request, response) =>{
//filter slideshow object to get home page only
    let slides = slideshow.slides.filter((slide) => {
        return slide.home == true; 
    })

    response.type("text/html")
    // we don't put status here because default status is already 200 meaning it is all good, only overwrite when we have a problem
    response.render("page",{
        title:"Welcome to Miami", 
        nav: navigation,
        slides: slides,
        images: gallery.images 
    })
})

//dynamic routes for pages
app.get('/page/:page', (req,res) => {
    //filter pages object to get page from :page req.params.page
    let page = content.pages.filter((item) => {
        return item.page == req.params.page 
    })
    //page is an array with just one item, we access the position 0 to get the object alone
    console.log(page[0]);

    //filter slideshow object to get home page only
    let slides = slideshow.slides.filter((slide) => {
        return slide.home == true; 
    })

    //filter destinations
    let dest = destinations.locations.filter((loc) => {
        return loc.page == req.params.page; 
    })

    res.type("text/html")
    res.render("page",{
        title: page[0].title, 
        description: page[0].description,
        locations: dest, 
        nav: navigation,
        slides: slides,
        images: gallery.images
    })

})

app.get('/beaches', (request, response) =>{
    response.type("text/html")
    response.render("page",{title: "Miami Beaches", nav: navigation})
})

app.get('/nightlife', (request, response) =>{
    response.type("text/html")
    response.render("page",{title: "Miami Nightlife", nav: navigation})
})

app.get('/food', (request, response) =>{
    response.type("text/html")
    response.render("page",{title: "Miami Food", nav: navigation})
})

app.get('/shopping', (request, response) =>{
    response.type("text/html")
    response.render("page",{title: "Miami Shopping", nav: navigation})
})


//generating an ERROR, there is no respon
app.get('/about', (request, response) =>{
    response.type("text/html")
    response.render("page",{title:"About Miami", nav: navigation})
})

//Query params and body
app.get('/search', (request, response) =>{
    console.log(request)
    response.type("text/html")
    response.render("page",{title:"Search results for: " + request.query.q})
})

app.get('/basic', (req,res) =>{
    res.render('page', {req})
})

//newsletter
app.get('/newsletter-signup', handler.newsletterSignup)
app.post('/newsletter-signup/process', handler.newsletterSignupProcess)
app.get('/newsletter/list', handler.newsletterSignupList)

//Dynamic Routes 
//details shows one record 
app.get('/newsletter/detail/:email', handler.newsletterUser)
//delete
app.get('/newsletter/delete/:email', handler.newsletterUserDelete)

// ERROR HANDLING -- goes after actual routes ^^
//the default response is 404 not found
app.use((request,response) =>{
    response.type("text/html")
    response.status(404) //default
    response.send("404 not found") 

})

// SERVER ERROR
// other possibility than 404 is that we have an error, that has a different callback function 
// if you have response that has 4 parameters, then there's an error
app.use((error, request, response, next) => {
    console.log(error)
    response.type("text/html")
    response.status(500) //default
    response.send("500 server error") 
})

//START THE SERVER
app.listen(port, () =>{
    console.log(`Express is running on http://localhost:${port};`)
    console.log(` press Ctrl-C to terminate. `)

})


/*
to add newsletter, add this to the navigation.json file:

{
            "text": "Newsletter Sign Up",
            "href":"/newsletter-signup"
        },{
            "text": "Newsletter List",
            "href":"/newsletter/list"
        },
*/
        
