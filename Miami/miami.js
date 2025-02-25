//import module into application
const express = require('express')

// app variable so we don't have to type express all the time
const app = express()

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
// create some routes
//  SYNTAX: app.get('pass parameter we want to request', (request, response) =>...)
app.get('/', (request, response) =>{
    response.type("text/html")
    // we don't put status here because default status is already 200 meaning it is all good, only overwrite when we have a problem
    response.render("home",{title:"Miami Travel Site", nav: navigation})
})

app.get('/beaches', (request, response) =>{
    response.type("text/html")
    response.render("page",{title: "Miami Beaches", nav: navigation})
})

app.get('/nightlife', (request, response) =>{
    response.type("text/html")
    response.render("page",{title: "Miami Nightlife", nav: navigation})
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