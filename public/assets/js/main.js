$("#add-btn").on("click", function(event) {
    // since #add-btn is a "type=submit", we need to preventDefault() to keep a click
    // event from trying to submit the form and thus refreshing the page/ignoring our
    // wonderful JavaScript magic!
    event.preventDefault();

    // gathering all of the values from the form; building them into an object with 
    // keys named according to the corresponding table column names; this naming 
    // convention will save you from A LOT of trouble later
    const newDrink = {
        name: $("#drink-name").val().trim(),
        type: $("#drink-type").val(),
        location: $("#drink-location").val().trim(),
        price: $("#drink-price").val().trim(),
        description: $("#drink-description").val().trim(),
        rating: $("input[name='rating']:checked").val(),
        love: $("#love").is(":checked"),
        hate: $("#hate").is(":checked")
    }

    // if any of name, type, or rating are skipped, alert the user and prevent inserting the
    // drink into the table
    if (!newDrink.name || !newDrink.type || !newDrink.rating) {
        return alert("You must specify at least name, type, and rating when adding a drink!");
    }

    // else we're good to go! now we post to our back-end post route, and send along the
    // object of user input constructed above
    $.post("/api/drinks", newDrink, () => {
        // when the server sends its response (using res.end() or res.json(), for example)
        // it triggers the AJAX .then/callback...

        // in this case, once our POST is completed and the server terminates the request/
        // response cycle, we're redirecting the browser to the page listing the drinks of
        // the type just inserted!
        location.href = `/${newDrink.type}s`;
    });

    // resetting our form after the new drink is submitted!
    $("#add-drink")[0].reset();
});