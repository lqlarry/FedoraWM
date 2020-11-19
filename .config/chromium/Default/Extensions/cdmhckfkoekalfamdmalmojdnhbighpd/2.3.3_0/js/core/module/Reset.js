/**
 * @copyright CreatorMars4 2020
 * @author creatormars4 creatormars4@gmail.com
 * Class Reset
 * @file Reset.js
 */
class Reset {
    static resetChorusVals(){
        $("#chorusRate").val(0).updateSlider();
        $("#chorusDepth").val(.7).updateSlider();
        $("#chorusFeedback").val(0).updateSlider();
        $("#chorusDelay").val(0).updateSlider();
    }
    static resetConvolverVals(){
        $("#convolverWetLevel").val(0).updateSlider();
        $("#convolverDryLevel").val(1).updateSlider();
        $("#convolverHighCut").val(22050).updateSlider();
        $("#convolverLowCut").val(20).updateSlider();
     }
    static resetPitchVals(){
        $("#pitch").val(0).updateSlider()
    }
    static resetEqVals(){
        $("#eq_32").val(0).updateSlider();
        $("#eq_64").val(0).updateSlider();
        $("#eq_125").val(0).updateSlider();
        $("#eq_250").val(0).updateSlider();
        $("#eq_500").val(0).updateSlider();
        $("#eq_1000").val(0).updateSlider();
        $("#eq_2k").val(0).updateSlider();
        $("#eq_4k").val(0).updateSlider();
        $("#eq_8k").val(0).updateSlider();
        $("#eq_16k").val(0).updateSlider()
    }
    static resetLimiterVals(){
        $("#threshold").val(0).updateSlider();
        $("#ratio").val(4).updateSlider();
        $("#knee").val(10).updateSlider();
        $("#volume").val(1).updateSlider();
        $("#release").val(.2).updateSlider();
        $("#attack").val(0).updateSlider()
    }
}



