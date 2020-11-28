/**
 * @copyright CreatorMars4 2020
 * @author creatormars4 creatormars4@gmail.com
 * @file sliders.js
 */
$("document").ready(function () {
    $(document).on('input','input[type="range"]', function () {
        var $item = $(this);
        var id = $item.attr('id');
        var value = $item.val();
        var element = $("#"+id+"Val");
        if(element){
            element.html(value)
        }
        $(this).updateSlider();
        chrome.runtime.sendMessage({type: id, value: value});
    });

    $(document).on('dblclick','input[type="range"]', function () {
        var $item = $(this);
        var val = 0;
        if($item.attr('id') == 'knee'){
            val = 20;
        }  else if ($item.attr('id') == 'ratio') {
            val = 20;
        }  else if ( $item.attr('id') == 'release'){
            val = .2
        } else if ($item.attr('id') == 'volume'){
            $("#valInfo").html("100%");
            val = 1
        } else if ($item.attr('id') == 'convolverDryLevel') {
            val = 1;
        } else if ($item.attr('id') == 'convolverHighcut') {
            val = 22050;
        } else {
            val = 0;
        }
        $("#" + $item.attr('id')).val(val);
        chrome.runtime.sendMessage({type: $item.attr('id'), value: val});


    });

    jQuery.fn.updateSlider = function() {
        function calcPcVal(a) {
            var b = parseFloat(a.val()), c = parseFloat(a.attr("min"));
            a = parseFloat(a.attr("max"));
            c = a - c;
            return Math.floor(100 * (c - (a - b)) / c)
        }
        var element = $(this[0]) ;
        var b = calcPcVal(element) + "% 100%";
        var id = element.attr("id");
        b = "#" + id + "::-webkit-slider-runnable-track { background-size:" + b + "}";
        $("#st-" + id).html(b);
        return this;
    };
});


$("input[type=range]").each(function (a) {
    a = $(this).attr("id");
    var b = $(this);

    function calcPcVal(a) {
        var b = parseFloat(a.val()), c = parseFloat(a.attr("min"));
        a = parseFloat(a.attr("max"));
        c = a - c;
        return Math.floor(100 * (c - (a - b)) / c)
    }
    var c = calcPcVal($(this));
    c = "#" + a + "::-webkit-slider-runnable-track { background-size:" + c + "% 100%}";
    $("head").append('<style id="st-' + a + '">' + c + "</style>")
});