/* global firebase moment */
// Steps to complete:
// 1. Initialize Firebase
// 2. Create button for adding new train time - then update the html + update the database
// 3. Create a way to retrieve train from the train database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed
// 1. Initialize Firebase

 var config = {
    apiKey: "AIzaSyDPzU4A0iUZp5H0IqYErn7JPrXC4VzvCII",
    authDomain: "joseph-8d205.firebaseapp.com",
    databaseURL: "https://joseph-8d205.firebaseio.com",
    projectId: "joseph-8d205",
    storageBucket: "joseph-8d205.appspot.com",
    messagingSenderId: "936732745437"
  };
  firebase.initializeApp(config);

var database = firebase.database();
// 2. Button for adding Train Schedule



// 2. Button for adding Train
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var TrainRole = $("#role-input").val().trim();
  var TrainStart = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");
  var TrainRate = $("#rate-input").val().trim();
  // Creates local "temporary" object for holding train time data
  var newTrain = {
    name: trainName,
    role: TrainRole,
    start: TrainStart,
    rate: TrainRate
  };
  // Uploads train data to the database
  database.ref().push(newTrain);
  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.role);
  console.log(newTrain.start);
  console.log(newTrain.rate);
  // Alert
  alert("Train successfully added");
  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});
// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey){

    console.log(childSnapshot.val());

    // assign firebase variables to snapshots.
    var firebaseName = childSnapshot.val().name;
    var firebaseLine = childSnapshot.val().line;
    var firebaseDestination = childSnapshot.val().destination;
    var firebaseTrainTimeInput = childSnapshot.val().trainTime;
    var firebaseFrequency = childSnapshot.val().frequency;
    
    var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
    var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency ;
    var minutes = firebaseFrequency - timeRemainder;

    var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
    
    // Test for correct times and info
    console.log(minutes);
    console.log(nextTrainArrival);
    console.log(moment().format("hh:mm A"));
    console.log(nextTrainArrival);
    console.log(moment().format("X"));

    // Append train info to table on page
    $("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseLine + "</td><td>"+ firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");
  });

;
 

