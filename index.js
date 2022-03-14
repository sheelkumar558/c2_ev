const express = require("express");

const mongoose = require("mongoose");

const app = express();

//app.use(express.json());

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://Sheelu:Sheelu_123@cluster0.vp8ij.mongodb.net/book?retryWrites=true&w=majority"
  );
};

const userSchema = new mongoose.Schema(
    {
        firstName:{type:String,required:true},
        middleName:{type:String},
        age:{type:Number,required:true},
        email:{type:String,required:true,unique:true},
        address:{type:String,required:true},
        gender:{type:String,required:true},
       
    },
    {
        versionKey:false,
        timestamps:true,
    }
);

const User = mongoose.model("user",userSchema);

const branchSchema = new mongoose.Schema(
    {
        name:{type:String,required:true},
        IFSC:{type:Number,required:true},
        MICR:{type:Number,required:true},
        address:{type:String,required:true},
       userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true,
       },
    },
    {
        versionKey:false,
        timestamps:true,
    }
);

const Branch = mongoose.model("branch",branchSchema);

const masterSchema = new mongoose.Schema(
    {
        balance:{type:String,required:true},
      
       userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true,
       },
       branchId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"branch",
        required:true,
   },
    },
    {
        versionKey:false,
        timestamps:true,
    }
);
const Master = mongoose.model("master",masterSchema);

const fixedSchema = new mongoose.Schema(
    {
        balance:{type:String,required:true},
        account_number:{type:Number,required:true,unique:true},
        interestRate:{type:String,required:true},
        startDate:{type:String,required:true},
        maturityDate:{type:String,required:true},
      
       userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true,
       },
       branchId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"branch",
        required:true,
   },
    },
    {
        versionKey:false,
        timestamps:true,
    }
);

const Fixed = mongoose.model("fixed",fixedSchema);

const savingSchema = new mongoose.Schema(
    {
        balance:{type:String,required:true},
        account_number:{type:Number,required:true,unique:true},
        interestRate:{type:String,required:true},
        
       userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true,
       },
       branchId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"branch",
        required:true,
   },
    },
    {
        versionKey:false,
        timestamps:true,
    }
);

const Saving = mongoose.model("saving",savingSchema);

app.get("/users",async(req,res) =>{
   try{
     
     const user = await User.find().lean().exec(); 

     return res.status(200).send({user:user});
       }catch(err){
       console.log(err);
   }
});


app.post("/users",async(req,res) =>{
    try{
      
      const user = await User.create(req.body); 
 
      return res.status(201).send(user);
        }catch(err){
        console.log(err);
    }
 });


 app.get("/branch",async(req,res) =>{
    try{
      
      const branch = await Branch.find().lean().exec(); 
 
      return res.status(200).send({branch:branch});
        }catch(err){
        console.log(err);
    }
 });
 
 
 app.post("/branch",async(req,res) =>{
     try{
       
       const  branch = await Branch.create(req.body); 
  
       return res.status(201).send(branch);
         }catch(err){
         console.log(err);
     }
  });

  app.get("/fixed",async(req,res) =>{
    try{
      
      const fixed = await Fixed.find().lean().exec(); 
 
      return res.status(200).send({fixed:fixed});
        }catch(err){
        console.log(err);
    }
 });
 
 
 app.post("/fixed",async(req,res) =>{
     try{
       
       const fixed = await Fixed.create(req.body); 
  
       return res.status(201).send(fixed);
         }catch(err){
         console.log(err);
     }
  });

  app.get("/master",async(req,res) =>{
    try{
      
      const master = await Master.find().lean().exec(); 
 
      return res.status(200).send({master:master});
        }catch(err){
        console.log(err);
    }
 });
 
 
 app.post("/master",async(req,res) =>{
     try{
       
       const master = await Master.create(req.body); 
  
       return res.status(201).send(master);
         }catch(err){
         console.log(err);
     }
  });

  app.get("/saving",async(req,res) =>{
    try{
      
      const saving = await Saving.find().lean().exec(); 
 
      return res.status(200).send({saving:saving});
        }catch(err){
        console.log(err);
    }
 });
 
 
 app.post("/saving",async(req,res) =>{
     try{
       
       const saving = await Saving.create(req.body); 
  
       return res.status(201).send(saving);
         }catch(err){
         console.log(err);
     }
  });

  app.listen(4000,() =>{
    console.log("4000");
  });
  