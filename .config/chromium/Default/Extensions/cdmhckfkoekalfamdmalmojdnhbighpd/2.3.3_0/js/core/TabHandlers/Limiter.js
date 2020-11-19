/**
 * @copyright CreatorMars4 2020
 * @author creatormars4 creatormars4@gmail.com
 * Class Limiter
 * @extends TabHandler
 * @file Limiter.js
 */
class Limiter extends TabHandler{
    /**
     *
     */
    show() {
        super.useLimiter();
        $("#limiterRadio").prop("checked", true);
        $("#limiterRadio").attr('checked', true)
        $('#limiterRadio').parent().addClass('is-checked');
        $(".dynamics").removeClass("hidden");
        $(".eq").addClass("hidden");
        $(".chorus").addClass("hidden");
        $(".convolver").addClass("hidden");
        $(".pitch").addClass("hidden");
        $("#presets").addClass("hidden");
        $("#bypass").addClass("hidden");
        $("#advancedLabel").removeClass("hidden");
        $(".advanced").removeClass("hidden");
        $("#resetLabel").removeClass("hidden");
        Preset.init("limiter")
    };
}

