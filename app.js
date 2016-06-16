var hrsOpen = ["6 am", "7 am", "8 am","9 am","10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm", "7 pm", "8 pm"];
var allShops = [];
var allShopsDailyLbs = 0;
var allShopsHourlyLbs = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var allShopsHourlyEmploy = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var allShopsDailyEmployee = 0;



function Shop (min, max, name,average,toGoPound) {
 this.min = min;
 this.max = max;
 this.name = name;
 this.average = average;
 this.toGoPound = toGoPound;
 //this.hours = hours;
 this.totalCupSales = 0;
 this.totalCustomers = 0;
 this.hrlyPound = 0;
 this.dailyPoundSale = 0;
 this.dailyEmployeePerShop = 0;
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
  for (idx in hrsOpen) {
    var totalHrlyPounds = Math.round (((this.packageLbsPerHour[idx] + this.cupsPerPound [idx])*10)/10);
    this.totalPoundsPerHr.push (totalHrlyPounds);
    this.dailyPoundSale+=totalHrlyPounds;
    allShopsHourlyLbs[idx]+=totalHrlyPounds;
  }
    this.dailyPoundSale = Math.round(this.dailyPoundSale)
    allShopsDailyLbs+=this.dailyPoundSale;
};

Shop.prototype.getEmployeesPerHour = function() {
  for (hour in hrsOpen) {
    var hourlyEmployees = Math.ceil(this.hourlyCust[hour] / 30);
    this.employeeRequired.push(hourlyEmployees);
    this.dailyEmployeePerShop+=hourlyEmployees;
    allShopsHourlyEmploy[hour]+=hourlyEmployees;
    allShopsDailyEmployee+=hourlyEmployees;
    console.log (allShopsDailyEmployee)
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

//////////////////////////////
// create h1 tag for a table  main


function createTableTitle(toppart, id) {
  var center = document.getElementById(id);
  var trHeader = document.createElement('h1');
  trHeader.textContent = toppart;
  center.appendChild(trHeader);
}



function renderTableTopRow(id) {
  var table = document.getElementById(id);
  var row = document.createElement('tr');

  var thEl = document.createElement('td');
  thEl.textContent = (' ');
  row.appendChild(thEl);

  var thEl = document.createElement('td');
  thEl.textContent = ('Total');
  row.appendChild(thEl);

  for(hour in hrsOpen) {
    var thEl = document.createElement('td');
    thEl.textContent = hrsOpen[hour];
    row.appendChild(thEl);
  }

  table.appendChild(row);
}


function renderTableSecondrow(obj) {

  var table = document.getElementById('tab');

  var row = document.createElement('tr');
  var thEl = document.createElement('td');
  thEl.textContent = obj.name;
  row.appendChild(thEl);

  var thEl = document.createElement('td');
  thEl.textContent = obj.dailyPoundSale;
  row.appendChild(thEl);

  for(hour in obj.totalPoundsPerHr) {
    var thEl = document.createElement('td');
    thEl.textContent = obj.totalPoundsPerHr[hour];
    row.appendChild(thEl);
  }
    table.appendChild(row);
}

function renderTotalRow(obj) {

  var table = document.getElementById('tab');
  var row = document.createElement('tr');
  var thEl = document.createElement('td');
  thEl.textContent = ('Totals');
  row.appendChild(thEl);

  var thEl = document.createElement('td');
  thEl.textContent = allShopsDailyLbs;
  row.appendChild(thEl);
  table.appendChild(row);
    for(hour in allShopsHourlyLbs) {
      var thEl = document.createElement('td');
      thEl.textContent = allShopsHourlyLbs[hour];
      row.appendChild(thEl);
  }
      console.log(row);
      table.appendChild(row);
}

function displayCoffeeTable () {
createTableTitle('Beans Needed By Location Each Day', 'tableEl');
renderTableTopRow('tab');
renderTableSecondrow(pikePlace);
renderTableSecondrow(capitolHill);
renderTableSecondrow(seattlePublicLibrary);
renderTableSecondrow(southLakeUnion);
renderTableSecondrow(seaTacAirport);
renderTotalRow ();
}

displayCoffeeTable ();

///////////



function renderTableSecondrowBarista(obj) {

  var table = document.getElementById('barista');

  var row = document.createElement('tr');
  var thEl = document.createElement('td');
  thEl.textContent = obj.name;
  row.appendChild(thEl);
  table.appendChild(row);
  var thEl = document.createElement('td');
  thEl.textContent = obj.dailyEmployeePerShop;
  row.appendChild(thEl);

  for(hour in obj.employeeRequired) {
    var thEl = document.createElement('td');
    thEl.textContent = obj.employeeRequired[hour];
    row.appendChild(thEl);
  }
    table.appendChild(row);
}

function renderTotalRowBarista(obj) {

  var table = document.getElementById('barista');
  var row = document.createElement('tr');
  var thEl = document.createElement('td');
  thEl.textContent = ('Totals');
  row.appendChild(thEl);

  var thEl = document.createElement('td');
  thEl.textContent = allShopsDailyEmployee;
  row.appendChild(thEl);
  table.appendChild(row);
    for(hour in allShopsHourlyEmploy) {
      var thEl = document.createElement('td');
      thEl.textContent = allShopsHourlyEmploy[hour];
      row.appendChild(thEl);
  }
      console.log(row);
      table.appendChild(row);
}

createTableTitle('Baristas Needed By Location Each Day', 'tableEl1');
renderTableTopRow('barista')
renderTableSecondrowBarista (pikePlace)
renderTableSecondrowBarista (capitolHill)
renderTableSecondrowBarista (seattlePublicLibrary)
renderTableSecondrowBarista (southLakeUnion)
renderTableSecondrowBarista (seaTacAirport)
renderTotalRowBarista();
