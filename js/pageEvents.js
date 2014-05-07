$(document).ready(function(){
	var $serverURL = "http://robert.alder.net.au/";
	var $category = ["top_stories","uk","asia","technology","europe","arts_entertainment","middle_east"];
	var $contentArray = {};
	var $headlineArray = {};
	var $newsArray = [];
	
	for(var $i=0; $i<$category.length; $i++){
		displayNews($serverURL,$category[$i],$contentArray,$headlineArray,$newsArray);
	}
	
	var $ts = $("#top_stories");
	$ts.css({"background":"#333","color":"#FFF"});
	$ts.prev().css({"background":"#333","color":"#FFF"});
	
	$(".category").bind("scroll click",function(event){
		var $toClear = $(".category, #headlines h3");
		$toClear.css({"background":"#f5f5f5","color":"#555"});
		
		var $this = $(this);
		$this.css({"background":"#333","color":"#FFF"});
		$this.prev().css({"background":"#333","color":"#FFF"});
    });

	$(".slider").on('click','ul',function(e){
		var $clicked = $(this).attr("class");
		$("#nowReading .storyContent").html($contentArray[$clicked]);
		$("#nowReading h3").html($headlineArray[$clicked]);
	});
});

function News(category,id,image,headline,content){
	this.category = category;
	this.id = id;
    this.image = image;
    this.headline = headline;
    this.content = content;
}

function displayNews($serverURL,$category,$contentArray,$headlineArray,$newsArray){
	$.getJSON($serverURL + "php-bbc-return-jsonp.php?category=" + $category + "&jsoncallback=?", function(data){
		var $n = 0;
		var id_; 
		var $image_;
		var $headline_;
		var $content_;
		$.each(data, function($key, $val){
			if($n == 0){$id_ = $val;}
			if($n == 1){$image_ = $val;}
			if($n == 2){$headline_ = $val;}
			if($n == 3){
				$content_ = $val;
				$newsArray.push(new News($category,$id_,$image_,$headline_,$content_));
			}
			$n++;
			if($n == 4){
				$n = 0;
			}
		});
		
		for(var $i=0; $i<$newsArray.length; $i++){
			if($newsArray[$i].category == $category){
				// add a new 'ul' to the DOM
				$("#"+$category+" .slider").append("<ul class='"+$newsArray[$i].category+"-"+$newsArray[$i].id+"'></ul>");
				// add 2 new 'li' to the 'ul' containing the news item image & headline
				$("#"+$category+" .slider ul."+$newsArray[$i].category+"-"+$newsArray[$i].id).append("<li><img src='"+$serverURL+"bbcApp/images/"+$category+"/"+$newsArray[$i].image+"' /></li><li>"+$newsArray[$i].headline+"</li>");
				// add the news item content to the 'contentArray' associative array using News.category & News.id as the key
				$contentArray[$newsArray[$i].category+"-"+$newsArray[$i].id] = $newsArray[$i].content;
				// add the news item headline to the 'headlineArray' associative array using News.category & News.id as the key
				$headlineArray[$newsArray[$i].category+"-"+$newsArray[$i].id] = $newsArray[$i].headline;
			}
			
		}
	});
}