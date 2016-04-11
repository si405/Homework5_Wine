
// Create an object to hold the wine data that is retrieved
var wineData = {};

 // Edit wine
 // The edit button has been clicked. Find the instance of the wine to
 // be edited.

 function editThisWine(id) {
   //
   $(document).ready(function() {
       console.log("The selected wine is " + id);
       // Steps:
       // 1. Find the selected wine in the wineData object
       // 2. Update the edit Handlebars template with the wine to be edited
       // 3. Receive the ediited data and update it via the API

       $.ajax({
           url: "https://myapi.profstream.com/api/66e05f/wines" + id,
           type: "GET",
           success: function(wine) {
             alert("Found wine" + wine.name);
             $('#wine-edit #name').val(wine.name);
      //       var source = $("#edit-wine-template").html();
      //        // Use Handlebars to take the content of the template
      //        // and create a function that can be used to inject
      //        // data in to the template and return that as HTML
      //        var editWineTemplate = Handlebars.compile(source);
      //        // Insert the returned HTML back in to the page at the
      //        // appropriate place
      //        $("#wine-edit").append(editWineTemplate(wine));
            },
            error: function() {
              alert("Error!");
            }
        });
    });
 };

$(document).ready(function() {

    //  As soon as the document is loaded retrieve the data necessary to populate
    // the page.

    var x = loadWines();

    // Function to access the API, retrieve the wine list and populate the
    // page
    function loadWines() {
      $.ajax({
          url: "https://myapi.profstream.com/api/66e05f/wines",
          type: "GET",
          success: function(wines) {
            wineData = wines;
            wines.forEach(function(wine) {
              // // First get contents of the template from the HTML
              var source = $("#wine-template").html();
              // Use Handlebars to take the content of the template
              // and create a function that can be used to inject
              // data in to the template and return that as HTML
              var wineTemplate = Handlebars.compile(source);
              // Insert the returned HTML back in to the page at the
              // appropriate place
              $("#wine-display").append(wineTemplate(wine));
            })
            console.log(wineData);
          },
          error: function() {
            alert("Error!");
          }
      });
    };

      // Create a new wine entry
      // When the submitForm button is clicked, read the information from the
      // modal and post it to the API

      $("button#submitForm").click(function(event) {
        event.preventDefault();
        $.ajax({
            url: "https://myapi.profstream.com/api/66e05f/wines",
            type: "POST",
            data: {
              name: $("#name").val(),
              year: parseInt($("#year").val()),
              grapes: $("#grapes").val(),
              country: $("#country").val(),
              region: $("#region").val(),
              description: $("#description").val(),
              picture: $("#picture").val(),
              price: parseFloat($("#price").val())
            },
            success: function(wine) {
              $('#add-wine-modal').modal('hide');
              loadWines();
            },
            error: function() {
              alert("Error!");
            }
        });
       });



});
