$(document).ready(function(){
  //Initialize Firebase
  var config = {
    apiKey: "AIzaSyB0x2i_RdXHMzND1FWB-2EXr9h7TqFNQ9c",
    authDomain: "ta-test-8b752.firebaseapp.com",
    databaseURL: "https://ta-test-8b752.firebaseio.com",
    projectId: "ta-test-8b752",
    storageBucket: "ta-test-8b752.appspot.com",
    messagingSenderId: "141476408266"
  };

  firebase.initializeApp(config);
  
  var database = firebase.database();
  var employeeDB = database.ref("/employee-data");

  //click event to gather new info
  $("#add-employee").click(function(event){
    event.preventDefault();

    var name = $("#employee-name").val().trim();
    var role = $("#employee-role").val().trim();
    var start = $("#employee-start-date").val().trim();
    var rate = parseInt($("#employee-monthly-pay").val().trim());

    if(isNaN(rate)){
      $("#employee-monthly-pay").after("Please enter a number!");
      return false
    } 

    employeeDB.push({
      name,
      role,
      start,
      rate
    })

    console.log(name, role, start, rate)
  })
  //listener to update row
  employeeDB.on("child_added", function(snapshot){
    var employee = snapshot.val();
    //Get employee data from snapshot
    var name = employee.name;
    var role = employee.role;
    var start = employee.start;
    var rate = employee.rate;
    //Do math for months worked and amount paid
    var months = moment().diff(moment(start, "YYYY/MM/DD"), "months");
    var paid = months * rate
    //Add table row
    var tRow = $("<tr>")
    tRow.append(
      $("<td>").text(name),
      $("<td>").text(role),
      $("<td>").text(start),
      $("<td>").text(months),
      $("<td>").text(rate),
      $("<td>").text(paid),
    )
    $("#employee-table").append(tRow);
    console.log(paid)
  })
})
