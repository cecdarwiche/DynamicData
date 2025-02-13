let eList = require('../data/emails.json')
//
const fs = require('fs')

exports.newsletterSignup = (req,res) => {
    res.render('newsletter-signup', {csrf : 'supersecret' })
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



    res.redirect('/newsletter/list')
    //res.render('newsletter-signup', {csrf : 'supersecret' })
}

exports.newsletterSignupList = (req,res)=> {
    console.log(eList)
    res.render('userspage', {"users": eList.users})
}