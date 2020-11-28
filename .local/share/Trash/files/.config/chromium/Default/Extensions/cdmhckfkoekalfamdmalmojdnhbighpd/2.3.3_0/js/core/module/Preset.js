/**
 * @copyright CreatorMars4 2020
 * @author creatormars4 creatormars4@gmail.com
 * Class preset
 * @file Preset.js
 */
class preset {
    /**
     * @param tabName
     * @constructor
     */
    init(tabName) {
        switch (tabName) {
            case "eq":
                chrome.storage.sync.get("eqPreset", (data) => {
                    if (data.eqPreset != "" && "undefined" != typeof data.eqPreset) {
                        Popup.showLoad();
                        Core.save("eqPreset", true)
                    } else {
                        Popup.showSave()
                    }
                });
                break;
            case "limiter":
                chrome.storage.sync.get("limiterPreset",  (data) => {
                    if (data.limiterPreset != "" && typeof data.limiterPreset != "undefined") {
                        Core.save("limiterPreset", true);
                        Popup.showLoad();
                    } else {
                        Core.save("limiterPreset", false);
                        Popup.showSave()
                    }
                });
                break;
            case "chorus":
                chrome.storage.sync.get("chorusPreset", (data) => {
                        if (data.chorusPreset != "" && typeof data.chorusPreset != "undefined") {
                            Core.save("chorusPreset", true);
                            Popup.showLoad();
                        } else {
                            Core.save("chorusPreset", false);
                            Popup.showSave();
                        }
                    });
                break;
            case "convolver":
                chrome.storage.sync.get("convolverPreset",(data) => {
                    if ("" != data.convolverPreset && "undefined" != typeof data.convolverPreset) {
                        Core.save("convolverPreset", true);
                        Popup.showLoad();
                    } else {
                        Core.save("convolverPreset", false);
                        Popup.showSave();
                    }
                });
                break;
            case "pitch":
                chrome.storage.sync.get("pitchPreset", (data) => {
                    if ("" != data.pitchPreset && "undefined" != typeof data.pitchPreset) {
                        Core.save("pitchPreset", true);
                        Popup.showLoad()
                    } else {
                        Core.save("pitchPreset", "false");
                        Popup.showSave();
                    }
                });
        }
    }

    /**
     * @param name
     */
    loadPreset(name) {
        if (Core.load("volumePreset") == true) {
            var volume = $("#volume");
            volume.val(Core.load("volumePresetVal")).updateSlider();
            chrome.runtime.sendMessage({type: "volume", value: volume.val()})
        }
        switch (name) {
            case "limiterPreset":
                chrome.storage.sync.get("limiterPreset", (data) => {
                    $("#threshold").val(data.limiterPreset.threshold).updateSlider();
                    $("#ratio").val(data.limiterPreset.ratio).updateSlider();
                    $("#knee").val(data.limiterPreset.knee).updateSlider();
                    $("#attack").val(data.limiterPreset.attack).updateSlider();
                    $("#release").val(data.limiterPreset.release).updateSlider();
                    Popup.updateLimiterNumeric();
                    Popup.sendLimiter()
                });
                break;
            case "eqPreset":
                chrome.storage.sync.get("eqPreset", (data) => {
                    $("#eq_32").val(data.eqPreset.twenty).updateSlider();
                    $("#eq_64").val(data.eqPreset.fifty).updateSlider();
                    $("#eq_125").val(data.eqPreset.oneHundred).updateSlider();
                    $("#eq_250").val(data.eqPreset.twoHundred).updateSlider();
                    $("#eq_500").val(data.eqPreset.fiveHundred).updateSlider();
                    $("#eq_1000").val(data.eqPreset.oneThousand).updateSlider();
                    $("#eq_2k").val(data.eqPreset.twoThousand).updateSlider();
                    $("#eq_4k").val(data.eqPreset.fiveThousand).updateSlider();
                    $("#eq_8k").val(data.eqPreset.tenThousand).updateSlider();
                    $("#eq_16k").val(data.eqPreset.twentyThousand).updateSlider();
                    Popup.sendEq()
                });
                break;
            case "chorusPreset":
                chrome.storage.sync.get("chorusPreset", (data) => {
                    $("#chorusRate").val(data.chorusPreset.rate).updateSlider();
                    $("#chorusDepth").val(data.chorusPreset.depth).updateSlider();
                    $("#chorusFeedback").val(data.chorusPreset.feedback).updateSlider();
                    $("#chorusDelay").val(data.chorusPreset.delay).updateSlider();
                    Popup.updateChorusNumeric();
                    Popup.sendChorus()
                });
                break;
            case "convolverPreset":
                chrome.storage.sync.get("convolverPreset", (data) => {
                    $("#convolverWetLevel").val(data.convolverPreset.wetLevel).updateSlider();
                    $("#convolverDryLevel").val(data.convolverPreset.dryLevel).updateSlider();
                    $("#convolverHighCut").val(data.convolverPreset.highCut).updateSlider();
                    $("#convolverLowCut").val(data.convolverPreset.lowCut).updateSlider();



                    $("#convolverWetLevelVal").html(data.convolverPreset.wetLevel);
                    $("#convolverDryLevelVal").html(data.convolverPreset.dryLevel);
                    $("#convolverHighCutVal").html(data.convolverPreset.highCut);
                    $("#convolverLowCutVal").html(data.convolverPreset.lowCut);


                    Popup.updateConvolverNumeric();
                    Popup.sendConvolver()
                });
                break;
            case "pitchPreset":
                chrome.storage.sync.get("pitchPreset", (data) => {
                    $("#pitch").val(data.pitchPreset.value).updateSlider();
                    Popup.updatePitchNumeric();
                    Popup.sendPitch()
                })
        }
    }

    /**
     * @param name
     */
    savePreset (name) {
        if (Core.isVolumePreset()) {
            Core.save("volumePresetVal", $("#volume").val());
        }

        switch (name) {
            case "limiterPreset":
                Core.save("limiterPreset", true);
                chrome.storage.sync.set({
                    limiterPreset: {
                        threshold: $("#threshold").val(),
                        ratio: $("#ratio").val(),
                        knee: $("#knee").val(),
                        attack: $("#attack").val(),
                        release: $("#release").val()
                    }
                });
                break;
            case "eqPreset":
                Core.save("eqPreset", true);
                chrome.storage.sync.set({
                    eqPreset: {
                        twenty: $("#eq_32").val(),
                        fifty: $("#eq_64").val(),
                        oneHundred: $("#eq_125").val(),
                        twoHundred: $("#eq_250").val(),
                        fiveHundred: $("#eq_500").val(),
                        oneThousand: $("#eq_1000").val(),
                        twoThousand: $("#eq_2k").val(),
                        fiveThousand: $("#eq_4k").val(),
                        tenThousand: $("#eq_8k").val(),
                        twentyThousand: $("#eq_16k").val()
                    }
                });
                break;
            case "chorusPreset":
                Core.save("chorusPreset", true);
                chrome.storage.sync.set({
                    chorusPreset: {
                        rate: $("#chorusRate").val(),
                        depth: $("#chorusDepth").val(),
                        feedback: $("#chorusFeedback").val(),
                        delay: $("#chorusDelay").val()
                    }
                });
                break;
            case "convolverPreset":
                Core.save("convolverPreset", true);
                chrome.storage.sync.set({
                    convolverPreset: {
                        wetLevel: $("#convolverWetLevel").val(),
                        dryLevel: $("#convolverDryLevel").val(),
                        highCut:  $("#convolverHighCut").val(),
                        lowCut:   $("#convolverLowCut").val()
                    }
                });
                break;
            case "pitchPreset":
                Core.save("pitchPreset", true);
                chrome.storage.sync.set({pitchPreset: {value: $("#pitch").val()}});
                break;
        }
    }

    /**
     * @param name
     */
    deletePreset (name) {
        switch (name) {
            case "limiter":
                Core.save("limiterPreset", false);
                chrome.storage.sync.set({limiterPreset: ""});
                break;
            case "eq":
                Core.save("eqPreset", false);
                chrome.storage.sync.set({eqPreset: ""});
                break;
            case "chorus":
                Core.save("chorusPreset", false);
                chrome.storage.sync.set({chorusPreset: ""});
                break;
            case "convolver":
                Core.save("convolverPreset", false);
                chrome.storage.sync.set({convolverPreset: ""});
                break;
            case "pitch":
                Core.save("pitchPreset", false);
                chrome.storage.sync.set({pitchPreset: ""});
                break;
        }
    }

    /**
     * @param presetName
     */
    presetsChangeHandler (presetName) {
        chrome.storage.local.get(null, function (config) {
            let presets = config.presets;
            if(presets[presetName]){
                let pres = presets[presetName];
                $("#eq_32").val(pres[0]).updateSlider();
                $("#eq_64").val(pres[1]).updateSlider();
                $("#eq_125").val(pres[2]).updateSlider();
                $("#eq_250").val(pres[3]).updateSlider();
                $("#eq_500").val(pres[4]).updateSlider();
                $("#eq_1000").val(pres[5]).updateSlider();
                $("#eq_2k").val(pres[6]).updateSlider();
                $("#eq_4k").val(pres[7]).updateSlider();
                $("#eq_8k").val(pres[8]).updateSlider();
                $("#eq_16k").val(pres[9]).updateSlider();
            }
            config.tab.preset = presetName;
            chrome.storage.local.set({'tab': config.tab});
            Core.save("selected_eq", presetName);
            Popup.sendEq();
        }.bind(this));


    }
}
var Preset = new preset();