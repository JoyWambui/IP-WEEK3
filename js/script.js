//business logic
function Pizza(pizzaSize, crustType){
  this.pizzaSize = pizzaSize;
  this.crustType = crustType;
  this.cheeses = [];
  this.meats = [];
  this.vegetables = [];
  this.sauces = [];
  this.displayOrder = function(){
    return this.pizzaSize + " " + this.crustType + " " + this.cheeses + " " + this.meats + " " + this.vegetables + " " + this.sauces 
  };
}
Pizza.prototype.addCheese = function(cheese){
  return this.cheeses.push(cheese);
}  
Pizza.prototype.addMeat = function(meat){
  return this.meats.push(meat);
}
Pizza.prototype.addVeggies = function(veggies){
  return this.vegetables.push(veggies);
}
Pizza.prototype.addSauce = function(sauce){
  return this.sauces.push(sauce);
}

//user interface logic
$(document).ready(function(){
  console.log("ready");
 $("#pizzaForm").submit(function(event){
   event.preventDefault();

    let pizzaSize = document.getElementById("sizeOptions").value;
    console.log(pizzaSize);
    let crustType = document.getElementById("crustOptions").value;
    console.log(crustType);
    let newPizza = new Pizza(pizzaSize, crustType);
    console.log(newPizza);
    $(".cheeseSelection").each(function(){
      let cheeses = []
      let selectCheese = document.getElementsByName("cheese");
      for(var i = 0; i < selectCheese.length; i++){
        if(selectCheese[i].checked){
          cheeses.push(selectCheese[i].value)
        }
      }
      for(var i = 0; i < cheeses.length; i++){
        newPizza.addCheese(cheeses[i])
      }
      //check cheese function
        console.log(cheeses);
    });
    $(".meatSelection").each(function(){
      let meats = []
      let selectMeat = document.getElementsByName("meat");
      for(var i = 0; i < selectMeat.length; i++){
        if(selectMeat[i].checked){
          meats.push(selectMeat[i].value)
        }
      }
      for(var i = 0; i < meats.length; i++){
        newPizza.addMeat(meats[i])
      }
      //check cheese function
        console.log(meats);
    });
    $(".veggiesSelection").each(function(){
      let vegetables = []
      let selectVeggies = document.getElementsByName("veggies");
      for(var i = 0; i < selectVeggies.length; i++){
        if(selectVeggies[i].checked){
          vegetables.push(selectVeggies[i].value)
        }
      }
      for(var i = 0; i < vegetables.length; i++){
        newPizza.addVeggies(vegetables[i])
      }
      //check cheese function
        console.log(vegetables);
    });
    $(".sauceSelection").each(function(){
      let sauces = []
      let selectSauce = document.getElementsByName("sauce");
      for(var i = 0; i < selectSauce.length; i++){
        if(selectSauce[i].checked){
          sauces.push(selectSauce[i].value)
        }
      }
      for(var i = 0; i < sauces.length; i++){
        newPizza.addSauce(sauces[i])
      }
      //check cheese function
        console.log(sauces);
    });
    console.log(newPizza.displayOrder());
  });
});