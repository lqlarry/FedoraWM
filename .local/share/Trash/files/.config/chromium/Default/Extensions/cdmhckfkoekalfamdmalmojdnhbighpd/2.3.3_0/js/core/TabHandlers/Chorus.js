/**
 * @copyright CreatorMars4 2020
 * @author creatormars4 creatormars4@gmail.com
 * Class Chorus
 * @extends TabHandler
 * @file Chorus.js
 */
class Chorus extends TabHandler {
    show() {
        super.useChorus();
        var a = $(".chorus");
        a.removeClass('hidden');
        $('#chorusRadio').parent().addClass('is-checked');
        $("#chorusRadio").prop("checked", true);
        a.removeClass("hidden");
        $(".convolver").addClass("hidden");
        $(".pitch").addClass("hidden");
        $(".dynamics").addClass("hidden");
        $(".eq").addClass("hidden");
        $("#presets").addClass("hidden");
        var b = $("#advancedLabel");
        if (!b.hasClass("hidden")) {
            b.addClass("hidden");
        }
        $(".advanced").addClass("hidden");
        $("#bypass").removeClass("hidden");

        if (Core.isChorusBypass() == true) {
            $("#bypass").hasClass("fg-green") || $("#bypass").addClass("fg-green"),
                a.addClass("disabled"),
                $("#resetLabel").addClass("hidden"),
                $("#savePresetLabel").addClass("hidden"),
                $("#loadPresetLabel").addClass("hidden");
                $("#delete").addClass("hidden");

        } else {
            if ($("#bypass").hasClass("fg-green")) {
                $("#bypass").removeClass("fg-green")
            }
            Preset.init("chorus");
            $(".chorus").removeClass("disabled");
            $("#resetLabel").removeClass("hidden");

            if (Core.isChorusPreset() == true) {
                Popup.showLoad()
            } else {
                Popup.showSave()
            }
        }
    }
}