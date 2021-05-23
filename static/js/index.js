// ---------Responsive-navbar-active-animation-----------

// --------variables-----------
var url = []
var days = []
var dates = []
var sortby = "home"
    // --------function-----------

function test() {
    var tabsNewAnim = $('#navbarSupportedContent');
    var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
    var activeItemNewAnim = tabsNewAnim.find('.active');
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position();
    var itemPosNewAnimLeft = activeItemNewAnim.position();
    itemPosNewAnimLeft.left = itemPosNewAnimLeft.left;
    $(".hori-selector").css({
        "top": itemPosNewAnimTop.top + "px",
        "left": itemPosNewAnimLeft.left + "px",
        "height": activeWidthNewAnimHeight + "px",
        "width": activeWidthNewAnimWidth + "px"
    });
    $("#navbarSupportedContent").on("click", "li", function(e) {

        $('#navbarSupportedContent ul li').removeClass("active");
        $(this).addClass('active');
        if ($(this)[0].id != "Home") {
            $("#search").removeClass('d-none');
        }
        var activeWidthNewAnimHeight = $(this).innerHeight();
        var activeWidthNewAnimWidth = $(this).innerWidth();
        var itemPosNewAnimTop = $(this).position();
        var itemPosNewAnimLeft = $(this).position();
        $(".hori-selector").css({
            "top": itemPosNewAnimTop.top + "px",
            "left": itemPosNewAnimLeft.left + "px",
            "height": activeWidthNewAnimHeight + "px",
            "width": activeWidthNewAnimWidth + "px"
        });
        $('.navbar-collapse').collapse('hide');
        $('#mycontent iframe').addClass("d-none");
        $('#mycontent span').addClass("d-none");
        $('#home').addClass("d-none");
        sortby = $(this).find('a').text();
        $('#' + sortby).removeClass('d-none');
        if ($(this)[0].id != "Home") {
            $.ajax({
                type: 'POST',
                url: "/",
                contentType: 'application/json',
                data: JSON.stringify({
                    'course': sortby
                }),
                beforeSend: function() {
                    $("#wait").removeClass('d-none')
                    $("#show").addClass('d-none')
                },
                success: function(data) {
                    days = data[0];
                    dates = data[1];
                    url = data[2];
                }
            }).done(function() {
                setTimeout(function() {
                    $('#days').empty();
                    $('#dates').empty();
                    $('#days').append("<option disabled selected value='day'>Day</option>");
                    $('#dates').append("<option disabled selected value='date'>Date</option>");
                    for (i = 0; i < days.length; i++) {
                        $('#days').append("<option value='" + days[i] + "'>" + days[i] + "</option>");
                        $('#dates').append("<option value='" + dates[i] + "'>" + dates[i] + "</option>");
                    }
                    if (days.length < 4) {
                        $('.selectoption').attr('size', days.length + 1)
                    } else {
                        $('.selectoption').attr('size', 5)
                    }
                    $("#wait").addClass('d-none')
                    $("#show").removeClass('d-none')
                }, 500);
            });
        }
    });
}
$('.selectoption').change(function() {
    if ($('#show').find('.d-none')[0].id == "Day") {
        y = dates.indexOf($(this).val())
    } else {
        y = days.indexOf($(this).val())
    }
    console.log(typeof($(this).val()))
    $("#" + sortby).attr("src", url[y]);
    $('.modal').modal('hide');
});
$("#day").on("click", function() {
    $('#Day').removeClass('d-none');
    $('#Date').addClass('d-none');
});
$("#date").on("click", function() {
    $('#Date').removeClass('d-none');
    $('#Day').addClass('d-none');
});
$(document).ready(function() {
    $('#body').removeClass("d-none");
    setTimeout(function() { test(); });
});
$(window).on('resize', function() {
    setTimeout(function() { test(); }, 500);
});
$(".navbar-toggler").click(function() {
    setTimeout(function() { test(); });
});
$("#Home").on("click", function() {
    $("#search").addClass('d-none');
});