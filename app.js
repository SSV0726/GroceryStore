var express              = require('express'),
    mongoose             = require('mongoose'),
    bodyParser           = require('body-parser'),
    user                 = require('./models/user'),
    product              = require('./models/product'),
    faker                = require('faker');
  
mongoose.connect("mongodb+srv://ssv0726:testing789@yelpdb-xswdx.mongodb.net/test?retryWrites=true&w=majority" ,{useNewUrlParser: true, useUnifiedTopology: true});
//mongoose.connect("mongodb://localhost/bigbasket")


app=express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));


for(var i=0 ; i<5 ; i++){
var randomName = faker.name.findName(); // Rowan Nikolaus
var randomEmail = faker.internet.email(); 
var randomMobile = faker.phone.phoneNumber();
var randomPasswrod = faker.address.zipCode();

user.create({ name : randomName , email : randomEmail , mobile : randomMobile , password : randomPasswrod});
console.log("created fake "+ i );
}


for(var i=0 ;i<3;i++){
    
    product.create({
        image: faker.image.imageUrl(),
        name : faker.commerce.productName() ,
        price : faker.commerce.price(),
        desc : " This is  a product "  
    })
    console.log("product added to its db");
}

var prodList=[];



//-----------------------Routes ------------------------------//
app.get('/',function(req,res){
    res.render("index");
})

app.get('/secret',function(req,res){
    cart= prodList.length;
     product.find({},function(err,products){
         if(err){
             console.log("some error occured while fetching products ");
         }
         res.render("secret",{products:products,cart:cart})
     })
})

app.get('/signup',function(req,res){
    res.render("signup");
})

app.get("/login",function(req,res){
    res.render("login");
})

app.post('/signup',function(req,res){
    console.log(req.body);
    user.create(req.body);
    res.redirect("/login");
})

app.post('/login',function(req,res){
    var email = req.body.email;
    var password = req.body.password;
    user.find({email : email , password : password}).count(function(err,body){
        if(err){
            console.log("Some error occured while comparing ");
        }
        console.log( email + typeof(email) );
        console.log( password + typeof(password) );
        console.log( body+ typeof(body) );
        if(body===1) {
            res.redirect("/secret");
        }else{
            res.send("Wrong email or password ");
        }
    });
    
})

app.post("/add",function(req,res){
   
    
    product.find({_id: req.body._id},function(err,prod){
        if(err){
            console.log("error occured at finid");
        }
        prodList.push(prod[0]);
        console.log(prod.name);
    } )
    res.redirect('/secret');
})

app.get('/cart',function(req,res){
    console.log(prodList);
    res.render("cart",{prodList : prodList})
})

app.get('/payment',function(req,res){
    res.render("payment");
})


app.post('/reset',function(req,res){
    prodList=[];
    res.redirect('secret');
})

//--------------------------Server----------------------------//
app.listen(process.env.PORT || 8000,process.env.IP,function(){
    console.log("Server started at 8000");
})