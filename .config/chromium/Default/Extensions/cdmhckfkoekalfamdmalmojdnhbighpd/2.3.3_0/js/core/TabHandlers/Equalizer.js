/**
 * @copyright CreatorMars4 2020
 * @author creatormars4 creatormars4@gmail.com
 * Class Equalizer
 * @extends TabHandler
 * @file Equalizer.js
 *
 */
class Equalizer extends TabHandler{
     show() {
         super.useEqualizer();
         $('#eqRadio').parent().addClass('is-checked');
         $("#eqRadio").prop("checked", true);
         $(".eq").removeClass("hidden");
         $(".chorus").addClass("hidden");
         $(".convolver").addClass("hidden");
         $(".pitch").addClass("hidden");
         $(".dynamics").addClass("hidden");
         $("#advancedLabel").addClass("hidden");
         $("#bypass").addClass("hidden");
         $(".advanced").addClass("hidden");
         $("#presets").removeClass("hidden");
         $("#resetLabel").removeClass("hidden");
         Preset.init("eq")
     };
}