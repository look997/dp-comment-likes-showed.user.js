// ==UserScript==
// @name		Dp Comments likes showed
// @namespace  
// @description		Dp Comments likes showed
// @author		look997
// @version		0.1 beta
// @grant		none
// @include		http://www.dobreprogramy.pl/*
// @date           2016-12-17
// @resource       metadata 
// @downloadURL    
// @updateURL      
// @run-at 		document-end
// ==/UserScript==

"use strict";

function main () {
   console.log("main");
   const trig = ()=>{
      console.log("trig");
      const commentsEls = document.querySelectorAll("#comment-list .comment");
      commentsEls.forEach((commentEl)=>{
         const commentId = commentEl.getAttribute("data-id");
         
         var formData = new FormData();
            
         formData.append("put[what]", "wholikecomment");
         formData.append("get[id]", commentId);
         
         fetch("http://www.dobreprogramy.pl/Providers/CommentsHandler.ashx", {
            method: "post",
            body: formData
         }).then(function(response) {
            return response.json();
         }).then(function(likes) {
            let likesList = "";
            likes.forEach((like)=>{
               likesList += " "+like.name+",";
            });
            likesList = likesList.slice(0, -1);
            var spanEl = document.createElement("span");
            spanEl.textContent = likesList;
            commentEl.querySelector(".upvote").appendChild(spanEl); 
         }).catch(function(ex) {
            console.log("bug");
         });
      });
   };

   const comConEl = document.querySelector("#comments-container");
   
   let observer = new MutationObserver((mutations)=> {
         console.log("xd mutation");
        // if (mutations[0].target.querySelector(".profile").childElementCount) {
            //console.log("profil mutation addSiwaBroda");
            trig();
        // }
      });
      observer.observe( comConEl, {childList: true} );
      
}


if (typeof $ == 'undefined') {
	if (typeof unsafeWindow !== 'undefined' && unsafeWindow.jQuery) {
		// Firefox
		var $ = unsafeWindow.jQuery;
		main();
	} else {
		// Chrome
		addJQuery(main);
	}
} else {
	// Opera >.>
	main();
}

function addJQuery(callback) {
	var script = document.createElement("script");
	script.textContent = "(" + callback.toString() + ")();";
	document.body.appendChild(script);
}