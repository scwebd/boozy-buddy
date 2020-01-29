// BEHOLD: the magic of template literals, allowing us to build out significant blocks
// of HTML and inject JS values as needed; think about how much easier this is to
// build out than the same block of HTML + variables using string concatenation! 
$.get("/api/beers", data => {
    for (const beer of data) {
        const card = 
        `<div class="card">
            <div class="card-body">
                <h3>${beer.name}</h3>
                <p><strong>Rating: </strong>${beer.rating}</p>
                <p><strong>Loved it? </strong> ${beer.love === 1} | <strong>Hated it?</strong> ${beer.hate === 1}</p>
                <p><strong>Type: </strong>${beer.type}</p>
                <p><strong>Location: </strong>${beer.location || "Not specified"}</p>
                <p><strong>Price: </strong>${beer.price ? "$" + beer.price.toFixed(2) : "Not specified"}</p>
                <p><strong>Description/Notes: </strong>${beer.description || "Not specified"}</p>
            </div>
        </div>`;
        $("#drinks").append(card);
    }
});