const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = 3001;

// config

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// connect to mongodb
mongoose.connect('mongodb+srv://admin457:password7458@crud.ht4hpui.mongodb.net/?retryWrites=true&w=majority')

// data schema 
const itemSchema = {
    title: String,
    description: String,
}

// data model 
const Item =mongoose.model("Item", itemSchema);

// read route 

app.get('/items',(req,res) =>{
    Item.find()
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error:" + err));
} );

// create route 
app.post('/newitem' ,(req,res)=> {
    const newItem = new Item(
        {
            title: req.body.title,
            description: req.body.description,
        }
    );

    newItem
    .save()
    .item((item) => console.log(item))
    .catch((err) => res.status(400).json("Error" + err));
})

// delete route 

app.delete('delete/:id', (req,res) => {
    const id =req.params.id;

    Item.findByIdAndDelete({_id: id}, (req, res, err) => {
        if(!err) {
            console.log("Item Delete");
        } else {
            console.log(err);
        }
    });
});

// update route app.

app.put('/put/:id', (req,res) =>{
    const updatedItem = {
        title: req.body.title,
        description: req.body.description,
    }
    Item.findByIdAndUpdate({_id:req.params.id}, 
        {$set:updatedItem},
        (req, res, err) => {
            if(!err){
                console.log("Item updated");
            } else {
                console.log(err);
            }
        }
    );
});


app.listen(port,function(){
    console.log("express is running");
});