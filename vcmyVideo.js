var vcmyVideo = {
    init: function () {
        vcmyVideo.hw1_indexVideo();
        vcmyVideo.jwplayerSetup();
    },
  	hw1_indexVideo:function(){
        var $winWidth = $(window).width();
        var $videoHeight = ($winWidth > 960) ? 540 : $winWidth * 9 / 16;
        $('.index-video-box-1').height($videoHeight);
    },
    jwplayerSetup: function () {
        // bof jwplayer
        (function ($) {
            $(function ($) {
                // bof dom ready
                // fancybox handler
                if ($.fn.fancybox)
                    $('<a href="#" id="play_video_fancyboxTag"></a>').appendTo("body").fancybox({
                        padding: 0,
                        onClosed: function () {
                            pauseVideo();
                            $("#hw1_stage").css("display","none");
                            $("#fancybox-close").removeClass("fancy-video-close");
                        }
                    });

                var playerInstance = null;

                function pauseVideo(e) {
                    try {
                        if (playerInstance)
                            playerInstance.destroyPlayer();
                    } catch (_e) {
                    }
                }

                $(document).on("vclick", ".js_video_player, .js-play-btn,#test88,#test89", function (e) {
                    var videId = $(this).attr('name');
                    var playerid = $('#'+videId).attr("data-player-id") || 'playerContainer';
                    var video_path = $('#'+videId).attr("data-video-path");
                    var video_name = $('#'+videId).attr("data-video-name");//added by chenyi at 2015-12-24 增加视频名称
                    if (video_name == "" || video_name == undefined) {
                        video_name = video_path;//视频名称为空，去取path
                    }
                    var autostart = ($('#'+videId).attr("data-player-autostart") || "1") == "1";
                    var ismobile = $(window).width() < 768;
                    if (ismobile)
                        video_path = $('#'+videId).attr("data-video-path-mobile") || video_path;

                    if ($(this).attr("data-play-nopop")) {
                        //$(this).next("img").fadeOut();
                        playerInstance = initPlayer(playerid, video_path, $(videId).attr("data-img-path"), autostart, video_name);

                        setTimeout(function () {
                            if (!ismobile && playerInstance && playerInstance.getState() != "PLAYING")
                                playerInstance.play();
                        }, 2000);
                        $('#'+videId).hide();
                        return false;
                    }

                    if (!$("#player_wrapper").length)
                        $('<div style="display:none;"><div id="player_wrapper"></div></div>').appendTo("body");
                      $("#fancybox-close").addClass("fancy-video-close");
                    $("#play_video_fancyboxTag").attr("href", "#player_wrapper").trigger("click");
                    if (playerInstance)
                        playerInstance.destroyPlayer();
                    $("#player_wrapper").empty();
                    $('<div id="' + playerid + '"/>').appendTo("#player_wrapper");
                    //$("#player_wrapper").show();
                    playerInstance = initPlayer(playerid, video_path, $(this).attr("data-img-path"), autostart, video_name);
                    playerInstance.onFullscreen = function (e) {
                        console.log(e); //alert(e);
                    };

                    setTimeout(function () {
                        if (playerInstance && playerInstance.getState() != "PLAYING")
                            playerInstance.play();
                    }, 2000);

                    return false;
                });

                if ($(".leftcontent a:first-child").length > 0) {
                    $(document).on("click", ".leftcontent a:first-child", function (e) {
                        e.preventDefault();
                        var playerid = 'playerContainer';
                        var video_path = $(this).attr("href");
                        var autostart = ($(this).attr("data-player-autostart") || "1") == "1";
                        if (!$("#player_wrapper").length)
                            $('<div style="display:none;"><div id="player_wrapper"></div></div>').appendTo("body");
                        $("#play_video_fancyboxTag").attr("href", "#player_wrapper").trigger("click");
                        if (playerInstance)
                            playerInstance.destroyPlayer();
                        $("#player_wrapper").empty();
                        $('<div id="' + playerid + '"/>').appendTo("#player_wrapper");
                        //$("#player_wrapper").show();
                        playerInstance = initPlayer(playerid, video_path, $(this).attr("data-img-path"), autostart, "");
                        playerInstance.onFullscreen = function (e) {
                            console.log(e); //alert(e);
                        };
                        setTimeout(function () {
                            if (playerInstance && playerInstance.getState() != "PLAYING")
                                playerInstance.play();
                        }, 2000);

                        return false;

                    })
                }

                window.initPlayer = function (playerid, videoPath, imgSrc, autoplay, video_Name) {
                    autoplay = autoplay || false;
                    var video_width = '100%';
                    var video_height = '100%';
                    var skinSrc = 'carbon.xml';
                    var swfPlayer = 'jwplayer.flash.swf';
                    var is_proxy_ok = window.s && window.s.hasOwnProperty("Media") ? "true" : "false";
                    if (is_proxy_ok == "true") {
                        return jwplayer(playerid).setup({
                            skin: skinSrc,
                            aspectratio: "16:9",
                            width: video_width,
                            height: video_height,
                            image: imgSrc,
                            file: videoPath,
                            flashplayer: swfPlayer,
                            autostart: autoplay,
                            primary: "flash",
                            ga: {},
                            sitecatalyst: {
                                mediaName: videoPath,
                                playerName: "Huawei_player.swf"
                            }
                        });
                    } else if (is_proxy_ok == "false") {
                        return jwplayer(playerid).setup({
                            //stretching : 'exactfit',
                            skin: skinSrc,
                            aspectratio: "16:9",
                            width: video_width,
                            height: video_height,
                            image: imgSrc,
                            file: videoPath,
                            flashplayer: swfPlayer,
                            autostart: autoplay,
                            primary: "flash",
                            ga: {}
                        });
                    }
                };
            });
        })(jQuery);

    },

};
var vcmyVideo = vcmyVideo || {};

(function ($) {
    $(function ($) {
        vcmyVideo.init();
    });
    // eof dom ready
})(jQuery);



