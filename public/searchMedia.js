function searchByTitle() {
	var title_search_string  = document.getElementById('title_search_string').value
	window.location = '/search/media/' + encodeURI(title_search_string)
}
