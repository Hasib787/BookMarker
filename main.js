	//Listen for form submit
	document.getElementById('myForm').addEventListener('submit',saveBookmark);

	//Save Bookmark
	function saveBookmark(e){
	 // Get form values 
	 var siteName=document.getElementById('siteName').value;
	 var siteUrl=document.getElementById('siteUrl').value;

	 if(!validateForm(siteName,siteUrl)){
	 	return false;
	 }

	 var bookmark={
	 	name:siteName,
	 	url: siteUrl
	 }
	
	/*
	//Local Storage test

		localStorage.setItem('test','Hello World');
		console.log(localStorage.getItem('test'));
		localStorage.removeItem('test');
		console.log(localStorage.getItem('test'));
	*/

	//test bookmark is null

	if (localStorage.getItem('bookmarks')===null) {
		//Init array 
		var bookmarks=[];
		//add to array
		bookmarks.push(bookmark);
		//set to localStorage
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

	}else{
		//get bookmarks from localstorage
		var boomarks = JSON.parse(localStorage.getItem('bookmarks'));
		//Add bookmark to array
		bookmarks.push(bookmark);
		//Re-set back to localstorage
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	}

	// Clear form
	document.getElementById('myForm').reset();

	// Re-fetch bookmarks
	 fetchBookmarks();

	// Prevent form from submitting
	  e.preventDefault();
	}

	//Delete Bookmark
	 function deleteBookmark(url){
	 //Get bookmark from localstorage
	 var boomarks = JSON.parse(localStorage.getItem('bookmarks'));
	 for(var i=0; i<bookmark.length; i++){
	 	if (bookmark[i].url==url) {
	 		//remove from array
	 		boomarks.splice(i,1);
	 	}
	 }
	 //Re-set back to localstorage
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

	 // Re-fetch bookmarks
	 fetchBookmarks();
	 }  

	// Fetch bookmarks
	function fetchBookmarks(){
		//get bookmarks from localstorage
		var boomarks = JSON.parse(localStorage.getItem('bookmarks'));
		//Get output id
		var bookmarksResults=document.getElementById('bookmarksResults');
		//Build output
		bookmarksResults.innerHTML='';
		for(var i=0; i< bookmarks.length;i++){
			var name=bookmarks[i].name;
			var url=bookmarks[i].url;

			bookmarksResults.innerHTML+='<div class="well">'+
											'<h3>'+name+
											'<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> '+
											'<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="'#'">Delete</a> '+
											'<h3>'+
											 '</div>';
		}
	}

	// validate Form

	function validateForm(siteName, siteUrl){
	//for Alert to submit form 
	 if(!siteName || !siteUrl){
	 	alert('Please fill in the form');
	 	return false;
	 }

	 //Regular Expression for URL match
	 var expression =/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	 var regex = new RegExp(expression);

	 if(!siteUrl.match(regex)){
	 	alert('Please Usa a valid URL');
	 	return false;
	 }

	 return true;
	}
	
	