const is_debug = false;

/**
 * @copyright CreatorMars4 2020
 * @author creatormars4 creatormars4@gmail.com
 * Class Popup
 * @file Popup.js
 */
class Popup {
    constructor(){
        this.localize = new Localize();
        this.TabHandler= new TabHandler();
        if (Instance.isInstance) {
            this.backgroundListener();
            this.initButtonEvents();

            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                if (Core.load("power") == true) {
                    chrome.runtime.getBackgroundPage((background) => {
                        $("#volume").val(background.cTabObj.gainNode.gain.value).updateSlider()
                    });
                    if (Number(Core.load("id")) == tabs[0].id) {
                        Power.initOn()
                    } else if (Core.load("autoOpen") == true) {
                        Power.active();
                        $("#powerIcon").click()
                    } else {
                        chrome.runtime.sendMessage({type: "sendAnalyserStream"});
                        Power.active();
                    }

                } else {
                    chrome.runtime.getBackgroundPage(  (background) => {
                        if ("undefined" == typeof background.cTabObj.stream) {
                            Core.save("id", tabs[0].id);
                            chrome.runtime.sendMessage({
                                type: "powerOn",
                                value: tabs[0]
                            });
                            Power.visualOn(tabs[0])
                        }
                    });
                }

            })
        } else {
            $("body").remove();
            $("html").html(Core.getLocalizedText("instanceOpenAlready"))
                .css("padding", "10px");
            $("#hiddenBlock").show();
        }
    }
    static channelModal(body, title) {
        $("#modalBody").html(body);

        $("#modalTitle").html(title)
    }
    static setTitle(id){
        chrome.tabs.get(Number(id), (tab) => {
            $("#title").html(`<img style="width: 15px; height: 15px" src="${tab.favIconUrl}"/>  ${tab.title}`)
        });
    }
    static hideModules(){
        $("#modalOff").show();
        $("input[type=range]").prop("disabled", true);
        $("#hiddenBlock").show();
        $("#eq").hide();
        $("#qualizerTab").hide();
    }
    static showModules(){
        $("#modalOff").hide();
        $("input[type=range]").prop("disabled", false);
    }
    static showLoad(){
        $("#savePresetLabel").addClass("hidden");
        $("#delete").removeClass("hidden");
        $("#loadPresetLabel").removeClass("hidden")
    }
    static showSave(){
        $("#loadPresetLabel").addClass("hidden");
        $("#delete").addClass("hidden");
        $("#savePresetLabel").removeClass("hidden")
    }
    static advancedInit(){
        if (Core.isAdvanced() == true) {
            $("#thresholdLabel").html(Core.getLocalizedText("thresholdLabel"));
            $("#advancedLabel").addClass("fg-green");
            $(".advanced").removeClass("disabled");
        } else {
            $("#thresholdLabel").html(Core.getLocalizedText("dynamicsLabel"))
        }
    }
    static updateLimiterNumeric(){
        $("#thresholdVal").html($("#threshold").val());
        $("#attackVal").html($("#attack").val());
        $("#releaseVal").html($("#release").val());
        $("#kneeVal").html($("#knee").val());
        $("#ratioVal").html($("#ratio").val())
    }
    static updateChorusNumeric(){
        $("#chorusDelayVal").html($("#chorusDelay").val());
        $("#chorusFeedbackVal").html($("#chorusFeedback").val());
        $("#chorusRateVal").html($("#chorusRate").val());
        $("#chorusDepthVal").html($("#chorusDepth").val())
    }
    static updateConvolverNumeric(){
    }
    static updatePitchNumeric(){
        $("#pitchVal").html($("#pitch").val())
    }
    static sendChorus(){
        chrome.runtime.sendMessage({type: "chorusRate", value: $("#chorusRate").val()});
        chrome.runtime.sendMessage({type: "chorusDepth", value: $("#chorusDepth").val()});
        chrome.runtime.sendMessage({type: "chorusFeedback", value: $("#chorusFeedback").val()});
        chrome.runtime.sendMessage({type: "chorusDelay", value: $("#chorusDelay").val()})
    }
    static sendConvolver(){
        chrome.runtime.sendMessage({type: "convolverWetLevel", value: $("#convolverWetLevel").val()});
        chrome.runtime.sendMessage({type: "convolverDryLevel", value: $("#convolverDryLevel").val()});
        chrome.runtime.sendMessage({type: "convolverHighCut", value: $("#convolverHighCut").val()});
        chrome.runtime.sendMessage({type: "convolverLowCut", value: $("#convolverLowCut").val()})
    }
    static sendPitch(){
        chrome.runtime.sendMessage({type: "pitch", value: $("#pitch").val()})
    }
    static sendLimiter(){
        chrome.runtime.sendMessage({type: "threshold", value: $("#threshold").val()});
        chrome.runtime.sendMessage({type: "ratio", value: $("#ratio").val()});
        chrome.runtime.sendMessage({type: "knee", value: $("#knee").val()});
        chrome.runtime.sendMessage({type: "release", value: $("#release").val()});
        chrome.runtime.sendMessage({type: "attack", value: $("#attack").val()})
    }
    static sendEq(){
        chrome.runtime.sendMessage({type: "twenty", value: $("#eq_32").val()});
        chrome.runtime.sendMessage({type: "fifty", value: $("#eq_64").val()});
        chrome.runtime.sendMessage({type: "oneHundred", value: $("#eq_125").val()});
        chrome.runtime.sendMessage({type: "twoHundred", value: $("#eq_250").val()});
        chrome.runtime.sendMessage({type: "fiveHundred", value: $("#eq_500").val()});
        chrome.runtime.sendMessage({type: "oneThousand", value: $("#eq_1000").val()});
        chrome.runtime.sendMessage({type: "twoThousand", value: $("#eq_2k").val()});
        chrome.runtime.sendMessage({type: "fiveThousand", value: $("#eq_4k").val()});
        chrome.runtime.sendMessage({type: "tenThousand", value: $("#eq_8k").val()});
        chrome.runtime.sendMessage({type: "twentyThousand", value: $("#eq_16k").val()});
    }

    backgroundListener(){
        chrome.runtime.onMessage.addListener( (message) =>{
            if (message.type == "analyserModule") {
             }

            if (message.type == "chorusSettings") {
                $("#chorusRate").val(message.rate).updateSlider();
                $("#chorusRateVal").text(message.rate);
                $("#chorusDepth").val(message.depth).updateSlider();
                $("#chorusDepthVal").html(message.depth);
                $("#chorusFeedback").val(message.feedback).updateSlider();
                $("#chorusFeedbackVal").html(message.feedback);
                $("#chorusDelay").val(message.delay).updateSlider();
                $("#chorusDelayVal").html(message.delay);
                Popup.updateChorusNumeric();
            }

            if (message.type == "convolverSettings") {
                $("#convolverWetLevel").val(message.wetLevel).updateSlider();
                $("#convolverDryLevel").val(message.dryLevel).updateSlider();
                $("#convolverHighCut").val(message.highCut).updateSlider();
                $("#convolverLowCut").val(message.lowCut).updateSlider();

                $("#convolverWetLevelVal").html(message.wetLevel);
                $("#convolverDryLevelVal").html(message.dryLevel);
                $("#convolverHighCutVal").html(message.highCut);
                $("#convolverLowCutVal").html(message.lowCut);

                Popup.updateConvolverNumeric();
            }

            if (message.type == "pitchSettings") {
                $("#pitch").val(message.pitch).updateSlider();
                Popup.updatePitchNumeric();
            }
            if (message.type == "volumeSetting") {
                $("#volume").val(message.value).updateSlider();
            }

            if (message.type == "eqSettings") {
                $("#eq_32").val(message.twenty).updateSlider();
                $("#eq_64").val(message.fifty).updateSlider();
                $("#eq_125").val(message.oneHundred).updateSlider();
                $("#eq_250").val(message.twoHundred).updateSlider();
                $("#eq_500").val(message.fiveHundred).updateSlider();
                $("#eq_1000").val(message.oneThousand).updateSlider();
                $("#eq_2k").val(message.twoThousand).updateSlider();
                $("#eq_4k").val(message.fiveThousand).updateSlider();
                $("#eq_8k").val(message.tenThousand).updateSlider();
                $("#eq_16k").val(message.twentyThousand).updateSlider();
            }


            if (message.type == "limiterSettings") {
                $("#threshold").val(message.threshold).updateSlider();
                $("#attack").val(message.attack).updateSlider();
                $("#release").val(message.release).updateSlider();
                $("#ratio").val(message.ratio).updateSlider();
                $("#knee").val(message.knee).updateSlider();
                Popup.updateLimiterNumeric();
            }

            if (message.type == 'powerOff') {
                chrome.tabs.query({active: true, currentWindow: true},  (tab) => {
                    Power.off();
                    Popup.channelModal(tab[0].title, "Stream Unavailable")
                })
            }
        })
    }

    /**
     *
     */
    initButtonEvents(){
        const self = this;

        $("#gotoTab").on("click", () => {
            chrome.tabs.get(Number(Core.load("id")), (tab) => {
                chrome.tabs.highlight({
                    windowId: tab.windowId,
                    tabs: tab.index
                },  () => {
                });
            })
        });

        $("#buttonReset").on("click",  () => {
            chrome.runtime.sendMessage({type: "volume", value: 1});
            $("#volume").val(1).updateSlider();
            if (self.TabHandler.isType() == "limiter") {
                Reset.resetLimiterVals();
                Popup.sendLimiter();
                Popup.updateLimiterNumeric()
            }

            if (self.TabHandler.isType() == "eq") {
                Reset.resetEqVals();
                Popup.sendEq()
            }
            if (self.TabHandler.isType() == "chorus") {
                Reset.resetChorusVals();
                Popup.sendChorus();
                Popup.updateChorusNumeric();
            }
            if (self.TabHandler.isType() == "convolver") {
                Reset.resetConvolverVals();
                Popup.sendConvolver();
                Popup.updateConvolverNumeric();
            }
            if (self.TabHandler.isType() == "pitch") {
                Reset.resetPitchVals();
                Popup.sendPitch();
                Popup.updatePitchNumeric()
            }
        });
        $("#chorusRadio").on("click", () => {
            new Chorus().show()
        });
        $("#convolverRadio").on("click", () => {
            new Convolver().show()
        });
        $("#pitchRadio").on("click", () => {
            new Pitch().show()
        });

        $("#advancedLabel").on("click", () => {
            if ($(".advanced").hasClass("disabled")) {
                $("#thresholdLabel").html(Core.getLocalizedText("advancedLabel"));
                $(".advanced").removeClass("disabled");
                Core.save("advanced", true);
                $("#advancedLabel").addClass("fg-green");
            } else {
                Core.save("advanced", false);
                $("#thresholdLabel").html(Core.getLocalizedText("dynamicsLabel"));
                $("#advancedLabel").removeClass("fg-green");
                $(".advanced").addClass("disabled");
            }
        });

        $("#limiterRadio").on("click", () => {
            new Limiter().show()
        });

        $("#eqRadio").on("click", () => {
            new Equalizer().show()
        });
        $("#powerIcon").on("click", () => {
            Power.powerIcon()
        });
        $("#power").on("click", () => {
            Power.toggle()
        });
        $("#presets").on("change", (event) => {
            Preset.presetsChangeHandler(event.target.value)
        });

        $("#delete").on("click", () => {
            Core.save("volumePresetVal", 1);
            switch (self.TabHandler.isType()) {
                case "limiter":
                    Preset.deletePreset("limiter");
                    break;
                case "eq":
                    Preset.deletePreset("eq");
                    break;
                case "chorus":
                    Preset.deletePreset("chorus");
                    break;
                case "convolver":
                    Preset.deletePreset("convolver");
                    break;
                case "pitch":
                    Preset.deletePreset("pitch");
                    break;

            }
            Popup.showSave()
        });

        $("#buttonSavePreset").on("click", () => {
            switch (this.TabHandler.isType()) {
                case "limiter":
                    Preset.savePreset("limiterPreset");
                    break;
                case "eq":
                    Preset.savePreset("eqPreset");
                    break;
                case "chorus":
                    Preset.savePreset("chorusPreset");
                    break;
                case "convolver":
                    Preset.savePreset("convolverPreset");
                    break;
                case "pitch":
                    Preset.savePreset("pitchPreset");
                    break;
            }
            Popup.showLoad()
        });

        $("#optionsPage").on("click", () => {
            chrome.runtime.openOptionsPage();

        });

        $("#loadPresetLabel").on("click", () => {
            switch (self.TabHandler.isType()) {
                case "limiter":
                    Preset.loadPreset("limiterPreset");
                    break;
                case "eq":
                    Preset.loadPreset("eqPreset");
                    break;
                case "chorus":
                    Preset.loadPreset("chorusPreset");
                    break;
                case "convolver":
                    Preset.loadPreset("convolverPreset");
                    break;
                case "pitch":
                    Preset.loadPreset("pitchPreset");
                    break;
            }
        });

        $("#bypass").on("click", () => {
            Bypass.toggle()
        });
        var selected_eq = Core.load("selected_eq");
        if(selected_eq != null)
            $(`#presets option[value=${selected_eq}]`).attr('selected','selected')

    }

}

new Popup();
