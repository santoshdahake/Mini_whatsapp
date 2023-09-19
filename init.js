const mongoose=require("mongoose");
const Chat =require("./models/chat");

main().then(()=>{console.log("connectioin successfull")}).
    catch((err ) => console.log(err))

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


// let allChats=[
//     {
//     from:"neha",
//     to:"Priya",
//     msg:"send me your exam sheet",
//     created_at:new Date()
// },
// {
//     from:"santosh",
//     to:"sanya",
//     msg:"I Love You",
//     created_at:new Date()

// },
// {
//     from:"Rohit",
//     to:"Priya",
//     msg:"Please don't leave me alone",
//     created_at:new Date()
// },
// {
//     from:"Khomesh",
//     to:"Manshi",
//     msg:"Thanku manshi sister",
//     created_at:new Date()
// },
// {
//     from:"Modi",
//     to:"Rahul Gandhi",
//     msg:"Jeet ke bata 2024 ka election",
//     created_at:new Date()
// }
// ];

// Chat.insertMany(allChats);

Chat.deleteMany({name:"neha"}).then((res)=>{
    console.log(res);
})