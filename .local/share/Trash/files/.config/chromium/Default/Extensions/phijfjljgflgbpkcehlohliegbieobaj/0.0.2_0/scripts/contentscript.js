var xOffset=5,yOffset=10,absoluteCursorPos={},relativeCursorPos={},anchorSelector,ajaxRequest,Mx,My,pictresCache={},linkTypes={title:{anon:"http://ia.media-imdb.com/images/G/01/imdb/images/poster/movie_large-2652508870._V_.png",posterSelector:".poster img"},character:{anon:"http://ia.media-imdb.com/images/G/01/imdb/images/nopicture/medium/name-2135195744._CB271220678_.png",posterSelector:".photo img"},name:{anon:"http://ia.media-imdb.com/images/G/01/imdb/images/nopicture/medium/name-2135195744._CB271220678_.png",posterSelector:"#name-poster"}},loadingGif="http://ia.media-imdb.com/images/G/01/imdb/images/video/trailers/spinner-featured-3267265562._V_.gif",preloadLoadingGif=new Image;preloadLoadingGif.src=loadingGif,Mx=$(document).width(),My=$(document).height();var setCoordinates=function(e){absoluteCursorPos={x:e.pageX,y:e.pageY},relativeCursorPos={x:e.clientX,y:e.clientY}},createPreview=function(e){var t=$(this).attr("href").split("/"),o=t[1],i=t[2],r=$('<img id="hover-preview" style="position: absolute; border: none; z-index : 1025; display: none; padding: 7px; background: #000 no-repeat scroll center center;" src="'+loadingGif+'" />').appendTo("body");setPicture(o,i,r),calculatePreviewPosition(),r.fadeIn("fast")},removePreview=function(){$("#hover-preview").remove(),ajaxRequest&&ajaxRequest.abort()},calculatePreviewPosition=function(){var e,t,o=$("#hover-preview"),i=xOffset+o.width(),r=yOffset+o.height();i=Math.min(i+absoluteCursorPos.x,Mx),r=Math.min(r+absoluteCursorPos.y,My),e=r-o.height(),t=i-o.width(),o.height()+relativeCursorPos.y>$(window).height()&&(e=e-o.height()-2*yOffset),o.css("top",e+"px").css("left",t+"px")},setPicture=function(e,t,o){fetchPicture(e,t).success(function(i){var r=$(i).find(linkTypes[e].posterSelector).attr("src")||linkTypes[e].anon;pictresCache[e+"-"+t]=r,setPictureSRC(o,r)}).complete(function(i,r){"canceled"==r&&setPictureSRC(o,pictresCache[e+"-"+t])})},fetchPicture=function(e,t){return ajaxRequest=$.ajax({url:"/"+e+"/"+t,dataType:"html",beforeSend:function(o){return pictresCache[e+"-"+t]?!1:void 0}})},setPictureSRC=function(e,t){e.css({padding:"0"}),e.attr("src",t).load(function(){calculatePreviewPosition()})};for(var type in linkTypes)anchorSelector="a[href^='/"+type+"/']",$(document.body).on("hover mousemove",anchorSelector,setCoordinates),$(document.body).on("mouseenter",anchorSelector,createPreview),$(document.body).on("mousemove",anchorSelector,calculatePreviewPosition),$(document.body).on("mouseleave",anchorSelector,removePreview);
//# sourceMappingURL=contentscript.js.map