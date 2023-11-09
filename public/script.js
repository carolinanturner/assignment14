//Carolina Turner CSCE 242
const getJSON = async ()=>{
    try{
        let response = await fetch("https://node-project1-8gtg.onrender.com/api/beverages");
       return await response.json();
    }   catch (error){
    console.log("could not retrieve json");
    return "";
    }
}

const showBeverages = async () => {
const beverageJSON = await getJSON();
    if(beverageJSON == ""){
        return ;
    }
    let beverageDiv= document.getElementById("beverages-list");

    beverageJSON.forEach((beverage)=>{
        let section = document.createElement("section");
        beverageDiv.append(section);
        let title=beverage.title;

        let h3=document.createElement("h3");
        section.append(h3);
        h3.innerHTML = beverage.title;

        let img = document.createElement("img");
        section.append(img);
        img.src="https://node-project1-8gtg.onrender.com/" + beverage.img;

        let ul = document.createElement("ul");
        section.append(ul);
        ul.append(getLi(`Hot or Iced: ${beverage.hot_or_iced}`));
        ul.append(getLi(`Price ${beverage.price}`));
        ul.append(getLi(`Fan Favorite?: ${beverage.fan_favorite}`));
        ul.append(getLi(`We recommend trying: ${beverage. recommendation}`));
        ul.append(getLi(`Available Flavors (updated daily) ${beverage.flavors}`));
        section.classList.add("beverage");
    
        return section;
    
    });
}
 // get 
const getLi = data=>{
    const li =document.createElement("li");
    li.textContent= data;
    return li;
}

window.onload = () =>{
    showBeverages();
};