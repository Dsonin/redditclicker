	var inspo = 0;
	var boredom = 100;
	var posts = 0;
	var karma =  0;
	var minCred = 20; // this should start out higher, but for fast testing, we're doing it this way!
	var credit = 0; 
	var postOC = 0;
	var repost = 0;
	var customSubs = 0;
	var energyDrinkTimer = 10;

	//multiplier variables

	var karmaple = 5; //karma multiplier for comments/posts
	var inspoUp = 1; //inspiration multiplier
	var badKarma = 10; //This determines how likely you will be to LOSE karma.
	var postMultiplier = 25; //multiplier for original content posts

	//Some fun functions!

	function streeCred (){
		if (karma >= minCred){
			console.log(karma);
	        credit = credit + 0.5;
	        $("#credit").html(credit);
	    };
	};

	function postPosts(){
		$('#comment').click( function(){
	        var toAdd = $('input[name=comment-post]').val();
	        $('#userPosts').prepend('<p class="item">' + toAdd + '</p>');
	        $("input[name=comment-post]").val("");
	    });
	    $(document).on('click', '.item', function() {
	        $(this).remove();
	    });
	};

	function message(message){
		$("#alert-msg").html(message).fadeIn(500).fadeOut(1000);
	};

	function energyDrink (){
		energyDrinkTimer = 10;
		boredom = boredom+50;
		$("#boredom").html(boredom);
		$("#energyDrinkTimer").html(energyDrinkTimer);
		badKarma = badKarma*5;
		inspoUp = inspoUp*5;
		console.log(inspoUp + " " + badKarma);
		window.setInterval( function(){
			if (energyDrinkTimer>0){
			    energyDrinkTimer = energyDrinkTimer-1;
			    $("#energyDrinkTimer").html(energyDrinkTimer);
			    console.log(energyDrinkTimer);
			};
	    }, 1000)
	    window.setTimeout (function(){
	    	badKarma = badKarma/5;
		    inspoUp = inspoUp/5;
		    console.log(inspoUp + " " + badKarma);
	    }, 10000);
	}; //this mostly works. Not sure how to reset when the countdown is finished.

	$(document).ready( function(){

	//helper functions that need to run right away!

	$("input:text").focus(
	    function(){
	        $(this).val("");
	    }); //For the text area focus.

	//intial stats
		$("#boredom").html(boredom);
		$("#inspo").html(inspo);
		$("#posts").html(posts);
		$("#karma").html(karma);
		$("#subreddits").html(customSubs);
		$("#cmts").html(posts);
		
	//Button functions
		$("#lurk").click( function lurk(){
			if (boredom <= 0){
			    $("#alert-msg").html("You're too bored!").fadeIn(500).fadeOut(1000);
			}else{
	            inspo = inspo + Math.floor(inspoUp);
	            console.log(inspo);
	            boredom = boredom - 1;
	            $("#inspo").html(inspo);
	            $("#boredom").html(boredom);
	        }
		});

		$("#vote").click (function vote(){
			if (boredom <= 4){
			    $("#alert-msg").html("You're too bored!").fadeIn(500).fadeOut(1000);
	        }else{
	    	    inspo = inspo + 2*Math.floor(inspoUp);
			    console.log(inspo);
			    boredom = boredom - 5;
	            $("#inspo").html(inspo);
	            $("#boredom").html(boredom);
	        }
		});

		$("#drink").click( function(){  
			energyDrink();
		}); 
	//Commenting randomly gives karma based on inspiration. Uninspired comments, might fail, but still cost inspiration!
		$("#comment").click (function comment(){
			if (inspo > 0){
				posts = posts+1;
				inspo = inspo - Math.floor(inspoUp)*Math.floor(Math.random()*6);
				$("#inspo").html(inspo);
				$("#cmts").html(posts);
				karma = karma + Math.ceil(Math.random()*karmaple);
				$("#karma").html(karma);
			}else{
				posts = posts+1;
				inspo = inspo - Math.floor(inspoUp)*Math.floor(Math.random()*6);
				$("#inspo").html(inspo);
				$("#cmts").html(posts);
				karma = karma - Math.ceil(Math.random()*karma-badKarma);
				$("#karma").html(karma);
				streeCred();	
			};
		});
		$("#comment").on("click", postPosts()); //not sure if this would work otherwise....soooo

		$("#post").click(function (){
			if (karma > 50){
			    postOC = postOC + 1;
			    if(inspo > 0){
			        karma = karma + Math.floor(Math.random()*postMultiplier);
			        inspo = inspo - postMultiplier;
			    }else{
				    karma = karma + (Math.floor(Math.random()*postMultiplier*2-postMultiplier));
				    inspo = inspo - postMultiplier;
			    };
			}else{
				message("You need more karma to do that!");
			};
			$("#posts").html(postOC);
			$("#karma").html(karma);
			$("#inspo").html(inspo);
		});

	//Upgrades 

	    $("#subscribe").click( function(){
	    	if(customSubs<1000){
	    	    customSubs = customSubs+1;
	    	    inspoUp = inspoUp+customSubs/100;
	            $("#subreddits").html(customSubs);
	            console.log(inspoUp);
	        }else{
	        	message("Are you sure you wouldn't rather browse r/all? There are no subs left to subscribe to!"); //this should be mid-game point.
	        };
	    });
	});

