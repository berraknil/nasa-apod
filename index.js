$(document).ready(function() {

    $('.content').hide();
    var isHD = false;
    var newDate;
    var currentDate = moment(currentDate).format('YYYY-MM-DD');
    getPhoto(currentDate);


    $("#datepicker").datepicker({
        dateFormat: 'yy-mm-dd',
        maxDate: currentDate,
        onSelect: function(dateText) {
            newDate = dateText;
            getPhoto(newDate);
        }
    });

    $("#toggle-content").click(function() {
        $(".content").slideToggle("slow", function() {});
    });

    $("#toggle-hd").click(function() {
        if (!isHD) {
            isHD = true;
            $(this).toggleClass("clicked");
        } else {
            isHD = false;
            $(this).toggleClass("clicked");
        }
    });



    function getPhoto(date) {

        var url = "https://api.nasa.gov/planetary/apod?&date=" + date + "&api_key=595nS06jRXMFjKijZoddROwqM8SkCzPUXXKTKRGT";

        $.ajax({
            url: url,
            success: function(result) {
                if ("copyright" in result) {
                    $("#copyright").text("Image Credits: " + result.copyright);
                } else {
                    $("#copyright").text("Image Credits: " + "Public Domain");
                }

                if (!isHD) {
                    $(".wrapper").css({
                        'background-image': 'url(' + result.url + ')'
                    });
                } else {
                    $(".wrapper").css({
                        'background-image': 'url(' + result.hdurl + ')'
                    });
                }

                $("#content_info").text(result.explanation);
                $("#content_title").text(result.title);
            }
        });
    }
});