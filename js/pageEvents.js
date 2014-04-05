$(document).ready(function(){
	
	$("#US-Canada, #asia, #entertainment, #europe, #science, #sport, #technology, #topStories, #uk").bind("scroll click",function(e){
		$(".category").css("background","#FFF");
		$(".category").css("color","#000");
		
        $(this).css("background","#444");
		$(this).css("color","#FFF");
    });

});