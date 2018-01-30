$("#searchBtn").on("click",function(e){
e.preventDefault();
$(".results").empty();

var searchTerm = $("#search").val().trim();
var limit =$("#numOfResult option:selected").val();
var startYear=$("#startYear").val().trim();
var endYear=$("#endYear").val().trim();
var headline;

if((startYear==="")&&(endYear==="")){
	var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	url += '?' + $.param({
	'api-key': "d97e4d75c3fd47ac899b353f501391b1",
	'q': searchTerm
});
}

else if(startYear===""){
	var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	url += '?' + $.param({
	'api-key': "d97e4d75c3fd47ac899b353f501391b1",
	'q': searchTerm,
	'end_date': endYear
});
}

else if(endYear===""){
	var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	url += '?' + $.param({
	'api-key': "d97e4d75c3fd47ac899b353f501391b1",
	'q': searchTerm,
	'begin_date': startYear
});
}

else{
var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
url += '?' + $.param({
'api-key': "d97e4d75c3fd47ac899b353f501391b1",
'q': searchTerm,
'begin_date': startYear,
'end_date': endYear
});
}	


$.ajax({
url: url,
method: 'GET',
}).done(function(result) {
	console.log(result);
	for(i=0;i<limit;i++){
		var a=$("<div>");
		var number=$("<span>")
		
		var byline=$("<p>");
		var newurl=result.response.docs[i].web_url;

		headline=result.response.docs[i].headline.main;
		number.text(i+1);
		number.addClass("artiCount");
		byline.addClass("byline");
		byline.text(result.response.docs[i].byline.original);

		a.append(number);
		a.append("<a href="+newurl+">"+" "+headline);
		a.append(byline);

		$(".results").append(a);
	}
}).fail(function(err) {
throw err;
});


});

$("#clearForm").on("click",function(e){
	$("#search").empty();
	$(".form-control option:selected").empty(); 
	 $("#startYear").empty(); 
	 $("#endYear").empty();     
	 $(".results").empty();        

	});