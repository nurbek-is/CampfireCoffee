var hrsOpen =["6 am", "7 am", "8 am","9 am","10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm", "7 pm", "8 pm"]
var PikePlace = {
  name: 'PikePlace',
  min:14,
  max:35,
  average:1.2,
  toGoPound: 0.34,

  totalCustomers:0,
  totalCupSales: 0,
  dailyPoundSale:0,
  hrlyPound:0,
  totalCustomers:0;
  totalCups:0;

  hourlyCust: [],
  poundSaleHour:[],
  cupSales:[],

  getRandom: function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min);
}
// This calculates average customers per hour
hourlySales: function () {
  for (cust in hrsOpen)     {
  this.hourlyCust.push(Math.floor(this.getRandom(this.min, this.max)* this.average));
  this.totalCustomers+= this.hourlyCust[cust];
  }
},

// This calculates coffee cups sale per hour
hourlySales: function () {
  for (hour in hrsOpen)    /* same as (i=0; i < hrsOpen.length; i++)*/ {
  this.cupSales.push(Math.floor(this.getRandom(this.min, this.max)* this.average));
  this.totalCupSales+= this.cupSales[hour]; /*same as (this.totalCupSales +=this.cupSales[i];) */
  }
},

//this calculates to Go Pound sale per hour
hourlySales: function () {
  for (hour in hrsOpen)
  this.poundSaleHour.push(Math.floor(this.getRandom(this.min, this.max)* this.average));
  this.dailyPoundSale+=this.poundSaleHour [hour];
}
// This prints the lists to the page
render: function () {
  this.hourlySales ();
  var sectionEl = document.getElementById('pikePlaceSales');
  sectionEl.textContent=this.name;
  var ulEl=document.createElement ('ul')
}



}
