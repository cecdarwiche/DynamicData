//initialize express
const express = require('express')

const app = express()

//import body-parser
const bodyParser = require('body-parser')

//Define our models and init database 
const { Sequelize , Model, DataTypes } = require('sequelize')
//Create a sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
})   
// Create your first Model
const Customer = sequelize.define('Customers',
  {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
  })

//NEW PART ORDERS
const Order = sequelize.define('Orders', {
  size: DataTypes.STRING,
  toppings: DataTypes.STRING,
  notes: DataTypes.STRING,
  total: DataTypes.NUMBER,
  status: DataTypes.STRING
})

//make relationshipto customer table
Order.belongsTo(Customer)
//specify relationship between order and customer
Customer.hasMany(Order)


//ORDERS DONE

//Initialize bodyparser - converts POST request objects to json
app.use(bodyParser.urlencoded({extended:true}))
//app.use(bodyParser.json())

//sync the models to the database
sequelize.sync() // every time you initialize application sequelize will heck if table exists, if not will create it

// initialize handlebars
const handlebars = require('express-handlebars')
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')

//set the server port
const port = process.env.port || 3000

  
app.get('/', (req,res)=>{
  res.type('text/html')
  res.render('page')
})

//CRUD Routes

// Add a customer
app.post('/customers/create', async (req, res) => {
  res.type('text/html'); 
  res.render('customer');
});


app.post('/customer/create', async (req, res) => {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any 
        console.log(req.body)
        // console.log(req.file.originalname)
        // console.log(req.file.mimetype)
        // res.type('text/html')
    //res.send('uploaded!!')
    const newCustomer = await Customer.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      email: req.body.email,
      phone: req.body.phone,
    })
    res.type('text/html')
  
    res.redirect('/customers')

  });

  //read
  app.get('/customers', async (req,res) =>{
    const customers = await Customer.findAll().then((data) => {
      console.log(data)
      res.type('text/html')
      res.render('customers', {"customers": data})
    });
  });

  //display specific customer by id
  app.get('/customer/details/:id', async (req,res) => {
    const customers = await Customer.findOne({where: {id:req.params.id}, raw:true}).then((data)=>{
      console.log("data")
      console.log(data)
      console.log("__________________")
      res.type('text/html')
      res.render('customerdetails', {"customers": data})
    });
  });

  //EDIT CUSTOMER
  app.get('/customer/edit/:id', async (req, res) => {
    const customers = await Customer.findOne({where: {id:req.params.id}, raw:true}).then((data)=>{
      console.log("data")
      console.log(data)
      console.log("__________________")
      res.type('text/html')
      res.render('customer', {"customers": data})
    });
  });

  app.post('/customer/edit', async(req,res) => {
    console.log(req.body)
    const customers = await Customer.findByPk(req.body.id);
    console.log(customers)
    console.log(req.body.id)
    await customers.update({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      email: req.body.email,
      phone: req.body.phone,
    }).then(() =>{
      customers.save()
      res.type('text/html')
      //redirect to customers list
      res.redirect('/customers')
    });
  });


  //Delete
  app.get('/customer/delete/:id', async (req, res) => {
    const customers = await Customer.findByPk(req.params.id);
    customers.destroy();
    res.type('text/html')
    res.redirect('/customers')
  });



  //ORDERRR!!
  app.post('/order/create', async (req, res) => {
    res.type('text/html'); 
    res.render('order');
  });

//error handling
//not found
app.use((req, res) => {
  res.type('text/html')
  res.status(404)
  res.send('not found')
})

// server errors
app.use((req, res) => {
  res.type('text/html')
  res.status(500)
  res.send('server error')
})

app.listen(port, () => {
  console.log(`server started on http://localhost:${port} ctrl + c to terminate`)
})