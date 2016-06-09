var hrsOpen =["6 am", "7 am", "8 am","9 am","10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm", "7 pm", "8 pm"]
var pikePlace = {
  name: 'PikePlace',
  min:14,
  max:35,
  average:1.2,
  toGoPound: 0.34,

  totalCustomers:0,
  totalCupSales: 0,
  dailyPoundSale:0,
  hrlyPound:0,

  hourlyCust: [],
  cupSalePerHr:[],
  poundSaleHour:[],
  cupsPerPound:[],
  employeeRequired:[],
  totalPoundsPerHr:[]

  getRandom: function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min);
}
// This calculates average customers per hour
  averageCustomerPerHour: function () {
    for (cust in hrsOpen)     {
    this.hourlyCust.push(Math.floor(this.getRandom(this.min, this.max)* this.average));
    this.totalCustomers+= this.hourlyCust[cust];
  }
},

// This calculates coffee cups sale per hour
getCupSalePerHour: function () {
  for (hour in hrsOpen)    /* same as (i=0; i < hrsOpen.length; i++)*/ {
  this.cupSalePerHr.push(Math.floor(this.getRandom(this.min, this.max)* this.average));
  this.totalCupSales+= this.cupSalePerHr[hour]; /*same as (this.totalCupSales +=this.cupSalePerHr[i];) */

// this calculates  total pound in terms of cups
  cupsInPounds = (Math.floor((this.totalCupSales[hour]* this.average)/16));
  this.cupsPerPound.push (cupsInPounds);
  }
},

//this calculates to Go Pound sale per hour
getPoundSalePerHour: function () {
  for (hour in hrsOpen) {
  this.poundSaleHour.push(Math.floor(this.getRandom(this.min, this.max)* this.average));
  this.dailyPoundSale+=this.poundSaleHour [hour];
}
},

//this calculates Total Coffee Pound sale per hour
getTotalPoundSalePerHour: function () {
  for (hour in hrsOpen) {
  var totalHrlyPounds= (Math.floor (this.poundSaleHour[hour] + this.cupsPerPound [hour]) * this.average));
  this.totalPoundsPerHr.push (totalHrlyPounds);
  this.dailyPoundSale+=totalHrlyPounds;
  }
},

// This prints the lists to the page
render: function () {
  this.hourlySales ();
  this.averageCustomerPerHour ();
  this.getCupSalePerHour ();
  this.getPoundSalePerHour();
  this.getTotalPoundSalePerHour ();
  var sectionEl = document.getElementById('pikePlaceSales');
  sectionEl.textContent=this.name;
  var ulEl=document.createElement ('ul')
  }
// This creates li for each hrsOpen and appends it to the ul we created above
for (hour in hrsOpen)
var liEL=document.createElement ('li');
liEL.textContent=hrsOpen [hour] + ': ' + this.totalPoundsPerHr [hour] + 'lbs [' + this.averageCustomerPerHour [hour] + 'customers' + this.totalCupSales [hour] + "cups (" + this.cupSalePerHr [hour] + ' cups (' + this.cupsPerPound [value] + " lbs), " + hr 


}
