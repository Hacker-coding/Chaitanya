var express=require("express")
var app=express();
var mongoose=require("mongoose")
var methodOverride = require("method-override")
app.use(express.json());
app.use(methodOverride("_method"));
var path = require("path")
//app.use(bodyparser.urlencoded({extended:false}));
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/",function(req,res){
  //  res.send("hello chaitanya")
  res.render("index")
})

app.get("/2",function(req,res){
  Names.find({},function(err,Data){
    console.log("-->",Data)
    res.render("show",{Data:Data})
  })
})
app.post("/form_data",function(req,res){
  console.log("data is",req.body.first)

  Names.create({
    Name:req.body.Name,
  age:req.body.age,
  phone_number:req.body.phone_number,
  likes:req.body.likes,
  birthday:req.body.birthday,
  review:req.body.review
  },function(err,newData){
    if(err)
    res.send(err)
    console.log("data SAVED",newData)
    res.redirect("/2")
  })
  })
app.set("view engine","ejs")
var bodyparser=require('body-parser')
var Names=require('./database')
app.use(express.json());
app.use(bodyparser.urlencoded({extended:false}));
// app.use(express.urlencoded({extended:fales}));

mongoose.connect("mongodb://localhost/chaitanya_data",{userNewUrlParser:true})
app.get("/create",function(req,res){   
  // res.send("hello chaitanya")
   res.render("one")
})

app.get("/",function(req,res){
  
  Names.find({},function(err,data){
   console.log("dd",data)
    res.render("show",{data:data})
})
})
app.post("/from_data",function(req,res){

console.log("data is", req.body.first)

Names.create({
  Name:req.body.Name,
  age:req.body.age,
  phone_number:req.body.phone_number,
  likes:req.body.likes,
  birthday:req.body.birthday,
  review:req.body.review
},function(err ,newData){
  if(err)
  res.send(err)

  console.log("data SAVED", newData)

  res.redirect("/2")
})
})

 app.get("/signup",function(req,res){
   //  res.send("hello chaitanya")
   res.render("tow")
 })
 app.get("/forgot",function(req,res){
     //  res.send("hello chaitanya")
     res.render("ch")
   })

   app.get("/edit_data/:id",function(req,res){
console.log("---->",req.params.id)
Names.findById(req.params.id,(err,data)=>{
if(err){
  res.send("data to update")
}
console.log("data to update",data)
res.render("edit",{data:data})
})
   })



   app.put("/updating_data/:id",function(req,res){
    var obj={
      Name:req.body.Name,
      age:req.body.age,
      phone_number:req.body.phone_number,
      likes:req.body.likes,
      birthday:req.body.birthday,
      review:req.body.review
    }
    Names.findByIdAndUpdate(req.params.id,obj,function(err,updatedData){
      if(err)
      {  console.log("data not updated")
          res.redirect("/2")
      }
      else{
          console.log("New updated data",updatedData)
          res.redirect("/2");
      }
  })
   })
app.delete("/delete_data/:id",function(req,res){
  Names.findByIdAndRemove(req.params.id,function(err){
    res.redirect("/2")
  })
})
app.listen(300,function(){
 console.log("server is start")
})