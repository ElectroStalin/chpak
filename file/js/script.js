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
           case "people":
               window.location.href = "/people";
               break;
           case "logout":
               window.location.href = "/logout";
               break;
       }
    });

    var myMap;
    ymaps.ready(init);
    function init () {
        var myPlacemark;
        myMap = new ymaps.Map('map', {
            center: [45.039181,38.974451],
            zoom: 12,
            controls: ['smallMapDefaultSet']
        }, {
        });

        myMap.events.add('click', function (e) {
            var coords = e.get('coords');

            // Если метка уже создана – просто передвигаем ее.
            if (myPlacemark) {
                myPlacemark.geometry.setCoordinates(coords);
            }
            // Если нет – создаем.
            else {
                myPlacemark = createPlacemark(coords);
                myMap.geoObjects.add(myPlacemark);
                // Слушаем событие окончания перетаскивания на метке.
                myPlacemark.events.add('dragend', function () {
                    getAddress(myPlacemark.geometry.getCoordinates());
                });
            }
            getAddress(coords);
        });

        // Создание метки.
        function createPlacemark(coords) {
            return new ymaps.Placemark(coords, {
                iconCaption: 'поиск...'
            }, {
                preset: 'islands#violetDotIconWithCaption',
                draggable: true
            });
        }

        // Определяем адрес по координатам (обратное геокодирование).
        function getAddress(coords) {
            myPlacemark.properties.set('iconCaption', 'поиск...');
            ymaps.geocode(coords).then(function (res) {
                var firstGeoObject = res.geoObjects.get(0);
                $("input[data-bind='map']").val(firstGeoObject.properties.get('text'));
                myPlacemark.properties
                    .set({
                        iconCaption: firstGeoObject.properties.get('name'),
                        balloonContent: firstGeoObject.properties.get('text')
                    });
            });
        }
    }
});