const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

//Functions
//syntax of a function 
const someName = (name)=>{
    console.log("Your name is " + name)
}

someName("Cecile");

//create function to read files and display them
const displayPage = (path, r, status = 200)=>{
  r.setHeader('Content-Type', 'text/html');


  fs.readFile(path, (error, content)=>{
        //we need to handle errors first 
        if(error){
          r.statusCode = 500
          r.end("500 - error")
        }
        //if there are no errors, we can output the content
        r.statusCode = status
        
        //res.end('Hello, World!\n' + req.url);
        r.end(content)

  })

}

const server = http.createServer((req, res) => {
  
  console.log(req.url) //logging the request.url (request is object with a lot of properties and values)
  switch(req.url){
    case "":
    case "/":
      //respond to / 
      displayPage('./public/home.html', res)
    break; 
    
    case "/about":
      //respond to / 
      displayPage('./public/about.html', res)
    break; 
      
    case "/contact":
      //respond to / 
      displayPage('./public/contact.html', res)
    break; 

    default:
      //respond to / 
      displayPage('./public/404.html', res, 404) 
  }
  
  
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
}); 