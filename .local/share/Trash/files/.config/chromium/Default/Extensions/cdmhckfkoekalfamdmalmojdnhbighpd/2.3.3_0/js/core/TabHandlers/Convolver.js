/**
 * @copyright CreatorMars4 2020
 * @author creatormars4 creatormars4@gmail.com
 * Class Convolver
 * @extends TabHandler
 * @file Convolver.js
 */
class Convolver extends TabHandler{
    show(){
        super.useConvolver();
        $("#convolverRadio").prop("checked", true);
        $('#convolverRadio').parent().addClass('is-checked');

        $(".chorus").addClass("hidden");
        $(".convolver").removeClass("hidden");

        $(".pitch").addClass("hidden");
        $(".dynamics").addClass("hidden");
        $(".eq").addClass("hidden");
        $("#presets").addClass("hidden");
        $("#advancedLabel").addClass("hidden");
        $(".advanced").addClass("hidden");
        $("#bypass").removeClass("hidden");


        if (Core.isConvolverBypass() == true) {
            $("#bypass").addClass("fg-green");
        } else {
            if ($("#bypass").hasClass("fg-green")) {
                $("#bypass").removeClass("fg-green");
                Preset.init("convolver");
                $(".convolver").removeClass("disabled");
                $("#resetLabel").removeClass("hidden");
            }
            if (Core.isConvolverPreset() == true) {
                Popup.showLoad()
            } else {
                Popup.showSave()
            }
        }
    }
}