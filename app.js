
var pikePlace = {
  hrsOpen: ["6 am", "7 am", "8 am","9 am","10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm", "7 pm", "8 pm"],
  name: "Pike Place",
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
      var myCustomers= Math.floor(this.getRandom(this.min, this.max));
      this.hourlyCust.push (myCustomers);

      this.totalCustomers+= this.hourlyCust[cust];
  }
},
// This calculates coffee cupSalePerHr per hours
hourlySales: function () {
  for (hour in this.hourlyCust)    /* same as (i=0; i < this.hrsOpen.length; i++)*/ {
  var cupSalePerHr=Math.round(this.hourlyCust[hour] * this.average);
  this.cupSalePerHr.push(cupSalePerHr);
  this.totalCupSales+= this.cupSalePerHr[hour]; /*same as (this.totalCupSales +=this.cupSalePerHr[i];) */
  // this calculates  total pounds in terms of cups
  cupsInPounds = (Math.round((this.cupSalePerHr[hour])/16)*10)/10;
  this.cupsPerPound.push (cupsInPounds);

  // this calculates to Go Pound sale per hour
  packageLbsPerHour = Math.round((this.hourlyCust[hour] * this.toGoPound) * 10)/10;
  this.packageLbsPerHour.push(packageLbsPerHour); ///  there is some bug in these lines
  this.hrlyPound+=packageLbsPerHour;
  }
},
//this calculates Total Coffee Pound sale per hour
getTotalPoundSalePerHour: function () {
  for (hour in this.hrsOpen) {
  var totalHrlyPounds= Math.floor (this.packageLbsPerHour[hour] + this.cupsPerPound [hour]);
  this.totalPoundsPerHr.push (totalHrlyPounds);   ///  there is some bug in these lines
  this.dailyPoundSale+=totalHrlyPounds;
  }
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
  var sectionEl = document.getElementById('pikePlaceSales');
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
liEl.textContent = 'Total customers at Pike Place Market: ' + this.totalCustomers
ulEl.appendChild (liEl);
sectionEl.appendChild(ulEl)

liEl = document.createElement('li');
liEl.textContent = "Total cups sold at Pike Place Market: " + this.totalCupSales;   //' Employee needed :' + this.employeeRequired;
ulEl.appendChild (liEl);
sectionEl.appendChild(ulEl)

liEl = document.createElement('li');
liEl.textContent = 'Total to-go pound packages sold at Pike Place Market: ' + this.hrlyPound
ulEl.appendChild (liEl);
sectionEl.appendChild(ulEl)

liEl = document.createElement('li');
liEl.textContent = 'Total pounds of beans needed at Pike Place Market: ' + this.dailyPoundSale
ulEl.appendChild (liEl);
sectionEl.appendChild(ulEl)

}
}
pikePlace.render();

var capitolHill = {
  hrsOpen: ["6 am", "7 am", "8 am","9 am","10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm", "7 pm", "8 pm"],
  name: "Capitol Hill",
  min:12,
  max:28,
  average:3.2,
  toGoPound: .03,

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
      var myCustomers= Math.floor(this.getRandom(this.min, this.max));
      this.hourlyCust.push (myCustomers);

      this.totalCustomers+= this.hourlyCust[cust];
  }
},
// This calculates coffee cupSalePerHr per hours
hourlySales: function () {
  for (hour in this.hourlyCust)    /* same as (i=0; i < this.hrsOpen.length; i++)*/ {
  var cupSalePerHr=Math.round(this.hourlyCust[hour] * this.average);
  this.cupSalePerHr.push(cupSalePerHr);
  this.totalCupSales+= this.cupSalePerHr[hour]; /*same as (this.totalCupSales +=this.cupSalePerHr[i];) */
  // this calculates  total pounds in terms of cups
  cupsInPounds = (Math.round((this.cupSalePerHr[hour])/16)*10)/10;
  this.cupsPerPound.push (cupsInPounds);

  // this calculates to Go Pound sale per hour
  packageLbsPerHour = Math.round((this.hourlyCust[hour] * this.toGoPound) * 10)/10;
  this.packageLbsPerHour.push(packageLbsPerHour); ///  there is some bug in these lines
  this.hrlyPound+=packageLbsPerHour;
  }
},
//this calculates Total Coffee Pound sale per hour
getTotalPoundSalePerHour: function () {
  for (hour in this.hrsOpen) {
  var totalHrlyPounds= Math.floor (this.packageLbsPerHour[hour] + this.cupsPerPound [hour]);
  this.totalPoundsPerHr.push (totalHrlyPounds);   ///  there is some bug in these lines
  this.dailyPoundSale+=totalHrlyPounds;
  }
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
capitolHill.render();

/////////////////////

var seattlePublicLibrary = {
  hrsOpen: ["6 am", "7 am", "8 am","9 am","10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm", "7 pm", "8 pm"],
  name: "Seattle Public Library",
  min:9,
  max:45,
  average:2.6,
  toGoPound: .02,

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
      var myCustomers= Math.floor(this.getRandom(this.min, this.max));
      this.hourlyCust.push (myCustomers);

      this.totalCustomers+= this.hourlyCust[cust];
  }
},
// This calculates coffee cupSalePerHr per hours
hourlySales: function () {
  for (hour in this.hourlyCust)    /* same as (i=0; i < this.hrsOpen.length; i++)*/ {
  var cupSalePerHr=Math.round(this.hourlyCust[hour] * this.average);
  this.cupSalePerHr.push(cupSalePerHr);
  this.totalCupSales+= this.cupSalePerHr[hour]; /*same as (this.totalCupSales +=this.cupSalePerHr[i];) */
  // this calculates  total pounds in terms of cups
  cupsInPounds = (Math.round((this.cupSalePerHr[hour])/16)*10)/10;
  this.cupsPerPound.push (cupsInPounds);

  // this calculates to Go Pound sale per hour
  packageLbsPerHour = Math.round((this.hourlyCust[hour] * this.toGoPound) * 10)/10;
  this.packageLbsPerHour.push(packageLbsPerHour); ///  there is some bug in these lines
  this.hrlyPound+=packageLbsPerHour;
  }
},
//this calculates Total Coffee Pound sale per hour
getTotalPoundSalePerHour: function () {
  for (hour in this.hrsOpen) {
  var totalHrlyPounds= Math.floor (this.packageLbsPerHour[hour] + this.cupsPerPound [hour]);
  this.totalPoundsPerHr.push (totalHrlyPounds);   ///  there is some bug in these lines
  this.dailyPoundSale+=totalHrlyPounds;
  }
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
seattlePublicLibrary.render();

/////////////////

var southLakeUnion = {
  hrsOpen: ["6 am", "7 am", "8 am","9 am","10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm", "7 pm", "8 pm"],
  name: "South Lake Union",
  min:5,
  max:18,
  average:1.3,
  toGoPound: .04,

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
      var myCustomers= Math.floor(this.getRandom(this.min, this.max));
      this.hourlyCust.push (myCustomers);

      this.totalCustomers+= this.hourlyCust[cust];
  }
},
// This calculates coffee cupSalePerHr per hours
hourlySales: function () {
  for (hour in this.hourlyCust)    /* same as (i=0; i < this.hrsOpen.length; i++)*/ {
  var cupSalePerHr=Math.round(this.hourlyCust[hour] * this.average);
  this.cupSalePerHr.push(cupSalePerHr);
  this.totalCupSales+= this.cupSalePerHr[hour]; /*same as (this.totalCupSales +=this.cupSalePerHr[i];) */
  // this calculates  total pounds in terms of cups
  cupsInPounds = (Math.round((this.cupSalePerHr[hour])/16)*10)/10;
  this.cupsPerPound.push (cupsInPounds);

  // this calculates to Go Pound sale per hour
  packageLbsPerHour = Math.round((this.hourlyCust[hour] * this.toGoPound) * 10)/10;
  this.packageLbsPerHour.push(packageLbsPerHour); ///  there is some bug in these lines
  this.hrlyPound+=packageLbsPerHour;
  }
},
//this calculates Total Coffee Pound sale per hour
getTotalPoundSalePerHour: function () {
  for (hour in this.hrsOpen) {
  var totalHrlyPounds= Math.floor (this.packageLbsPerHour[hour] + this.cupsPerPound [hour]);
  this.totalPoundsPerHr.push (totalHrlyPounds);   ///  there is some bug in these lines
  this.dailyPoundSale+=totalHrlyPounds;
  }
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
liEl.textContent = 'Total customers at South Lake Union Market: ' + this.totalCustomers
ulEl.appendChild (liEl);
sectionEl.appendChild(ulEl)

liEl = document.createElement('li');
liEl.textContent = "Total cups sold at South Lake Union Market: " + this.totalCupSales;   //' Employee needed :' + this.employeeRequired;
ulEl.appendChild (liEl);
sectionEl.appendChild(ulEl)

liEl = document.createElement('li');
liEl.textContent = 'Total to-go pound packages sold at South Lake Union Market: ' + this.hrlyPound
ulEl.appendChild (liEl);
sectionEl.appendChild(ulEl)

liEl = document.createElement('li');
liEl.textContent = 'Total pounds of beans needed at South Lake Union Market: ' + this.dailyPoundSale
ulEl.appendChild (liEl);
sectionEl.appendChild(ulEl)

}
}
southLakeUnion.render();

/////////////////

var seaTacAirport = {
  hrsOpen: ["6 am", "7 am", "8 am","9 am","10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm", "7 pm", "8 pm"],
  name: "Sea-Tac Airport",
  min:28,
  max:44,
  average:1.1,
  toGoPound: .41,

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
      var myCustomers= Math.floor(this.getRandom(this.min, this.max));
      this.hourlyCust.push (myCustomers);

      this.totalCustomers+= this.hourlyCust[cust];
  }
},
// This calculates coffee cupSalePerHr per hours
hourlySales: function () {
  for (hour in this.hourlyCust)    /* same as (i=0; i < this.hrsOpen.length; i++)*/ {
  var cupSalePerHr=Math.round(this.hourlyCust[hour] * this.average);
  this.cupSalePerHr.push(cupSalePerHr);
  this.totalCupSales+= this.cupSalePerHr[hour]; /*same as (this.totalCupSales +=this.cupSalePerHr[i];) */
  // this calculates  total pounds in terms of cups
  cupsInPounds = (Math.round((this.cupSalePerHr[hour])/16)*10)/10;
  this.cupsPerPound.push (cupsInPounds);

  // this calculates to Go Pound sale per hour
  packageLbsPerHour = Math.round((this.hourlyCust[hour] * this.toGoPound) * 10)/10;
  this.packageLbsPerHour.push(packageLbsPerHour); ///  there is some bug in these lines
  this.hrlyPound+=packageLbsPerHour;
  }
},
//this calculates Total Coffee Pound sale per hour
getTotalPoundSalePerHour: function () {
  for (hour in this.hrsOpen) {
  var totalHrlyPounds= Math.floor (this.packageLbsPerHour[hour] + this.cupsPerPound [hour]);
  this.totalPoundsPerHr.push (totalHrlyPounds);   ///  there is some bug in these lines
  this.dailyPoundSale+=totalHrlyPounds;
  }
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
liEl.textContent = 'Total customers at Sea-Tac Airport Market: ' + this.totalCustomers
ulEl.appendChild (liEl);
sectionEl.appendChild(ulEl)

liEl = document.createElement('li');
liEl.textContent = "Total cups sold at Sea-Tac Airport Market: " + this.totalCupSales;   //' Employee needed :' + this.employeeRequired;
ulEl.appendChild (liEl);
sectionEl.appendChild(ulEl)

liEl = document.createElement('li');
liEl.textContent = 'Total to-go pound packages sold at Sea-Tac Airport Market: ' + this.hrlyPound
ulEl.appendChild (liEl);
sectionEl.appendChild(ulEl)

liEl = document.createElement('li');
liEl.textContent = 'Total pounds of beans needed at Sea-Tac Airport Market: ' + this.dailyPoundSale
ulEl.appendChild (liEl);
sectionEl.appendChild(ulEl)

}
}
seaTacAirport.render();
