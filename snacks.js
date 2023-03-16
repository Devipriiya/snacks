import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import connectDB from "./db.js";
connectDB();
// const router =express.Router();

const snacksSchema=mongoose.Schema(
    {
    snackslist:[{
        image:{
            data:String,
         contentType: String
        },
        productname:{
            type:String,
           
            },
      price:{
             type:String,
          
         },
         quantity:{
            type:String,
         
        },
    offer:{
        type:String,
    }
           }]          })

var Snacks = mongoose.model('Snacks', snacksSchema);
snacksSchema.plugin(Snacks);


const Storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
     cb(null,file.originalname);
    },
});

const upload = multer({
    storage: Storage,
   
}).single('testImage')
const snacks={
    snackslist:[{
        image:{
            data:"kurkure-removebg-preview.png",
    contentType:"image/png"
        },
        productname:"Kurkure",
        price:"Rs.50",
        quantity:"5",
        offer:"5%"
    },
      {
        image:{
            data:"mixture-removebg-preview.png",
    contentType:"image/png"
        },
        productname:"Mixture",
        price:"Rs.10",
        quantity:"1",
        offer:"5% "
    },
    {
        image:{
            data:"biscuits-removebg-preview.png",
    contentType:"image/png"
        },
        productname:"Good day ",
        price:"Rs.30",
        quantity:"1",
        offer:"5%"
    },
    {
        image:{
            data:"bingo-removebg-preview.png",
    contentType:"image/png"
        },
        productname:"Bingo",
        price:"Rs.30",
        quantity:"3",
        offer:"10%"
    }
]
}
// connectDB();
const app=express();
app.use(express.json());




app.get('/snacks',(req,res) =>
{
    try{
        res.status(200).send(snacks);
    }
    catch(error){
        res.json({message:"not available"});
    }
});



app.get('/snacks/:id',(req,res)=>{
    console.log(req.params.id);
   Snacks.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
            snacks:result
        })
    })
    .catch(err=> {
    console.log(err);
    res.status(505).json({
        error:err
    })
    }
  )
})

app.post('/snacks',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            const newImage = new Snacks({
                snackslist:req.body.snackslist
            })
            newImage.save()
        .then(()=>res.send('successfully uploaded')).catch(err=>console.log(err))
        }
    })
    
})

app.put('/snacks/:id',(req,res)=>{
    console.log(req.params.id);
    Snacks.findOneAndUpdate({_id:req.params.id},{
        $set:{
            snackslist:req.body.snackslist
          

        }
    })
    .then(result=>{
        res.status(200).json({
            updated_snacks:result       
         })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    })
    app.delete('/snacks/:id',(req,res)=>{
        console.log(req.params.id);
        Snacks.deleteOne({_id:req.params.id},{
            $set:{
               
                snackslist:req.body.snackslist
    
            }
        })
        .then(result=>{
            res.status(200).json({
                deleted_snacks:result       
             })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error:err
            })
        })
        })
        app.delete('/snacks',(req,res)=>{
    
            Snacks.deleteMany({snacks},(err,result)=>{
            if(err) throw err
            res.send(snacks)
            })
        })

    
        const port=4000;
        app.listen(port,()=>{
            console.log(`server is running at ${port}`);
            console.log(snacks);
        });