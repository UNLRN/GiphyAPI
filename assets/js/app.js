$(document).ready(function () {
    
    let searchResults = ["Cats", "Japanese Cats"];

    function addSearchItem(item) {
        if (searchResults.includes(item) === false) {
            let el = $("<li>");
            $(el).text(item);
            $(el).addClass("search-term");
            $(el).attr("id", item);
            $("#search-results").append(el);
            searchResults.push(item);
        }
    }

    function generateSearches() {      
        for (let val of searchResults) {
            let el = $("<li>");
            $(el).text(val);
            $(el).addClass("search-term");
            $(el).attr("id", val);
            $("#search-results").append(el);
        }
    }
    
    function clearResults() {
        $("#gifs").empty();
    }

    function addGif(gif) {
        let el = $("<div>");
        $(el).addClass("col-xs-6 col-sm-6 col-md-4 col-lg-3 placeholder");
        
        let imgDIV = $("<div>");
        $(imgDIV).addClass("img-div");

        let imgEL = $("<img>");
        $(imgEL).addClass("img-responsive");
        $(imgEL).attr("src", gif.images.fixed_height_still.url);
        $(imgEL).data("still", gif.images.fixed_height_still.url);
        $(imgEL).data("animated", gif.images.fixed_height.url);
        
        let ratingEL = $("<h4>");
        $(ratingEL).text("Rating: " + gif.rating.toUpperCase());

        $(imgDIV).append(imgEL);
        $(el).append([imgDIV, ratingEL]);
        $(el).appendTo($("#gifs"));
    }

    function toggle() {
        $(this).attr("src", $(this).attr("src") == $(this).data("still") ? $(this).data("animated") : $(this).data("still"));
    }

    let showGiphy = function(){

        let giphyurl = "https://api.giphy.com/v1/gifs/search";
            giphyurl += '?' + $.param({
            'q': $(this).text(),
            'limit': 10,
            'api_key': "dc6zaTOxFJmzC"
        });

        $.ajax({
            method: 'GET',
            url: giphyurl
        }).done(function(res){
            console.log(res);
            clearResults();
            let data = res.data;
            for (let item of data){
                addGif(item);
            }
        });
    };


    let search = function(e){
        if(e.which == 13){
            e.preventDefault();

            let query = $(this).val();

            let giphyurl = "https://api.giphy.com/v1/gifs/search";
            giphyurl += '?' + $.param({
            'q': query,
            'limit': 10,
            'api_key': "dc6zaTOxFJmzC"
            });

            $.ajax({
                method: 'GET',
                url: giphyurl
            }).done(function(res){
                clearResults();
                let data = res.data;
                for (let item of data){
                    addGif(item);
                }
            });
            
            $("#search").val("");
            addSearchItem(query);
        }
    };



    generateSearches();
    $(document).on("click", ".search-term", showGiphy);
    $("#search").on("keydown", search);
    $(document).on("click", "img", toggle);
});