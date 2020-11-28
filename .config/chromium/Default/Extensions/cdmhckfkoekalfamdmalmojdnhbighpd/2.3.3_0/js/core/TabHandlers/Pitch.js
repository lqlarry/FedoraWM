/**
 * @copyright CreatorMars4 2020
 * @author creatormars4 creatormars4@gmail.com
 * Class Pitch
 * @extends TabHandler
 * @file Pitch.js
 */
class Pitch extends TabHandler{
    show() {
        super.usePitch();
        var a = $(".pitch");
        var b = $("#resetLabel");

        $('#pitchRadio').parent().addClass('is-checked');
        $("#pitchRadio").prop("checked", true);
        $(".chorus").addClass("hidden");
        $(".convolver").addClass("hidden");

        a.removeClass("hidden");
        $(".dynamics").addClass("hidden");
        $(".eq").addClass("hidden");
        $("#presets").addClass("hidden");
        $("#advancedLabel").addClass("hidden");
        $(".advanced").addClass("hidden");
        $("#bypass").removeClass("hidden");

        if (Core.isPitchBypass() == true) {
            $("#bypass").addClass("fg-green");
        } else {
            if ($("#bypass").hasClass("fg-green")) {
                $("#bypass").removeClass("fg-green")
            }
            Preset.init("pitch");

            a.removeClass("disabled");
            b.removeClass("hidden");

            if (Core.isPitchPreset() == true) {
                Popup.showLoad()
            } else {
                Popup.showSave()
            }
        }
    };

}