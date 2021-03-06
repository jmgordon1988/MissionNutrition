var fbConfig = {
    apiKey: "AIzaSyB8FG59wi_LDzcg8PDFBc_X-7A7e82TjHY",
    authDomain: "mission-nutrition-71ab9.firebaseapp.com",
    databaseURL: "https://mission-nutrition-71ab9.firebaseio.com",
    projectId: "mission-nutrition-71ab9",
    storageBucket: "mission-nutrition-71ab9.appspot.com",
    messagingSenderId: "876456885465"
};
firebase.initializeApp(fbConfig);


var database = firebase.database();

var limit = 2000;

$("#add-food").on("click", function (event) {
    event.preventDefault();

    var foodInput = $("#nutrition-input").val().trim();
    $("#nutrition-input").val("");

    database.ref().push({
        food: foodInput
    });
});

$("#add-limit").on("click", function (event) {
    event.preventDefault();

    
    var val = parseInt($("#limit-input").val().trim());
    $("#limit-input").val("");
    if (val == NaN)
        return;

    limit = val;

    database.ref("limit").set({
        limit: limit
    });
});

database.ref("limit").on("value", function (snapshot) {
    
    var sv = snapshot.val();

    if (sv.limit === undefined) {
        
        limit = 2000;
    }
    else {
        console.log("Read database limit", sv.limit);
        limit = parseInt(sv.limit);
        calculateAndDisplayNutritionValues();
    }
});

database.ref().on("child_added", function (snapshot) {
    

 
    var sv = snapshot.val();

   

    createFoodDiv(sv.food);
});