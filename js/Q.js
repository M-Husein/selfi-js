$(function(){
/* JUST INFO IN console js */
console.log("%cHello Guys...!!!\n","color:#666;font-family:Arial;letter-spacing:.02em;font-size:x-large;text-shadow:2px 2px 0 #A0E7FE,3px 3px 1px rgba(0,0,0,.3);");
console.log("%cThis is Just Tools For Developer","color:red;font-size:18px;");
	
  var rs = $("aside.control-sidebar");

	$("a[href='#']:not([download])").on("click",function(e){
		e.preventDefault();
	});

/* FOR Remove Dropside & chaining with Dropdwon Bootstrap */
  $(document).on("click",function(){
    $(".fade.dropSide").remove();
    rs.removeClass("control-sidebar-open");
  });
  $('.dropdown').on('shown.bs.dropdown',function(){
    $(".fade.dropSide").remove();
    rs.removeClass("control-sidebar-open");
  });

	$(".tip").tooltip();
	$(".tip").click(function(){
		$(this).tooltip('hide');
	});
	
  $(document).on("click",".stopPro",function(e){
    e.stopPropagation();
  });
	
/* FOR show search box */
  var boxHead = $("div.search-box").outerHeight()+4;
  $("div.search-box").css("top","-"+boxHead+"px");

  $("[data-tool]").on('click',function(e){
    var gt = $(this).data("tool"),
        it = $("."+gt).find("input[type=text]");
    $("."+gt).toggleClass("see");
    if(it){
      it.focus();
    }
  });/* END FOR show search box */
	
/* FOR backdrop POST FORM */
  $('div.formWall').click(function(){
    var he = $(this);
    if(he.hasClass('fout')){
      $(this).removeClass('fout').css('z-index','10003');
      $(this).find('textarea.xplace').focus();
      $('<div class="sec-hide" />').appendTo('body');
      $("html,body").addClass("ovhide");
      //$("body").addClass("pr17");
      //$(".main-header").addClass("right17");
    }
    /* FOR REMOVE backdrop POST FORM in wall & profile when click Post button */
    $('div.sec-hide').click(function(e){
      //e.stopPropagation();
      var dy = $('div.sec-hide');
      dy.remove();
      he.removeAttr("style").addClass('fout');
      $('textarea.xplace').blur();
      $("html,body").removeClass("ovhide");
      //$("body,.main-header").removeClass("pr17 right17");
    });
	});
	
  $('a[data-src]').one('shown.bs.tab',function(e){
    var tb = $(this).attr("href"),
				to = tb.replace(/.*(?=#[^\s]*$)/,''),
        href = $(this).data('src');
    $(to).find('iframe').attr('src',href);
  });

/* FOR Nav Search */
	$("a[href='#navsearch']").click(function(e){
	  e.preventDefault();
	  $("#navsearch").slideDown(300,function(){
	    $(this).find("input").focus();
	  });
	});
	$(".xNavSearch").click(function(){
	  $("#navsearch").slideUp(300,function(){
	    $(this).find("input").val("");
	  });
	});
	
	
	
});/* END Q script */
