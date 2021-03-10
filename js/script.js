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
    return parseInt(( mediumPrice + mediumCrust +  (cheeseToppings*100) + (meatToppings*80) + (veggieToppings*60) + (sauceToppings*70)));
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
    if($("#city").val()===''){
      $("#cityError")[0].style.display ="block";
      return false;
    }else {
      $("#cityError")[0].style.display ="none";
    }
    if($("#street").val()===''){
      $("#streetError")[0].style.display ="block";
      return false;
    }else {
      $("#streetError")[0].style.display ="none";

    }
    if($("#residence").val()===''){
      $("#residenceError")[0].style.display ="block";
      return false;
    }else{
      $("#residenceError")[0].style.display ="none";

    }
    var inputCity = $("#city").val();
    var inputStreet =$("#street").val();
    var inputResidence =$("#residence").val();
    $("#address").hide();
    $(this).hide();
    $("#deliveryMessage").append("<h5>Thank you! Your order will be delivered to " + inputResidence + " ," + inputStreet + " ," + inputCity + " for Ksh.150 after you check out</h5>");
  });


  $("#pizzaForm").submit(function(event){
    event.preventDefault();
    let selectSize = document.getElementById("sizeOptions").value;
    //console.log(selectSize);
    let selectCrust = document.getElementById("crustOptions").value;
    //console.log(selectCrust);
    let deliveryCheck = document.getElementById("deliverOption").checked;
    console.log(deliveryCheck);
    if(selectSize === 'Choose'){
      $("#sizeError")[0].style.display ="block";
      $("#cheeseScroll")[0].scrollIntoView(); 
      return false;
    }else {
      $("#sizeError")[0].style.display ="none";      
    }
    
    if(selectCrust === 'Choose'){
      $("#crustError")[0].style.display = "block"; 
      $("#crustScroll")[0].scrollIntoView(); 
      return false;
    } else{
      $("#crustError")[0].style.display = "none";  
    }

    var cheeseChecked = $("#pizzaForm input[name='cheese']:checked").length;
    var cheeseValid = cheeseChecked > 0 ;
    if(cheeseValid === false){
      $("#cheeseError")[0].style.display ="block"; 
      $("#cheeseSelection")[0].scrollIntoView(); 
      return false;
    }else{
      $("#cheeseError")[0].style.display = "none"; 
    }
    var meatChecked = $("#pizzaForm input[name='meat']:checked").length;
    var meatValid = meatChecked > 0 ;
    if(meatValid === false){
      $("#meatError")[0].style.display ="block"; 
      return false;
    }else{
      $("#meatError")[0].style.display = "none"; 
    }
    var veggieChecked = $("#pizzaForm input[name='veggies']:checked").length;
    var veggieValid = veggieChecked > 0 ;
    if(veggieValid === false){
      $("#veggieError")[0].style.display ="block"; 
      return false;
    }else{
      $("#veggieError")[0].style.display = "none"; 
    }
    var sauceChecked = $("#pizzaForm input[name='sauce']:checked").length;
    var sauceValid = sauceChecked > 0 ;
    if(sauceValid === false){
      $("#sauceError")[0].style.display ="block"; 
      return false;
    }else{
      $("#sauceError")[0].style.display = "none"; 
    }
    var deliveryOption = $("#pizzaForm input[type=radio]:checked").length>0;
    if(deliveryOption === false){
      $("#deliveryError")[0].style.display = "block"; 
       return false;
    }else{
      $("#deliveryError")[0].style.display = "none"; 

    }

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
        return (a+b);
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
      if(deliveryCheck===false){
        $("#showOrder").append("<br><h3>Sum Total: " +"<strong>" + "Ksh." + sum +"</strong></h3>");
        $("#showOrder")[0].scrollIntoView();  
      }else if(deliveryCheck===true){
        $("#showOrder").append("<br><h3>Sum Total: " +"<strong>" + "Ksh." + (sum+150) + "(delivery fee included)</strong></h3>");
        $("#showOrder")[0].scrollIntoView();
  
      }
    });
    var resetForm = document.getElementById("pizzaForm");
    resetForm.reset();
      console.log(pizzasOrdered);
      //check cheese function
    //console.log(newPizza.displayOrder());
    console.log(newPizza.prices());
  });
});
