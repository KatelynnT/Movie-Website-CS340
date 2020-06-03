function searchByTitle() {
	var title_search_string  = document.getElementById('title_search_string').value
	window.location = '/search/media/' + encodeURI(title_search_string)
}
function handle(e){
        if(e.which === 13){
        	alert("Press the search button to get search results");
    	}
}
