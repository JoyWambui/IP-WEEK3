function Pizza(size, crust){
  this.pizzaSize = size;
  this.crustType = crust;
  this.cheeses = [];
  this.meats = [];
  this.vegetables = [];
  this.sauces = [];
}
$(document).ready(function(){
  console.log("ready");
 $("#pizzaForm").submit(function(event){
   event.preventDefault();
   let selectSize = document.getElementById("sizeOptions").value;
   console.log(selectSize);
 });
});