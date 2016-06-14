$(document).ready(function(){

    $("*[data-click]").click(function(){
       switch($(this).attr("data-click")){
           case "menu":
               if(!$(this).attr("data-block")){
                   $("*[data-click='menu']").attr("data-block","true");
                   if($(".menu").attr("class").indexOf("disabled") != -1){
                       $(".menu").removeClass("disabled");
                       setTimeout(function(){
                           $("*[data-click='menu']").attr("data-block","");
                       },1500);
                   }else{
                       $(".menu").addClass("close");
                       setTimeout(function(){
                           $(".menu").removeClass("close");
                           $(".menu").addClass("disabled");
                           $("*[data-click='menu']").attr("data-block","");
                       },1499);
                   }
               }
               break;
       }
    });


    $("*[data-menu]").click(function(){
       switch ($(this).attr("data-menu")){
           case "index":
               window.location.href = "/";
               break;
           case "routes":
               window.location.href = "/routes";
               break;
           case "people":break;
           case "logout":
               window.location.href = "/logout";
               break;
       }
    });
});