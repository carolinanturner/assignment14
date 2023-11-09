//Carolina Turner CSCE 242
const express = require("express");
const app = express();


app.use(express.static("public"));

app.get("/" , (req,res)=>{
    res.sendFile(__dirtitle+ "/index.html");
});

app.get("/api/beverages", (req, res) => {
    const beverages = [];
    beverages[0]={
        title :"Water",
        hot_or_iced:"Iced",
        price:"$0.00",
        fan_favorite:"No",
        recommendation: "N/A",
        flavors: ["N/A"],
        img: "images/water.jpg"
    };
    beverages[1]={
        title :"Coffee",
        hot_or_iced:"Hot",
        price:"$4.00",
        fan_favorite:"Yes",
        recommendation: "Have your coffee with cream and sugar.",
        flavors: ["Caramel", "Vanilla", "Pumpkin Spice", "Mocha"],
        img: "images/coffee.jpg"
    };
    beverages[2]={
        title :"Tea",
        hot_or_iced:"Hot",
        price:"$3.00",
        fan_favorite:"Yes",
        recommendation: "Try a green tea with lemon and honey.",
        flavors: ["Black", "Green"],
        img: "images/tea.jpg"
    };
    beverages[3]={
        title :"Milkshake",
        hot_or_iced:"Iced",
        price:"$5.00",
        fan_favorite:"Yes",
        recommendation: "Add our hot fudge topping!",
        flavors: ["Reese's Peanut Butter", "Oreo", "Classic Vanilla", "Classic Chocolate", "Peach"],
        img: "images/milkshake.jpg"
    };
    beverages[4]={
        title :"Soda",
        hot_or_iced:"Iced",
        price:"2 for $3.00",
        fan_favorite:"No",
        recommendation: "N/A",
        flavors: ["Coca-Cola","Mr.Pibb", "Sprite", "Dr.Pepper"],
        img: "images/soda.jpg"
    };
    beverages[5]={
        title :"Celsius",
        hot_or_iced:"Iced",
        price:"$3.00",
        fan_favorite:"Yes",
        recommendation: "Raspberry Acai Green Tea Flavor",
        flavors: ["Raspberry Acai Green Tea","Kiwi Guava", "Berry", "Orange"],
        img: "images/celsius.jpg"
    };
      
    res.json(beverages);
  });

app.listen(3000, ()=>{
    console.log("working!");

});