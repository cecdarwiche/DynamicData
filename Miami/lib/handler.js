let eList = require('../data/emails.json')
//
const fs = require('fs')

//include navigation
let navigation = require("../data/navigation.json")

exports.newsletterSignup = (req,res) => {
    res.render('newsletter-signup', {csrf : 'supersecret', nav:navigation })
}

exports.newsletterSignupProcess = (req,res) => {
    console.log(req.body)
    //Extract the information for the data
    // let user = {
    //     firstname: req.body.firstname, 
    //     lastname: req.body.lastname, 
    //     address: req.body.address,
    //     city: req.body.city,
    //     state: req.body.state,
    //     zip: req.body.zip,
    //     email: req.body.email
    // }
    //add the user to our list
    eList.users.push(req.body) //this replaces the above but adds the csrf (has all the fields)
    console.log(eList)
    let json = JSON.stringify(eList)

    fs.writeFileSync('./data/emails.json', json,'utf-8', ()=>{})



    res.redirect(303, '/newsletter/list')
    //res.render('newsletter-signup', {csrf : 'supersecret' })
}

exports.newsletterSignupList = (req,res)=> {
    let eList = require('../data/emails.json')
    console.log(eList)
    res.render('userspage', {"users": eList.users, nav:navigation})
    
}

exports.newsletterUser = (req,res) => {
    console.log(eList)
    let userDetails = eList.users.filter((user)=>{
        return user.email == req.params.email
    })
    console.log(userDetails)
    res.render('userDetails', {"users": userDetails, nav: navigation})
}

exports.newsletterUserDelete = (req,res) => {
    //create temporary list
    let newList = {}
    //retrieve all users filtering out the email we don't want
    // != not equal
    newList.users = eList.users.filter((user)=>{
        return user.email != req.params.email
    })
    console.log("Deleting " + req.params.email)

    //convert the object to a string before writing the file 
    var json = JSON.stringify(newList)

    fs.writeFile('./data/emails.json', json,'utf-8', ()=>{})

    delete require.cache[require.resolve("../data/emails.json")]; //clearing cache for module 

    res.redirect(303, '/newsletter/list')
}