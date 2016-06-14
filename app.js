var hrsOpen = ["6 am", "7 am", "8 am","9 am","10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm", "7 pm", "8 pm"];
var allShops = [];
var allShopsDailyLbs = 0;
var allShopsHourlyLbs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function Shop (min, max, name,average,toGoPound, hours) {
 this.min = min;
 this.max = max;
 this.name = name;
 this.average = average;
 this.toGoPound = toGoPound;
 this.hours = hours;
 this.totalCupSales = 0;
 this.totalCustomers = 0;
 this.hrlyPound = 0;
 this.dailyPoundSale = 0;
 this.cupSalePerHr =[];
 this.hourlyCust = [];
 this.packageLbsPerHour =[];
 this.employeeRequired =[];
 this.totalPoundsPerHr =[];
 this.cupsPerPound =[];
 allShops.push (this);
}

Shop.prototype.getRandom = function(min, max) {
  return(Math.floor(Math.random() * (max - min + 1)) + min);
}

Shop.prototype.averageCustomerPerHour = function () {
    for (cust in hrsOpen)     {
      var myCustomers= Math.round(this.getRandom(this.min, this.max)*10)/10;
      this.hourlyCust.push (myCustomers);

      this.totalCustomers+= this.hourlyCust[cust];
  }
};
//This calculates coffee cupSalePerHr per hours
Shop.prototype.hourlySales = function () {
  for (hour in this.hourlyCust)    {
  var cupSalePerHr = Math.round((this.hourlyCust[hour] * this.average)*10)/10;
  //console.log (cupSalePerHr);
  this.cupSalePerHr.push(cupSalePerHr);
  this.totalCupSales+= this.cupSalePerHr[hour]; /*same as (this.totalCupSales +=this.cupSalePerHr[i];) */

  // this calculates  total pounds in terms of cups
  var cupsInPounds = Math.round((this.cupSalePerHr[hour]/16)*10)/10;
  this.cupsPerPound.push (cupsInPounds);

  // this calculates to Go Pound sale per hour
  packageLbsPerHour = Math.round((this.hourlyCust[hour] * this.toGoPound) * 10)/10;
  this.packageLbsPerHour.push(packageLbsPerHour); ///  there is some bug in these lines
  this.hrlyPound+=packageLbsPerHour;
  }
  //this.packageLbsPerHour=Math.round(this.packageLbsPerHour);
  this.totalCupSales = Math.round(this.totalCupSales);
};
//this calculates Total Coffee Pound sale per hour
Shop.prototype.getTotalPoundSalePerHour = function () {
  for (hour in hrsOpen) {
    var totalHrlyPounds = Math.round (((this.packageLbsPerHour[hour] + this.cupsPerPound [hour])*10)/10);
    this.totalPoundsPerHr.push (totalHrlyPounds);
    this.dailyPoundSale+=totalHrlyPounds;
  }
    this.dailyPoundSale = Math.round(this.dailyPoundSale)
};
Shop.prototype.getEmployeesPerHour = function() {
  for (idx in hrsOpen) {
    var employees = Math.ceil(this.hourlyCust[idx] / 30);
    this.employeeRequired.push(employees);
    }
  };

Shop.prototype.doAllTheMethods = function() {
  this.averageCustomerPerHour ();
  this.hourlySales();
  this.getTotalPoundSalePerHour ();
  this.getEmployeesPerHour ();
};

var pikePlace = new Shop (14, 35, "Pike Place",1.2, .34);
var capitolHill = new Shop (12, 28, "Capitol Hill",3.2, .03);
var seattlePublicLibrary = new Shop (9, 45, 'Seattle Public Library',2.6, .02);
var southLakeUnion = new Shop (5, 18, 'South Lake Union', 1.3, .04);
var seaTacAirport = new Shop (28, 44, 'Sea-Tac Airport', 1.1, .41);

 pikePlace.doAllTheMethods ();
 capitolHill.doAllTheMethods ();
 seattlePublicLibrary.doAllTheMethods ();
 southLakeUnion.doAllTheMethods ();
 seaTacAirport.doAllTheMethods ();

////////////////////////////////
// makes h1 tag for a table  main
function createTableTitle(textContent) {
  var center = document.getElementById('center');
  var headTag = document.createElement('h1');
  headTag.textContent = textContent;
  center.appendChild(headTag);
}

// create function that will make table
function createTable(tableId) {
  var center = document.getElementById('center');
  var table = document.createElement('table');
  table.id = tableId;
  center.appendChild(table);
};

// create function to make table header row
function createHeaderRow(tableId, textContent) {
  var table = document.getElementById(tableId);
  var header = document.createElement('tr');
  header.id = 'rowHeader';
  table.appendChild(header);        // make table header row
  hours.unshift(textContent);
  hours.unshift('');
  for (index in hours) {
    data = document.createElement('td');
    data.textContent = hours[index];
    header.appendChild(data);      // append each hour to a new cell
  }
  hours.shift();
  hours.shift();
};

function createCoffeeRow(tableId, object) {
  var table = document.getElementById(tableId);
  var row = document.createElement('tr');
  object.totalPoundsPerHr.unshift(Math.round(object.dailyPoundSale * 10) / 10);
  object.totalPoundsPerHr.unshift(object.name);
  for (var index in object.totalPoundsPerHr) {
    var cell = document.createElement('td');
    cell.textContent = object.totalPoundsPerHr[index];
    row.appendChild(cell);
  }
  table.appendChild(row);
};

function createCoffeeTotalsRow() {
  var table = document.getElementById('coffeeTable');
  var row = document.createElement('tr');
  var cell = document.createElement('td');
  cell.textContent = 'Totals';
  row.appendChild(cell);
  allShopsHourlyLbs.unshift(Math.round(allShopsDailyLbs * 10) / 10);
  for (var index in allShopsHourlyLbs) {
    cell = document.createElement('td');
    cell.textContent = Math.round(allShopsHourlyLbs[index] * 10) / 10;
    row.appendChild(cell);
  }
  table.appendChild(row);
}

function createEmployeeRow(tableId, object) {
  var table = document.getElementById(tableId);
  var row = document.createElement('tr');
  object.employeeRequired.unshift(Math.ceil(object.dailyEmploy));
  object.employeeRequired.unshift(object.name);
  for (var index in object.employeeRequired) {
    cell = document.createElement('td');
    cell.textContent = object.employeeRequired[index];
    row.appendChild(cell);
  }
  table.appendChild(row);
};

function createEmployTotalsRow() {
  var table = document.getElementById('employeeTable');
  var row = document.createElement('tr');
  var cell = document.createElement('td');
  cell.textContent = 'Totals';
  row.appendChild(cell);
  cell = document.createElement('td');
  cell.textContent = allStoresDailyEmploy;
  row.appendChild(cell);
  for (var index in allStoresHourlyEmploy) {
    cell = document.createElement('td');
    cell.textContent = Math.round(allStoresHourlyEmploy[index] * 10) / 10;
    row.appendChild(cell);
  }
  table.appendChild(row);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

///// create coffee table /////////////////
function makeCoffeeTable() {
  createTableTitle('Beans Needed By Location Each Day');
  createTable('coffeeTable'); //create empty table
  createHeaderRow('coffeeTable', 'Daily Location Total'); //create header row
  for (var index in allStores) {
    createCoffeeRow('coffeeTable', allStores[index]);
  }
  createCoffeeTotalsRow(); //create coffee table totals row
};

///// create employee table ////////////////
function makeEmployeeTable() {
  createTableTitle('Baristas Needed By Location Each Day');
  createTable('employeeTable');
  createHeaderRow('employeeTable', 'Total');
  for (var index in allStores) {
    createEmployeeRow('employeeTable', allStores[index]);
  }
  createEmployTotalsRow();
};

makeCoffeeTable();



// // makes h1 tag1 for a table
// function makeRow(obj) {
//   //make a row
// var tableH1 = document.getElementById('tablehtml');
//   var headerTag = document.createElement('h1');
//   row.textContent = obj;
//   tableh1.appendChild (headerTag);
// };
// makeRow('obj');
//
// // create function that will make table
//
// function maketableHeader(tableid) {
//   var htmlid = document.getElementById('tablehtml');
//   var table = document.createElement ('table')
//   table.id = tableid;
//   htmlid.appendChild(table);
// };
// maketableHeader('row');





//   //REPEAT THIS PART
//     //make a cell
//     var cell = document.createElement('td');
//     //give content to cell
//     cell.textContent = obj.name;
//     //append cell to the row
//     row.appendChild(cell);
//
//   //append row to the table
//   table.appendChild(row);
// }
//
// makeRow(socks);
//
//   //pikePlace.getEmployeesPerHour ();
// // pikePlace.getTotalPoundSalePerHour ();
// //pikePlace.hourlySales ();
// //pikePlace.averageCustomerPerHour ();
//
//
// // var pikePlace = {
// //   hrsOpen: ["6 am", "7 am", "8 am","9 am","10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm", "7 pm", "8 pm"],
// //   name: "Pike Place",
// //   min:14,
// //   max:35,
// //   average:1.2,
// //   toGoPound: .34,
// //
// //   totalCupSales: 0,
// //   totalCustomers:0,
// //   hrlyPound:0,
// //   dailyPoundSale:0,
// //
// //   cupSalePerHr:[],
// //   hourlyCust: [],
// //   packageLbsPerHour:[],
//   employeeRequired:[],
//   totalPoundsPerHr:[],
//   cupsPerPound:[],
//
//   // This generates a random number of customers between min and max
//
//   getRandom: function(min, max) {
//   return(Math.floor(Math.random() * (max - min + 1)) + min);
// },
// // This calculates average customers per hour
//   averageCustomerPerHour: function () {
//     for (cust in this.hrsOpen)     {
//       var myCustomers= Math.round(this.getRandom(this.min, this.max)*10)/10;
//       this.hourlyCust.push (myCustomers);
//
//       this.totalCustomers+= this.hourlyCust[cust];
//   }
// },
// // This calculates coffee cupSalePerHr per hours
// hourlySales: function () {
//   for (hour in this.hourlyCust)    /* same as (i=0; i < this.hrsOpen.length; i++)*/ {
//   var cupSalePerHr=Math.round((this.hourlyCust[hour] * this.average)*10)/10;
//   //console.log (cupSalePerHr);
//   this.cupSalePerHr.push(cupSalePerHr);
//   this.totalCupSales+= this.cupSalePerHr[hour]; /*same as (this.totalCupSales +=this.cupSalePerHr[i];) */
//
//   // this calculates  total pounds in terms of cups
//   var cupsInPounds = Math.round((this.cupSalePerHr[hour]/16)*10)/10;
//   this.cupsPerPound.push (cupsInPounds);
//
//   // this calculates to Go Pound sale per hour
//   packageLbsPerHour = Math.round((this.hourlyCust[hour] * this.toGoPound) * 10)/10;
//   this.packageLbsPerHour.push(packageLbsPerHour); ///  there is some bug in these lines
//   this.hrlyPound+=packageLbsPerHour;
//   }
//   //this.packageLbsPerHour=Math.round(this.packageLbsPerHour);
//   this.totalCupSales = Math.round(this.totalCupSales);
// },
// //this calculates Total Coffee Pound sale per hour
// getTotalPoundSalePerHour: function () {
//   for (hour in this.hrsOpen) {
//     var totalHrlyPounds = Math.round (Math.round ((this.packageLbsPerHour[hour] + this.cupsPerPound [hour])*10)/10*10)/10;
//     this.totalPoundsPerHr.push (totalHrlyPounds);   ///  there is some bug in these lines
//     this.dailyPoundSale+=totalHrlyPounds;
//   }
//    this.dailyPoundSale = Math.round(this.dailyPoundSale)
// },
//
// getEmployeesPerHour:  function() {
//     for (idx in this.hrsOpen) {
//       var employees = Math.ceil(this.hourlyCust[idx] / 30);
//       this.employeeRequired.push(employees);
//     }
//   },
//
// //This prints the lists to the page
// render: function () {
//   this.averageCustomerPerHour ();
//   this.hourlySales ();
//   this.getTotalPoundSalePerHour ();
//   this.getEmployeesPerHour ();
//   var sectionEl = document.getElementById('pikePlaceSales');
//   sectionEl.textContent = this.name;
//   var ulEl = document.createElement ('ul');
//
// // this creates li for each this.hrsOpen and appends it to the ul we created above
// for (hour in this.hrsOpen) {
//   var liEl = document.createElement ('li');
//   liEl.textContent = this.hrsOpen [hour] + ": " + this.totalPoundsPerHr [hour] + ' lbs [' + this.hourlyCust [hour] + ' customers, ' + this.cupSalePerHr[hour] +
//   ' cups'+ " ( " + this.cupsPerPound [hour] + " lbs), " + this.packageLbsPerHour [hour] +  " lbs to-go]";
//   ulEl.appendChild (liEl);
// }
// // this creates and li for totalCupSales and appends it to the ul created above
// //then appends it to the existing section withing our HTML.
// liEl = document.createElement('li');
// liEl.textContent = 'Total customers at Pike Place Market: ' + this.totalCustomers
// ulEl.appendChild (liEl);
// sectionEl.appendChild(ulEl)
//
// liEl = document.createElement('li');
// liEl.textContent = "Total cups sold at Pike Place Market: " + this.totalCupSales;   //' Employee needed :' + this.employeeRequired;
// ulEl.appendChild (liEl);
// sectionEl.appendChild(ulEl)
//
// liEl = document.createElement('li');
// liEl.textContent = 'Total to-go pound packages sold at Pike Place Market: ' + this.hrlyPound
// ulEl.appendChild (liEl);
// sectionEl.appendChild(ulEl)
//
// liEl = document.createElement('li');
// liEl.textContent = 'Total pounds of beans needed at Pike Place Market: ' + this.dailyPoundSale
// ulEl.appendChild (liEl);
// sectionEl.appendChild(ulEl)
//
// }
// }
// pikePlace.render();

var capitolHillSales = {
  hrsOpen: ["6 am", "7 am", "8 am","9 am","10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm", "7 pm", "8 pm"],
  name: "Capitol Hill",
  min:14,
  max:35,
  average:1.2,
  toGoPound: .34,

  totalCupSales: 0,
  totalCustomers:0,
  hrlyPound:0,
  dailyPoundSale:0,

  cupSalePerHr:[],
  hourlyCust: [],
  packageLbsPerHour:[],
  employeeRequired:[],
  totalPoundsPerHr:[],
  cupsPerPound:[],

  // This generates a random number of customers between min and max

  getRandom: function(min, max) {
  return(Math.floor(Math.random() * (max - min + 1)) + min);
},
// This calculates average customers per hour
  averageCustomerPerHour: function () {
    for (cust in this.hrsOpen)     {
      var myCustomers= Math.round(this.getRandom(this.min, this.max)*10)/10;
      this.hourlyCust.push (myCustomers);

      this.totalCustomers+= this.hourlyCust[cust];
  }
},
// This calculates coffee cupSalePerHr per hours
hourlySales: function () {
  for (hour in this.hourlyCust)    /* same as (i=0; i < this.hrsOpen.length; i++)*/ {
  var cupSalePerHr=Math.round((this.hourlyCust[hour] * this.average)*10)/10;
  //console.log (cupSalePerHr);
  this.cupSalePerHr.push(cupSalePerHr);
  this.totalCupSales+= this.cupSalePerHr[hour]; /*same as (this.totalCupSales +=this.cupSalePerHr[i];) */

  // this calculates  total pounds in terms of cups
  var cupsInPounds = Math.round((this.cupSalePerHr[hour]/16)*10)/10;
  this.cupsPerPound.push (cupsInPounds);

  // this calculates to Go Pound sale per hour
  packageLbsPerHour = Math.round((this.hourlyCust[hour] * this.toGoPound) * 10)/10;
  this.packageLbsPerHour.push(packageLbsPerHour); ///  there is some bug in these lines
  this.hrlyPound+=packageLbsPerHour;
  }
  this.totalCupSales = Math.round(this.totalCupSales);
},
//this calculates Total Coffee Pound sale per hour
getTotalPoundSalePerHour: function () {
  for (hour in this.hrsOpen) {
    var totalHrlyPounds = Math.round (Math.round ((this.packageLbsPerHour[hour] + this.cupsPerPound [hour])*10)/10*10)/10;
    this.totalPoundsPerHr.push (totalHrlyPounds);   ///  there is some bug in these lines
    this.dailyPoundSale+=totalHrlyPounds;
  }
   this.dailyPoundSale = Math.round(this.dailyPoundSale)
},

getEmployeesPerHour:  function() {
    for (idx in this.hrsOpen) {
      var employees = Math.ceil(this.hourlyCust[idx] / 30);
      this.employeeRequired.push(employees);
    }
  },

//This prints the lists to the page
render: function () {
  this.averageCustomerPerHour ();
  this.hourlySales ();
  this.getTotalPoundSalePerHour ();
  this.getEmployeesPerHour ();
  var sectionEl = document.getElementById('capitolHillSales');
  sectionEl.textContent = this.name;
  var ulEl = document.createElement ('ul');

// this creates li for each this.hrsOpen and appends it to the ul we created above
for (hour in this.hrsOpen) {
  var liEl = document.createElement ('li');
  liEl.textContent = this.hrsOpen [hour] + ": " + this.totalPoundsPerHr [hour] + ' lbs [' + this.hourlyCust [hour] + ' customers, ' + this.cupSalePerHr[hour] +
  ' cups'+ " ( " + this.cupsPerPound [hour] + " lbs), " + this.packageLbsPerHour [hour] +  " lbs to-go]";
  ulEl.appendChild (liEl);
}
// this creates and li for totalCupSales and appends it to the ul created above
//then appends it to the existing section withing our HTML.
liEl = document.createElement('li');
liEl.textContent = 'Total customers at Capitol Hill Market: ' + this.totalCustomers
ulEl.appendChild (liEl);
sectionEl.appendChild(ulEl)

liEl = document.createElement('li');
liEl.textContent = "Total cups sold at Capitol Hill Market: " + this.totalCupSales;   //' Employee needed :' + this.employeeRequired;
ulEl.appendChild (liEl);
sectionEl.appendChild(ulEl)

liEl = document.createElement('li');
liEl.textContent = 'Total to-go pound packages sold at Capitol Hill Market: ' + this.hrlyPound
ulEl.appendChild (liEl);
sectionEl.appendChild(ulEl)

liEl = document.createElement('li');
liEl.textContent = 'Total pounds of beans needed at Capitol Hill Market: ' + this.dailyPoundSale
ulEl.appendChild (liEl);
sectionEl.appendChild(ulEl)

}
}
capitolHillSales.render();

/////////////////////


var seattlePublicLibrarySales = {
  hrsOpen: ["6 am", "7 am", "8 am","9 am","10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm", "7 pm", "8 pm"],
  name: "Seattle Public Library",
  min:14,
  max:35,
  average:1.2,
  toGoPound: .34,

  totalCupSales: 0,
  totalCustomers:0,
  hrlyPound:0,
  dailyPoundSale:0,

  cupSalePerHr:[],
  hourlyCust: [],
  packageLbsPerHour:[],
  employeeRequired:[],
  totalPoundsPerHr:[],
  cupsPerPound:[],

  // This generates a random number of customers between min and max

  getRandom: function(min, max) {
  return(Math.floor(Math.random() * (max - min + 1)) + min);
},
// This calculates average customers per hour
  averageCustomerPerHour: function () {
    for (cust in this.hrsOpen)     {
      var myCustomers= Math.round(this.getRandom(this.min, this.max)*10)/10;
      this.hourlyCust.push (myCustomers);

      this.totalCustomers+= this.hourlyCust[cust];
  }
},
// This calculates coffee cupSalePerHr per hours
hourlySales: function () {
  for (hour in this.hourlyCust)    /* same as (i=0; i < this.hrsOpen.length; i++)*/ {
  var cupSalePerHr=Math.round((this.hourlyCust[hour] * this.average)*10)/10;
  //console.log (cupSalePerHr);
  this.cupSalePerHr.push(cupSalePerHr);
  this.totalCupSales+= this.cupSalePerHr[hour]; /*same as (this.totalCupSales +=this.cupSalePerHr[i];) */

  // this calculates  total pounds in terms of cups
  var cupsInPounds = Math.round((this.cupSalePerHr[hour]/16)*10)/10;
  this.cupsPerPound.push (cupsInPounds);

  // this calculates to Go Pound sale per hour
  packageLbsPerHour = Math.round((this.hourlyCust[hour] * this.toGoPound) * 10)/10;
  this.packageLbsPerHour.push(packageLbsPerHour); ///  there is some bug in these lines
  this.hrlyPound+=packageLbsPerHour;
  }
  this.totalCupSales = Math.round(this.totalCupSales);
},
//this calculates Total Coffee Pound sale per hour
getTotalPoundSalePerHour: function () {
  for (hour in this.hrsOpen) {
    var totalHrlyPounds = Math.round ((this.packageLbsPerHour[hour] + this.cupsPerPound [hour])*10)/10;
    this.totalPoundsPerHr.push (totalHrlyPounds);   ///  there is some bug in these lines
    this.dailyPoundSale+=totalHrlyPounds;
  }
   this.dailyPoundSale = Math.round(this.dailyPoundSale)
},

getEmployeesPerHour:  function() {
    for (idx in this.hrsOpen) {
      var employees = Math.ceil(this.hourlyCust[idx] / 30);
      this.employeeRequired.push(employees);
    }
  },

//This prints the lists to the page
render: function () {
  this.averageCustomerPerHour ();
  this.hourlySales ();
  this.getTotalPoundSalePerHour ();
  this.getEmployeesPerHour ();
  var sectionEl = document.getElementById('seattlePublicLibrarySales');
  sectionEl.textContent = this.name;
  var ulEl = document.createElement ('ul');

// this creates li for each this.hrsOpen and appends it to the ul we created above
for (hour in this.hrsOpen) {
  var liEl = document.createElement ('li');
  liEl.textContent = this.hrsOpen [hour] + ": " + this.totalPoundsPerHr [hour] + ' lbs [' + this.hourlyCust [hour] + ' customers, ' + this.cupSalePerHr[hour] +
  ' cups'+ " ( " + this.cupsPerPound [hour] + " lbs), " + this.packageLbsPerHour [hour] +  " lbs to-go]";
  ulEl.appendChild (liEl);
}
// this creates and li for totalCupSales and appends it to the ul created above
//then appends it to the existing section withing our HTML.
liEl = document.createElement('li');
liEl.textContent = 'Total customers at Seattle Public Library Market: ' + this.totalCustomers
ulEl.appendChild (liEl);
sectionEl.appendChild(ulEl)

liEl = document.createElement('li');
liEl.textContent = "Total cups sold at Seattle Public Library Market: " + this.totalCupSales;   //' Employee needed :' + this.employeeRequired;
ulEl.appendChild (liEl);
sectionEl.appendChild(ulEl)

liEl = document.createElement('li');
liEl.textContent = 'Total to-go pound packages sold at Seattle Public Library Market: ' + this.hrlyPound
ulEl.appendChild (liEl);
sectionEl.appendChild(ulEl)

liEl = document.createElement('li');
liEl.textContent = 'Total pounds of beans needed at Seattle Public Library Market: ' + this.dailyPoundSale
ulEl.appendChild (liEl);
sectionEl.appendChild(ulEl)

}
}
seattlePublicLibrarySales.render();
/////////////////

var southLakeUnionSales = {
  hrsOpen: ["6 am", "7 am", "8 am","9 am","10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm", "7 pm", "8 pm"],
  name: "South Lake Union",
  min:14,
  max:35,
  average:1.2,
  toGoPound: .34,

  totalCupSales: 0,
  totalCustomers:0,
  hrlyPound:0,
  dailyPoundSale:0,

  cupSalePerHr:[],
  hourlyCust: [],
  packageLbsPerHour:[],
  employeeRequired:[],
  totalPoundsPerHr:[],
  cupsPerPound:[],

  // This generates a random number of customers between min and max

  getRandom: function(min, max) {
  return(Math.floor(Math.random() * (max - min + 1)) + min);
},
// This calculates average customers per hour
  averageCustomerPerHour: function () {
    for (cust in this.hrsOpen)     {
      var myCustomers= Math.round(this.getRandom(this.min, this.max)*10)/10;
      this.hourlyCust.push (myCustomers);

      this.totalCustomers+= this.hourlyCust[cust];
  }
},
// This calculates coffee cupSalePerHr per hours
hourlySales: function () {
  for (hour in this.hourlyCust)    /* same as (i=0; i < this.hrsOpen.length; i++)*/ {
  var cupSalePerHr=Math.round((this.hourlyCust[hour] * this.average)*10)/10;
  //console.log (cupSalePerHr);
  this.cupSalePerHr.push(cupSalePerHr);
  this.totalCupSales+= this.cupSalePerHr[hour]; /*same as (this.totalCupSales +=this.cupSalePerHr[i];) */

  // this calculates  total pounds in terms of cups
  var cupsInPounds = Math.round((this.cupSalePerHr[hour]/16)*10)/10;
  this.cupsPerPound.push (cupsInPounds);

  // this calculates to Go Pound sale per hour
  packageLbsPerHour = Math.round((this.hourlyCust[hour] * this.toGoPound) * 10)/10;
  this.packageLbsPerHour.push(packageLbsPerHour); ///  there is some bug in these lines
  this.hrlyPound+=packageLbsPerHour;
  }
  this.totalCupSales = Math.round(this.totalCupSales);
},
//this calculates Total Coffee Pound sale per hour
getTotalPoundSalePerHour: function () {
  for (hour in this.hrsOpen) {
    var totalHrlyPounds = Math.round ((this.packageLbsPerHour[hour] + this.cupsPerPound [hour])*10)/10;
    this.totalPoundsPerHr.push (totalHrlyPounds);   ///  there is some bug in these lines
    this.dailyPoundSale+=totalHrlyPounds;
  }
   this.dailyPoundSale = Math.round(this.dailyPoundSale)
},

getEmployeesPerHour:  function() {
    for (idx in this.hrsOpen) {
      var employees = Math.ceil(this.hourlyCust[idx] / 30);
      this.employeeRequired.push(employees);
    }
  },

//This prints the lists to the page
render: function () {
  this.averageCustomerPerHour ();
  this.hourlySales ();
  this.getTotalPoundSalePerHour ();
  this.getEmployeesPerHour ();
  var sectionEl = document.getElementById('southLakeUnionSales');
  sectionEl.textContent = this.name;
  var ulEl = document.createElement ('ul');

// this creates li for each this.hrsOpen and appends it to the ul we created above
for (hour in this.hrsOpen) {
  var liEl = document.createElement ('li');
  liEl.textContent = this.hrsOpen [hour] + ": " + this.totalPoundsPerHr [hour] + ' lbs [' + this.hourlyCust [hour] + ' customers, ' + this.cupSalePerHr[hour] +
  ' cups'+ " ( " + this.cupsPerPound [hour] + " lbs), " + this.packageLbsPerHour [hour] +  " lbs to-go]";
  ulEl.appendChild (liEl);
}
// this creates and li for totalCupSales and appends it to the ul created above
//then appends it to the existing section withing our HTML.
liEl = document.createElement('li');
liEl.textContent = 'Total customers at South Lake Union Market Sales: ' + this.totalCustomers
ulEl.appendChild (liEl);
sectionEl.appendChild(ulEl)

liEl = document.createElement('li');
liEl.textContent = "Total cups sold at South Lake Union Market Sales: " + this.totalCupSales;   //' Employee needed :' + this.employeeRequired;
ulEl.appendChild (liEl);
sectionEl.appendChild(ulEl)

liEl = document.createElement('li');
liEl.textContent = 'Total to-go pound packages sold at South Lake Union Market Sales: ' + this.hrlyPound
ulEl.appendChild (liEl);
sectionEl.appendChild(ulEl)

liEl = document.createElement('li');
liEl.textContent = 'Total pounds of beans needed at South Lake Union Market Sales: ' + this.dailyPoundSale
ulEl.appendChild (liEl);
sectionEl.appendChild(ulEl)

}
}
southLakeUnionSales.render();

var seaTacAirportSales = {
  hrsOpen: ["6 am", "7 am", "8 am","9 am","10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm", "7 pm", "8 pm"],
  name: "SeaTac Airport",
  min:14,
  max:35,
  average:1.2,
  toGoPound: .34,

  totalCupSales: 0,
  totalCustomers:0,
  hrlyPound:0,
  dailyPoundSale:0,

  cupSalePerHr:[],
  hourlyCust: [],
  packageLbsPerHour:[],
  employeeRequired:[],
  totalPoundsPerHr:[],
  cupsPerPound:[],

  // This generates a random number of customers between min and max

  getRandom: function(min, max) {
  return(Math.floor(Math.random() * (max - min + 1)) + min);
},
// This calculates average customers per hour
  averageCustomerPerHour: function () {
    for (cust in this.hrsOpen)     {
      var myCustomers= Math.round(this.getRandom(this.min, this.max)*10)/10;
      this.hourlyCust.push (myCustomers);

      this.totalCustomers+= this.hourlyCust[cust];
  }
},
// This calculates coffee cupSalePerHr per hours
hourlySales: function () {
  for (hour in this.hourlyCust)    /* same as (i=0; i < this.hrsOpen.length; i++)*/ {
  var cupSalePerHr=Math.round((this.hourlyCust[hour] * this.average)*10)/10;
  //console.log (cupSalePerHr);
  this.cupSalePerHr.push(cupSalePerHr);
  this.totalCupSales+= this.cupSalePerHr[hour]; /*same as (this.totalCupSales +=this.cupSalePerHr[i];) */

  // this calculates  total pounds in terms of cups
  var cupsInPounds = Math.round((this.cupSalePerHr[hour]/16)*10)/10;
  this.cupsPerPound.push (cupsInPounds);

  // this calculates to Go Pound sale per hour
  packageLbsPerHour = Math.round((this.hourlyCust[hour] * this.toGoPound) * 10)/10;
  this.packageLbsPerHour.push(packageLbsPerHour); ///  there is some bug in these lines
  this.hrlyPound+=packageLbsPerHour;
  }
  this.totalCupSales = Math.round(this.totalCupSales);
},
//this calculates Total Coffee Pound sale per hour
getTotalPoundSalePerHour: function () {
  for (hour in this.hrsOpen) {
    var totalHrlyPounds = Math.round ((this.packageLbsPerHour[hour] + this.cupsPerPound [hour])*10)/10;
    this.totalPoundsPerHr.push (totalHrlyPounds);   ///  there is some bug in these lines
    this.dailyPoundSale+=totalHrlyPounds;
  }
   this.dailyPoundSale = Math.round(this.dailyPoundSale)
},

getEmployeesPerHour:  function() {
    for (idx in this.hrsOpen) {
      var employees = Math.ceil(this.hourlyCust[idx] / 30);
      this.employeeRequired.push(employees);
    }
  },

//This prints the lists to the page
render: function () {
  this.averageCustomerPerHour ();
  this.hourlySales ();
  this.getTotalPoundSalePerHour ();
  this.getEmployeesPerHour ();
  var sectionEl = document.getElementById('seaTacAirportSales');
  sectionEl.textContent = this.name;
  var ulEl = document.createElement ('ul');

// this creates li for each this.hrsOpen and appends it to the ul we created above
for (hour in this.hrsOpen) {
  var liEl = document.createElement ('li');
  liEl.textContent = this.hrsOpen [hour] + ": " + this.totalPoundsPerHr [hour] + ' lbs [' + this.hourlyCust [hour] + ' customers, ' + this.cupSalePerHr[hour] +
  ' cups'+ " ( " + this.cupsPerPound [hour] + " lbs), " + this.packageLbsPerHour [hour] +  " lbs to-go]";
  ulEl.appendChild (liEl);
}
// this creates and li for totalCupSales and appends it to the ul created above
//then appends it to the existing section withing our HTML.
liEl = document.createElement('li');
liEl.textContent = 'Total customers at SeaTac Airport Market Sales: ' + this.totalCustomers
ulEl.appendChild (liEl);
sectionEl.appendChild(ulEl)

liEl = document.createElement('li');
liEl.textContent = "Total cups sold at SeaTac Airport Market Sales: " + this.totalCupSales;   //' Employee needed :' + this.employeeRequired;
ulEl.appendChild (liEl);
sectionEl.appendChild(ulEl)

liEl = document.createElement('li');
liEl.textContent = 'Total to-go pound packages sold at SeaTac Airport Market Sales: ' + this.hrlyPound
ulEl.appendChild (liEl);
sectionEl.appendChild(ulEl)

liEl = document.createElement('li');
liEl.textContent = 'Total pounds of beans needed at SeaTac Airport Market Sales: ' + this.dailyPoundSale
ulEl.appendChild (liEl);
sectionEl.appendChild(ulEl)

}
}
seaTacAirportSales.render();
