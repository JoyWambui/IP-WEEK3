var pizzasOrdered = [];
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
Pizza.prototype.prices =function(){
  let size = this.pizzaSize;
  let cheeseToppings = this.cheeses.length;
  let meatToppings = this.meats.length;
  let veggieToppings = this.vegetables.length;
  let sauceToppings = this.sauces.length;
  //checking working of function
  //console.log(size, cheeseToppings, meatToppings, veggieToppings, sauceToppings);

  if(size === "Small"){
    let smallPrice = 50;
    let smallCrust = 30;
    return  parseInt(( smallPrice + smallCrust +  (cheeseToppings*80) + (meatToppings*50) + (veggieToppings*30) + (sauceToppings*35)));
  }else if(size === "Medium"){
    let mediumPrice = 100;
    let mediumCrust =50;
    return parseInt(( mediumPrice + mdeiumCrust +  (cheeseToppings*100) + (meatToppings*80) + (veggieToppings*60) + (sauceToppings*70)));
  }else if(size === "Large"){
    let largePrice = 150;
    let largeCrust = 70;
    return parseInt((largePrice + largeCrust + (cheeseToppings*150) + (meatToppings*130) + (veggieToppings*80) + (sauceToppings*100)));
  }
}


//user interface logic
$(document).ready(function(){
  console.log("ready");
  function addPizzas(newPizza){
    pizzasOrdered.push(newPizza)
  }

  $("#deliverOption").click(function(){
    $("#address").show();
    $("#addAddress").show();
  
  });
  $("#pick").click(function(){
    $("#address").hide();
    $("#addAddress").hide();
  });
  $("#addAddress").click(function(){
    alert("Your order will be delivered to your address. Delivery is free!");
    $("#address").hide();
    $(this).hide();
  })


  $("#pizzaForm").submit(function(event){
    event.preventDefault();
    let selectSize = document.getElementById("sizeOptions").value;
    console.log(selectSize);
    let selectCrust = document.getElementById("crustOptions").value;
    console.log(selectCrust);
    var newPizza = new Pizza(selectSize,selectCrust);

    $("#cheeseSelection").each(function(){
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
          console.log(sauces);
        }
    });
      //console.log(newPizza);
    addPizzas(newPizza);
    $("#anotherPizza").unbind().show();
    $("#checkOut").show();
    $("#checkOut").unbind().click(function(event){
      event.preventDefault();
      let totals = [];

      for (var i = 0; i < pizzasOrdered.length; i++) {
        totals.push(pizzasOrdered[i].prices());
        console.log(totals);
      }
      sum = totals.reduce((a, b) => {
        return a+b;
      });
      console.log(sum);
      $("#anotherPizza").hide();
      $("#orderSummary").show();
      for (var i = 0; i < pizzasOrdered.length; i++) {
        if(i>0){$("#showOrder").append("<p>and</p>");}
        $("#showOrder").append("<p>A " + pizzasOrdered[i].pizzaSize + " pizza with a " + 
                              pizzasOrdered[i].crustType + " crust with the following toppings: " + 
                              pizzasOrdered[i].cheeses +" " + pizzasOrdered[i].meats + " " + pizzasOrdered[i].vegetables +
                                " " + pizzasOrdered[i].sauces + "<br>" + "Your total is: Ksh." + pizzasOrdered[i].prices(i) + "</p><br>" 
                                //"<h3 class='text-center'>Sum Total: " +"<strong>" + "Ksh." + sum + "</strong></h3>"
                              );
      };
      $("#showOrder").append("<br><h3>Sum Total: " +"<strong>" + "Ksh." + sum +"</strong></h3>");
      $("#showOrder")[0].scrollIntoView();
    });
    var resetForm = document.getElementById("pizzaForm");
    resetForm.reset();
      console.log(pizzasOrdered);
      //check cheese function
    //console.log(newPizza.displayOrder());
    console.log(newPizza.prices());
  });
});
