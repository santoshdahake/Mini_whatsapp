const express=require("express");
const app=express();
const mongoose =require("mongoose");
const path =require("path");
const Chat=require("./models/chat");
const methodOverride=require("method-override");
const ExpressError=require("./ExpressError");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


main().then(()=>{console.log("connectioin successfull")}).
    catch((err ) => console.log(err))

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//Index Route
app.get("/chats",async(req,res)=>{
   let chats=await Chat.find();
//    console.log(chats);
   res.render("index.ejs",{chats});
});

//New Route
app.get("/chats/new",(req,res)=>{
    throw new ExpressError(404,"page not found");
    res.render("new.ejs");
});

//Create Route
app.post("/chats",(req,res)=>{
    let {from,to,msg}=req.body;
    let newChat=new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date()
    });
    newChat
    .save()
    .then((res)=>{
        console.log("chat was saved");
    }).catch((err)=>{
            console.log(err);
        }
        );
        res.redirect("/chats");
    });


    // new -show Route
    app.get("/chats/:id",async(req,res,next)=>{
        let {id}=req.params;
        let chat=await Chat.findById(id);
        if(!chat){
            next( new ExpressError(404,"Chat not found"));
        }
        res.render("edit.ejs",{chat});
    });
    
//edit route

app.get("/chats/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
})

//update route
app.put("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let {msg:newMsg}=req.body;
    let updatedChat=await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true ,new:true});

    console.log(updatedChat);
    res.redirect("/chats");

})

//destroy route
app.delete("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedChat=await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
})


app.get("/",(req,res)=>{
    res.send("root is working");
});


// Error handling middleware
app.use((err,req,res,next)=>{
    let{status=500,message="Some error occured"}=err;
    res.status(status).send(message);
});


app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});