//Carolina Turner CSCE 242
const getBeverages= async ()=>{
    try{
        return (await fetch("https://assignment14.onrender.com/api/beverages")).json();
    }   catch(error){
        console.log(error);
        return "";
    }
}

const showBeverages = async () => {
    let beverages=await getBeverages();
    let beveragesDiv = document.getElementById("beverages-list");
    beveragesDiv.innerHTML="";
    beverages.forEach((beverage)=>{
        const section = document.createElement("section");
        section.classList.add("beverage");
        beveragesDiv.append(section);

        const a = document.createElement("a");
        a.href = "#";
        section.append(a);

        const h3 = document.createElement("h3");
        h3.innerHTML = beverage.title;
        a.append(h3);

        a.onclick = (e) => {
            e.preventDefault();
            displayDetails(beverage);
        };
    });
};

const displayDetails = (beverage) => {
  const beverageDetails = document.getElementById("beverage-details");
  beverageDetails.innerHTML = "";

  const h3 = document.createElement("h3");
  h3.innerHTML = beverage.title;
  beverageDetails.append(h3);

  const dLink = document.createElement("a");
  dLink.innerHTML = "	&#x2715;";
  beverageDetails.append(dLink);
  dLink.id = "delete-link";

  const eLink = document.createElement("a");
  eLink.innerHTML = "&#9998;";
  beverageDetails.append(eLink);
  eLink.id = "edit-link";
  
  const priceP = document.createElement("p");
  beverageDetails.append(priceP);
  priceP.innerHTML = "Price:  "+beverage.price;

  const hot_or_icedP = document.createElement("p");
  beverageDetails.append(hot_or_icedP);
  hot_or_icedP.innerHTML ="Hot or Iced?  " +beverage.hot_or_iced;

  const flavorsP = document.createElement("p");
  beverageDetails.append(flavorsP);
  flavorsP.innerHTML = "Flavors:  " +beverage.flavors;

  const fan_favoriteP = document.createElement("p");
  beverageDetails.append(fan_favoriteP);
  fan_favoriteP.innerHTML ="Fan Favorite?  " + beverage.fan_favorite;

  const recommendationsP = document.createElement("p");
  beverageDetails.append(recommendationsP);
  recommendationsP.innerHTML = "Recommendations:  "+beverage.recommendation;
  
 
    eLink.onclick = (e) => {
    e.preventDefault();
    document.querySelector(".dialog").classList.remove("transparent");
    document.getElementById("modal-background").classList.remove("hidden");
    document.getElementById("add-edit-title").innerHTML = "Edit Beverage";
  };

  dLink.onclick = (e) => {
    e.preventDefault();
    deleteBeverage(beverage.beverageTitle);
  };

  populateEditForm(beverage);
};

  
  const populateEditForm = (beverage) => {
    const form = document.getElementById("add-edit-beverage-form");
    form.beverageId.value=beverage.beverageId,
    form.beverageTitle.value = beverage.beverageTitle;
    form.hot_or_iced.value = beverage.hot_or_iced;
    form.price.value = beverage.price;
  
    const flavorsP = document.getElementById("flavors-boxes");
    flavorsP.innerHTML = "";
    console.log(beverage.flavors);

    const recommendationsP = document.getElementById("recommendation-boxes");
    recommendationsP.innerHTML = "";
    console.log(beverage.recommendation);

  };

  const addEditBeverage = async (e) => {
    e.preventDefault();
  
    const form = document.getElementById("add-edit-beverage-form");
    const formData = new FormData(form);
    formData.append("flavors", getFlavors());
    console.log(...formData);
    let response;

    //if is new beverage
    if (form.beverageId.value==-1){
        formData.delete("beverageId");
        formData.delete("img");

        response = await fetch("/api/beverages", {
            method : "POST",
            body : formData,
        });
    }
    else {
      console.log("editting");
      response = await fetch(`/api/beverages/${form.beverageId.value}`, {
        method: "PUT",
        body: formData,
      });
    }
    
    if(response.status != 200){
      console.log("Error contacting server!");
      return;
  }
  document.querySelector(".dialog").classList.add("transparent");
  resetForm();
  showBeverages();
    
    let result = await response.json(); 
    if (form.beverageId.value != -1) {
      const beverage = await getBeverage(form.beverageId.value);
      displayDetails(beverage);
  
};
}


const getFlavors = () => {
  const inputs = document.querySelectorAll("#flavor-boxes input");
  const flavors = [];

  inputs.forEach((input) => {
    flavors.push(input.value);
  });
  console.log(flavors);
  return flavors;
};

  const resetForm = () => {
    const form = document.getElementById("add-edit-beverage-form");
    form.reset();
    form.beverageTitleitle = "Null";
  };
  const showHideAdd = (e) => {
    e.preventDefault();
    document.querySelector(".dialog").classList.remove("transparent");
    document.getElementById("add-edit-title").innerHTML = "Add Beverage";
    resetForm();
  };
//creates input boxes
  const addFlavors = (e) => {
    e.preventDefault();
    console.log("adding flavor");//test to see if works
    const flavor_boxes = document.getElementById("flavors-boxes");
    const input = document.createElement("input");
    input.type = "text";
    flavor_boxes.append(input);
  };
//creates input boxes
  const addRecommendation = (e) => {
    e.preventDefault();
    console.log("adding recommendation");
    const recommendation_boxes = document.getElementById("recommendation-boxes");
    const input = document.createElement("input");
    input.type = "text";
    recommendation_boxes.append(input);
  };

window.onload = () => {
    showBeverages();
    document.getElementById("add-edit-beverage-form").onsubmit = addEditBeverage;
    document.getElementById("add-link").onclick = showHideAdd;
    document.getElementById("add-flavor").onclick = addFlavors;
    document.getElementById("add-recommendation").onclick = addRecommendation;
  
    document.querySelector(".close").onclick = () => {
      document.querySelector(".dialog").classList.add("transparent");
    };
  };
