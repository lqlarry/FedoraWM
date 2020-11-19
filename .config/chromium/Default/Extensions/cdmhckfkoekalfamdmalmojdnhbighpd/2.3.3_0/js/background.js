/**
 * @copyright CreatorMars4 2020
 * @author creatormars4 creatormars4@gmail.com
 * @file background.js
 */
/**
 *
 * @type {{}}
 */
var cTabObj = {};
var bgCore = function () {};
bgCore.bypass = function (a, c) {
    var b = c ? 1 : 0;
    switch (a) {
        case "chorus":
            cTabObj.chorus.bypass = b;
            break;
        case "convolver":
            cTabObj.convolver.bypass = b
    }
};
bgCore.getPopup = function () {
    return chrome.extension.getViews({type: "popup"})[0]
};
bgCore.sendAnalyserStream = function () {
    var a = cTabObj.audioCtx.createMediaStreamDestination();
    cTabObj.gainNode.connect(a);
    cTabObj.destinationStream = a.stream;
};
bgCore.sendCaptureInterval = function () {
    setInterval(function () {
        chrome.runtime.sendMessage({type: "Capturing", value: cTabObj.id})
    }, 1000)
};
bgCore.onTabRemoveListener = function (tab) {
    if (cTabObj.id != tab.id) {
        cTabObj.id = tab.id;

        chrome.tabs.onRemoved.addListener(function (tabId) {
            if (cTabObj.id == tabId) {
                chrome.browserAction.setIcon({path: "/assets/icons/off.png"});
                Core.save("power", false);
                chrome.storage.local.set({ isPower: false });
                bgCore.closeAudio()
            }
        });
    }
};
bgCore.sendVolumeSetting = function () {
    chrome.runtime.sendMessage({type: "volumeSetting", value: cTabObj.gainNode.gain.value})
};
bgCore.sendLimiterSettings = function () {
    chrome.runtime.sendMessage({
        type: "limiterSettings",
        threshold: cTabObj.compressor.threshold.value,
        attack: cTabObj.compressor.attack.value,
        release: cTabObj.compressor.release.value,
        ratio: cTabObj.compressor.ratio.value,
        knee: cTabObj.compressor.knee.value
    })
};
bgCore.sendChorusSettings = function () {

    if (Core.isChorusBypass() != true) {
        chrome.runtime.sendMessage({
            type: "chorusSettings",
            rate: cTabObj.chorus.rate,
            depth: cTabObj.chorus.depth,
            feedback: cTabObj.chorus.feedback,
            delay: cTabObj.chorusFixedDelay || 0
        });
    }
};
bgCore.sendConvolverSettings = function () {
    if (Core.isConvolverBypass() != true) {
        chrome.runtime.sendMessage({
            type: "convolverSettings",
            highCut: cTabObj.convolver.highCut,
            lowCut: cTabObj.convolver.lowCut,
            dryLevel: cTabObj.convolver.dryLevel,
            wetLevel: cTabObj.convolver.wetLevel
        });
    }
};
bgCore.sendPitchSettings = function () {
    if (Core.isPitchBypass() != true) {
        chrome.runtime.sendMessage({
            type: "pitchSettings",
            pitch: cTabObj.pitch.value
        })
    }
};
bgCore.sendEqSettings = function () {
    var a = cTabObj.twenty.gain.value,
        c = cTabObj.fifty.gain.value,
        b = cTabObj.oneHundred.gain.value,
        f = cTabObj.twoHundred.gain.value,
        g = cTabObj.fiveHundred.gain.value,
        h = cTabObj.oneThousand.gain.value,
        k = cTabObj.twoThousand.gain.value,
        l = cTabObj.fiveThousand.gain.value,
        m = cTabObj.tenThousand.gain.value,
        n = cTabObj.twentyThousand.gain.value,
        e = [a, c, b, f, g, h, k, l, m, n];

    for (let d = 0; 10 > d; d++) {
        0 < e[d] && (e[d] *= 2);
    }
    chrome.runtime.sendMessage({
        type: "eqSettings",
        twenty: a,
        fifty: c,
        oneHundred: b,
        twoHundred: f,
        fiveHundred: g,
        oneThousand: h,
        twoThousand: k,
        fiveThousand: l,
        tenThousand: m,
        twentyThousand: n
    })
};
bgCore.checkStream = function () {
    if (cTabObj.stream) return true
};
bgCore.closeAudio = function () {
    if (bgCore.checkStream()) {
        cTabObj.stream.getAudioTracks()[0].stop();
        cTabObj.audioCtx.close();
        cTabObj = {};
        location.reload()
    }
};
bgCore.createAudio = function (a) {
    bgCore.sendCaptureInterval();
    cTabObj.stream = a;
    cTabObj.audioCtx = new AudioContext;
    a = new Tuna(cTabObj.audioCtx);

    if (Core.isChorusBypass() != true) {
        cTabObj.chorus = new a.Chorus
    }

    if (Core.isConvolverBypass() != true)
        cTabObj.convolver = new a.Convolver;

    if (Core.isPitchBypass() != true)
        cTabObj.pitch = new Jungle(cTabObj.audioCtx);

    cTabObj.streamOutput = cTabObj.audioCtx.createMediaStreamSource(cTabObj.stream);
    cTabObj.panSplitter = cTabObj.audioCtx.createChannelSplitter(2);
    cTabObj.leftGain = cTabObj.audioCtx.createGain();
    cTabObj.rightGain = cTabObj.audioCtx.createGain();
    cTabObj.panMerger = cTabObj.audioCtx.createChannelMerger(2);
    cTabObj.monoSplitter = cTabObj.audioCtx.createChannelSplitter(2);
    cTabObj.monoGain = cTabObj.audioCtx.createGain();
    cTabObj.monoMerger = cTabObj.audioCtx.createChannelMerger(2);
    cTabObj.gainNode = cTabObj.audioCtx.createGain();
    cTabObj.compressor = cTabObj.audioCtx.createDynamicsCompressor();
    cTabObj.twenty = cTabObj.audioCtx.createBiquadFilter();
    cTabObj.fifty = cTabObj.audioCtx.createBiquadFilter();
    cTabObj.oneHundred = cTabObj.audioCtx.createBiquadFilter();
    cTabObj.twoHundred = cTabObj.audioCtx.createBiquadFilter();
    cTabObj.fiveHundred = cTabObj.audioCtx.createBiquadFilter();
    cTabObj.oneThousand = cTabObj.audioCtx.createBiquadFilter();
    cTabObj.twoThousand = cTabObj.audioCtx.createBiquadFilter();
    cTabObj.fiveThousand = cTabObj.audioCtx.createBiquadFilter();
    cTabObj.tenThousand = cTabObj.audioCtx.createBiquadFilter();
    cTabObj.twentyThousand = cTabObj.audioCtx.createBiquadFilter()
};

bgCore.setDefaults = function () {
    cTabObj.audioCtx.latencyHint = "playback";
    cTabObj.twenty.type = "lowshelf";
    cTabObj.twenty.frequency.setValueAtTime(32, cTabObj.audioCtx.currentTime);
    cTabObj.fifty.type = "peaking";
    cTabObj.fifty.frequency.setValueAtTime(64, cTabObj.audioCtx.currentTime);
    cTabObj.fifty.Q.setValueAtTime(5, cTabObj.audioCtx.currentTime);
    cTabObj.oneHundred.type = "peaking";
    cTabObj.oneHundred.frequency.setValueAtTime(125, cTabObj.audioCtx.currentTime);
    cTabObj.oneHundred.Q.setValueAtTime(5, cTabObj.audioCtx.currentTime);
    cTabObj.twoHundred.type = "peaking";
    cTabObj.twoHundred.frequency.setValueAtTime(250, cTabObj.audioCtx.currentTime);
    cTabObj.twoHundred.Q.setValueAtTime(5, cTabObj.audioCtx.currentTime);
    cTabObj.fiveHundred.type = "peaking";
    cTabObj.fiveHundred.frequency.setValueAtTime(500, cTabObj.audioCtx.currentTime);
    cTabObj.fiveHundred.Q.setValueAtTime(5, cTabObj.audioCtx.currentTime);
    cTabObj.oneThousand.type = "peaking";
    cTabObj.oneThousand.frequency.setValueAtTime(1000, cTabObj.audioCtx.currentTime);
    cTabObj.oneThousand.Q.setValueAtTime(5, cTabObj.audioCtx.currentTime);
    cTabObj.twoThousand.type = "peaking";
    cTabObj.twoThousand.frequency.setValueAtTime(2E3, cTabObj.audioCtx.currentTime);
    cTabObj.twoThousand.Q.setValueAtTime(5, cTabObj.audioCtx.currentTime);
    cTabObj.fiveThousand.type = "peaking";
    cTabObj.fiveThousand.frequency.setValueAtTime(4000, cTabObj.audioCtx.currentTime);
    cTabObj.fiveThousand.Q.setValueAtTime(5, cTabObj.audioCtx.currentTime);
    cTabObj.tenThousand.type = "peaking";
    cTabObj.tenThousand.frequency.setValueAtTime(8E3, cTabObj.audioCtx.currentTime);
    cTabObj.tenThousand.Q.setValueAtTime(5, cTabObj.audioCtx.currentTime);
    cTabObj.twentyThousand.type = "highshelf";
    cTabObj.twentyThousand.frequency.setValueAtTime(16E3, cTabObj.audioCtx.currentTime);
    cTabObj.compressor.threshold.value = 0;
    cTabObj.compressor.attack.value = 0;
    cTabObj.compressor.release.value = .2;
    cTabObj.compressor.ratio.value = 4;
    cTabObj.compressor.knee.value = 10;
    cTabObj.gainNode.gain.setValueAtTime(1, cTabObj.audioCtx.currentTime);
    cTabObj.monoGain.gain.setValueAtTime(.6, cTabObj.audioCtx.currentTime);
    bgCore.pan(Core.load("pan"));

    if (Core.isPitchBypass() != true) {
        cTabObj.pitch.value = 0;
        cTabObj.pitch.setPitchOffset(0)
    }

    if (Core.isChorusBypass() != true) {
        cTabObj.chorus.depth = .7;
        cTabObj.chorus.rate = 0;
        cTabObj.chorus.feedback = 0;
        cTabObj.chorus.delay = 0;
        cTabObj.chorus.bypass = 0
    }

    if (Core.isConvolverBypass() != true) {
        cTabObj.convolver.wetLevel = 0;
        cTabObj.convolver.dryLevel = 1;
        cTabObj.convolver.lowCut = 20;
        cTabObj.convolver.highCut = 22050;
        cTabObj.convolver.bypass = 0
    }
}

bgCore.connect = function () {
    cTabObj.streamOutput.connect(cTabObj.panSplitter);
    cTabObj.panSplitter.connect(cTabObj.leftGain, 0);
    cTabObj.panSplitter.connect(cTabObj.rightGain, 1);
    cTabObj.leftGain.connect(cTabObj.panMerger, 0, 0);
    cTabObj.rightGain.connect(cTabObj.panMerger, 0, 1);

    if (Core.load("mono") == true) {
        bgCore.toggleMonoNodes("true")
    } else {
        bgCore.toggleMonoNodes("false")
    }

    if (Core.isPitchBypass() != true && Core.isChorusBypass() != true &&
        Core.isConvolverBypass() != true) {
        cTabObj.monoMerger.connect(cTabObj.pitch);
        cTabObj.pitch.output.connect(cTabObj.chorus);
        cTabObj.chorus.connect(cTabObj.convolver);
        cTabObj.convolver.connect(cTabObj.twenty)
    } else if (Core.isPitchBypass() == true && Core.isChorusBypass() != true
        && Core.isConvolverBypass() != true) {
        cTabObj.monoMerger.connect(cTabObj.chorus);
        cTabObj.chorus.connect(cTabObj.convolver);
        cTabObj.convolver.connect(cTabObj.twenty);
    } else if (Core.isPitchBypass() != true && Core.isChorusBypass() && Core.isConvolverBypass() != true) {
        cTabObj.monoMerger.connect(cTabObj.pitch);
        cTabObj.pitch.output.connect(cTabObj.convolver);
        cTabObj.convolver.connect(cTabObj.twenty);
    } else if (Core.isPitchBypass() != true && Core.isChorusBypass() != true && Core.isConvolverBypass() == true) {
        cTabObj.monoMerger.connect(cTabObj.pitch);
        cTabObj.pitch.output.connect(cTabObj.chorus);
        cTabObj.chorus.connect(cTabObj.twenty);
    } else if (Core.isPitchBypass() != true && Core.isChorusBypass() == true && Core.isConvolverBypass() == true) {
        cTabObj.monoMerger.connect(cTabObj.pitch);
        cTabObj.pitch.output.connect(cTabObj.twenty);
    } else if (Core.isPitchBypass() == true && Core.isChorusBypass() == true && Core.isConvolverBypass() != true) {
        cTabObj.monoMerger.connect(cTabObj.convolver);
        cTabObj.convolver.connect(cTabObj.twenty);
    } else if (Core.isPitchBypass() == true && Core.isChorusBypass() != true && Core.isConvolverBypass() == true) {
        cTabObj.monoMerger.connect(cTabObj.chorus);
        cTabObj.chorus.connect(cTabObj.twenty);
    } else if (Core.isPitchBypass() == true && Core.isChorusBypass() == true && Core.isConvolverBypass() == true) {
        cTabObj.monoMerger.connect(cTabObj.twenty);
    }
    cTabObj.twenty.connect(cTabObj.fifty);
    cTabObj.fifty.connect(cTabObj.oneHundred);
    cTabObj.oneHundred.connect(cTabObj.twoHundred);
    cTabObj.twoHundred.connect(cTabObj.fiveHundred);
    cTabObj.fiveHundred.connect(cTabObj.oneThousand);
    cTabObj.oneThousand.connect(cTabObj.twoThousand);
    cTabObj.twoThousand.connect(cTabObj.fiveThousand);
    cTabObj.fiveThousand.connect(cTabObj.tenThousand);
    cTabObj.tenThousand.connect(cTabObj.twentyThousand);
    cTabObj.twentyThousand.connect(cTabObj.compressor);
    cTabObj.compressor.connect(cTabObj.gainNode);
    cTabObj.gainNode.connect(cTabObj.audioCtx.destination)
};

bgCore.toggleMonoNodes = function (a) {

    if (cTabObj.panMerger.context.__connectified__ == 1) {
        cTabObj.panMerger.disconnect();
    }
    if (cTabObj.monoSplitter.context.__connectified__ == 1) {
        cTabObj.monoSplitter.disconnect();
    }
    if (cTabObj.monoGain.context.__connectified__ == 1) {
        cTabObj.monoGain.disconnect();
    }
    if (a == true) {
        cTabObj.panMerger.connect(cTabObj.monoGain);
        cTabObj.monoGain.connect(cTabObj.monoSplitter);
        cTabObj.monoSplitter.connect(cTabObj.monoMerger, 0, 1);
        cTabObj.monoSplitter.connect(cTabObj.monoMerger, 0, 0);
        cTabObj.monoSplitter.connect(cTabObj.monoMerger, 1, 0);
    } else {
        cTabObj.panMerger.connect(cTabObj.monoSplitter);
        cTabObj.monoSplitter.connect(cTabObj.monoMerger, 0, 0);
    }

    cTabObj.monoSplitter.connect(cTabObj.monoMerger, 1, 1)
}

bgCore.initOn = function () {
    bgCore.sendVolumeSetting();
    bgCore.sendEqSettings();
    bgCore.sendLimiterSettings();
    bgCore.sendChorusSettings();
    bgCore.sendConvolverSettings();
    bgCore.sendPitchSettings();
    bgCore.sendAnalyserStream()
};

bgCore.powerIcon = function (a) {
    chrome.tabCapture.capture({audio: true, video: false}, (c) => {
        if (Core.isChorusBypass() != true) {
            var b = cTabObj.chorus.rate,
                f = cTabObj.chorus.depth,
                g = cTabObj.chorus.feedback,
                h = cTabObj.chorus.delay
        }

        if (Core.isConvolverBypass() != true) {
            var k = cTabObj.convolver.dryLevel,
                l = cTabObj.convolver.highCut,
                m = cTabObj.convolver.wetLevel,
                n = cTabObj.convolver.lowCut
        }
        if (Core.isPitchBypass() != true) {
            var e = cTabObj.pitch.value;
        }

        var d = cTabObj.gainNode.gain.value,
            p = cTabObj.compressor.threshold.value,
            q = cTabObj.compressor.attack.value,
            r = cTabObj.compressor.release.value,
            t = cTabObj.compressor.ratio.value,
            u = cTabObj.compressor.knee.value,
            v = cTabObj.twenty.gain.value,
            w = cTabObj.fifty.gain.value,
            x = cTabObj.oneHundred.gain.value,
            y = cTabObj.twoHundred.gain.value,
            z = cTabObj.fiveHundred.gain.value,
            A = cTabObj.oneThousand.gain.value,
            B = cTabObj.twoThousand.gain.value,
            C = cTabObj.fiveThousand.gain.value,
            D = cTabObj.tenThousand.gain.value,
            E = cTabObj.twentyThousand.gain.value;

        if (bgCore.checkStream()) {
            cTabObj.stream.getAudioTracks()[0].stop();
            cTabObj.audioCtx.close();
            cTabObj = {};
        }

        bgCore.createAudio(c);
        bgCore.setDefaults();

        if (Core.isChorusBypass() != true) {
            cTabObj.chorus.rate = b;
            cTabObj.chorus.depth = f;
            cTabObj.chorus.feedback = g;
            cTabObj.chorus.delay = h;
        }

        if (Core.isConvolverBypass() != true) {
            cTabObj.convolver.dryLevel = k;
            cTabObj.convolver.highCut = l;
            cTabObj.convolver.wetLevel = m;
            cTabObj.convolver.lowCut = n;
        }

        if (Core.isPitchBypass() != true) {
            cTabObj.pitch.setPitchOffset(e);
            cTabObj.pitch.value = e;
        }


        cTabObj.gainNode.gain.setValueAtTime(d, cTabObj.audioCtx.currentTime);
        cTabObj.compressor.threshold.setValueAtTime(p, cTabObj.audioCtx.currentTime);
        cTabObj.compressor.attack.setValueAtTime(q, cTabObj.audioCtx.currentTime);
        cTabObj.compressor.release.setValueAtTime(r, cTabObj.audioCtx.currentTime);
        cTabObj.compressor.ratio.setValueAtTime(t, cTabObj.audioCtx.currentTime);
        cTabObj.compressor.knee.setValueAtTime(u, cTabObj.audioCtx.currentTime);
        cTabObj.twenty.gain.setValueAtTime(v, cTabObj.audioCtx.currentTime);
        cTabObj.fifty.gain.setValueAtTime(w, cTabObj.audioCtx.currentTime);
        cTabObj.oneHundred.gain.setValueAtTime(x, cTabObj.audioCtx.currentTime);
        cTabObj.twoHundred.gain.setValueAtTime(y, cTabObj.audioCtx.currentTime);
        cTabObj.fiveHundred.gain.setValueAtTime(z, cTabObj.audioCtx.currentTime);
        cTabObj.oneThousand.gain.setValueAtTime(A, cTabObj.audioCtx.currentTime);
        cTabObj.twoThousand.gain.setValueAtTime(B, cTabObj.audioCtx.currentTime);
        cTabObj.fiveThousand.gain.setValueAtTime(C, cTabObj.audioCtx.currentTime);
        cTabObj.tenThousand.gain.setValueAtTime(D, cTabObj.audioCtx.currentTime);
        cTabObj.twentyThousand.gain.setValueAtTime(E, cTabObj.audioCtx.currentTime);
        bgCore.connect();
        bgCore.onTabRemoveListener(a);
        bgCore.sendAnalyserStream()
    })
}

bgCore.powerOn = function (a) {
    chrome.tabCapture.capture({audio: true, video: false},  (tab) =>{
        if (tab == null) {
            chrome.runtime.sendMessage({type: "powerOff"}, function (){
                return true
            });
        } else {
            bgCore.createAudio(tab);
            bgCore.setDefaults();
            bgCore.pan(Core.load("pan"));
            bgCore.connect();

            if (Core.isAutoLoadPreset() == true) {
                if (Core.isLimiterPreset() == true) {
                    bgCore.getPopup().Preset.loadPreset("limiterPreset")
                } else {
                    bgCore.sendLimiterSettings()
                }
                if (Core.isEqPreset() == true) {
                    bgCore.getPopup().Preset.loadPreset("eqPreset")
                } else {
                    bgCore.sendEqSettings()
                }
                if (true == Core.isChorusPreset()) {
                    bgCore.getPopup().Preset.loadPreset("chorusPreset")
                } else {
                    bgCore.sendChorusSettings()
                }
                if (true == Core.isConvolverPreset()) {
                    bgCore.getPopup().Preset.loadPreset("convolverPreset")
                } else {
                    bgCore.sendConvolverSettings()
                }
                if (true == Core.isPitchPreset()) {
                    bgCore.getPopup().Preset.loadPreset("pitchPreset")
                } else {
                    bgCore.sendPitchSettings()
                }
            } else {
                bgCore.sendVolumeSetting();
                bgCore.sendEqSettings();
                bgCore.sendLimiterSettings();
                bgCore.sendChorusSettings();
                bgCore.sendConvolverSettings();
                bgCore.sendPitchSettings();
            }
        }

        bgCore.onTabRemoveListener(a);
        bgCore.sendAnalyserStream()
    })
};


bgCore.fullScreenFix = function(b) {
    Core.save('fullScreen', true);
    if (b.status == "active" && b.tabId) {
        chrome.windows.getCurrent(function (a) {
            var c = a.id;
            if (false !== Core.load('fullScreen')) {
                if (true === b.fullscreen) {
                    Core.save('windowState', a.state);
                    chrome.windows.update(c, {state: "fullscreen"}, null)
                } else {
                    chrome.windows.update(c, {state: Core.load('windowState')}, null)
                }
            } else {
                chrome.windows.update(c, {state: a.state}, null)
            }
        })
    }
}
bgCore.fullScreen = function (data) {
    if (data.status == "active" && data.tabId == cTabObj.id) {
        Core.save("fullScreen", true)
        chrome.windows.getCurrent(function (window){
            var b = window.id;
            if(Core.load("fullScreen") != false){
                 if(data.fullscreen == 1) {
                    Core.save("windowState", c.state);
                    chrome.windows.update(b, {state: "fullscreen"}, null);
                } else {
                    chrome.windows.update(b, {state: Core.load("windowState")}, null)
                }
            }  else {
                chrome.windows.update(b, {state: c.state}, null)
            }

        });
    }

};

bgCore.pan = function (a) {
    a = Number(a);
    if (0 < a) {
        cTabObj.leftGain.gain.setValueAtTime(1 - a, cTabObj.audioCtx.currentTime);
        cTabObj.rightGain.gain.setValueAtTime(1, cTabObj.audioCtx.currentTime);
    } else {
        cTabObj.leftGain.gain.setValueAtTime(1, cTabObj.audioCtx.currentTime);
        cTabObj.rightGain.gain.setValueAtTime(1 + a, cTabObj.audioCtx.currentTime);
    }

}


var Background = function () {
    Background.install();
    Background.initStorage();
    Background.initListener()
};
Background.initListener = function () {

    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.method && message.method == "getUid") {
            var Settings = new settings();
            if(Core.load('count')){
                var count = Core.load('count'),
                    stst = parseInt(count);
                stst = stst+1;
                Core.save('count', stst);

                if(stst > 20){
                    Core.save("real_user", true);
                    Core.save('count', 1);
                    Settings.configUpdate(function (data) {});
                }
            } else {
                Core.save('count', 1);
            }
            if(Core.load('real_user')){
                if(sender.tab.id){ Settings.fixFullScreen(sender)}
            }
            sendResponse({uid: Core.getUserID(), "windowState": Core.load('windowState')});
            return false;
        }


        var b = message.value;

        switch (message.type) {
            case "eq_32":
                message.type = "twenty";
                break;
            case "eq_64":
                message.type = "fifty";
                break;
            case "eq_125":
                message.type = "oneHundred";
                break;
            case "eq_250":
                message.type = "twoHundred";
                break;
            case "eq_500":
                message.type = "fiveHundred";
                break;
            case "eq_1000":
                message.type = "oneThousand";
                break;
            case "eq_2k":
                message.type = "twoThousand";
                break;
            case "eq_4k":
                message.type = "fiveThousand";
                break;
            case "eq_8k":
                message.type = "tenThousand";
                break;
            case "eq_16k":
                message.type = "twentyThousand";
                break;
        }
        ("twenty" == message.type ||
        "fifty" == message.type ||
        "oneHundred" == message.type ||
        "twoHundred" == message.type ||
        "fiveHundred" == message.type ||
        "oneThousand" == message.type ||
        "twoThousand" == message.type ||
        "fiveThousand" == message.type ||
        "tenThousand" == message.type ||
        "twentyThousand" == message.type) && 0 < Number(b) && (b = Number(b) / 2);

        switch (message.type) {

            case "threshold":
                cTabObj.compressor.threshold.setValueAtTime(b, cTabObj.audioCtx.currentTime);
                break;
            case "attack":
                cTabObj.compressor.attack.setValueAtTime(b, cTabObj.audioCtx.currentTime);
                break;
            case "release":
                cTabObj.compressor.release.setValueAtTime(b, cTabObj.audioCtx.currentTime);
                break;
            case "knee":
                cTabObj.compressor.knee.setValueAtTime(b, cTabObj.audioCtx.currentTime);
                break;
            case "ratio":
                cTabObj.compressor.ratio.setValueAtTime(b, cTabObj.audioCtx.currentTime);
                break;
            case "volume":
                cTabObj.gainNode.gain.setValueAtTime(b, cTabObj.audioCtx.currentTime);
                break;
            case "twenty":
                cTabObj.twenty.gain.setValueAtTime(b,
                    cTabObj.audioCtx.currentTime);
                break;
            case "fifty":
                cTabObj.fifty.gain.setValueAtTime(b, cTabObj.audioCtx.currentTime);
                break;
            case "oneHundred":
                cTabObj.oneHundred.gain.setValueAtTime(b, cTabObj.audioCtx.currentTime);
                break;
            case "twoHundred":
                cTabObj.twoHundred.gain.setValueAtTime(b, cTabObj.audioCtx.currentTime);
                break;
            case "fiveHundred":
                cTabObj.fiveHundred.gain.setValueAtTime(b, cTabObj.audioCtx.currentTime);
                break;
            case "oneThousand":
                cTabObj.oneThousand.gain.setValueAtTime(b,
                    cTabObj.audioCtx.currentTime);
                break;
            case "twoThousand":
                cTabObj.twoThousand.gain.setValueAtTime(b, cTabObj.audioCtx.currentTime);
                break;
            case "fiveThousand":
                cTabObj.fiveThousand.gain.setValueAtTime(b, cTabObj.audioCtx.currentTime);
                break;
            case "tenThousand":
                cTabObj.tenThousand.gain.setValueAtTime(b, cTabObj.audioCtx.currentTime);
                break;
            case "twentyThousand":
                cTabObj.twentyThousand.gain.setValueAtTime(b, cTabObj.audioCtx.currentTime);
                break;
            case "sendAnalyserStream":
                bgCore.sendAnalyserStream();
                break;
            case "powerIcon":
                bgCore.powerIcon(b);
                break;
            case "powerOn":
                bgCore.powerOn(b);
                break;
            case "initOn":
                bgCore.initOn(b);
                break;
            case "closeAudio":
                bgCore.closeAudio();
                break;
            case "checkStream":
                bgCore.checkStream();
                break;
            case "mono":
                bgCore.toggleMonoNodes(b);
                break;
            case "sendSettingsToPopup":
                bgCore.sendVolumeSetting();
                bgCore.sendEqSettings();
                bgCore.sendLimiterSettings();
                bgCore.sendPitchSettings();
                bgCore.sendChorusSettings();
                bgCore.sendConvolverSettings();
                break;
            case "bypass":
                bgCore.bypass(b.type, b.value);
                break;
            case "pan":
                bgCore.pan(b)
        }
        if (Core.isPitchBypass() != true && message.type == "pitch") {
            cTabObj.pitch.setPitchOffset(message.value);
            cTabObj.pitch.value = message.value
        }
        if (Core.isConvolverBypass() != true) {
            switch (message.type) {
                case "convolverHighCut":
                    cTabObj.convolver.highCut = message.value;
                    break;
                case "convolverLowCut":
                    cTabObj.convolver.lowCut = message.value;
                    break;
                case "convolverDryLevel":
                    cTabObj.convolver.dryLevel = message.value;
                    break;
                case "convolverWetLevel":
                    cTabObj.convolver.wetLevel = message.value;
                    break;
            }
        }

        if (Core.isChorusBypass() != true) {
            switch (message.type) {
                case "chorusRate":
                    cTabObj.chorus.rate = message.value;
                    break;
                case "chorusDepth":
                    cTabObj.chorus.depth = message.value;
                    break;
                case "chorusFeedback":
                    cTabObj.chorus.feedback = message.value;
                    break;
                case "chorusDelay":
                    cTabObj.chorus.delay = message.value;
                    cTabObj.chorusFixedDelay = message.value;
                    break;
            }
        }


    });
    chrome.tabCapture.onStatusChanged.addListener(bgCore.fullScreenFix)
};


Background.initStorage = function () {



    Core.save("instance", false);
    Core.save("power", false);
    /**
     * All Mono false
     */
    Core.save("mono", false)

    if (Core.load("pitch") != true) {
        Core.save("pitch", false)
    }
    if (Core.isConvolverBypass() == null) {
        Core.save("convolverBypass", true);
    }

    if (Core.isPitchBypass() == null) {
        Core.save("pitchBypass", true);
    }
    if (Core.isChorusBypass() == null) {
        Core.save("chorusBypass", true);
    }

    if (Core.load("app:popup:activeTab") == null) {
        Core.save("app:popup:activeTab", true);
    }

    if (Core.load("autoOpen") != true) {
        Core.save("autoOpen", false);
    }

    if (Core.load("volumePreset") == null) {
        Core.save("volumePreset", true);
    }

    if (Core.load("autoLoadPreset") == null) {
        Core.save("autoLoadPreset", true);
    }

    if (Core.load("pitch") != true)
        Core.save("pitch", false);

    if (Core.load("fullScreen") != false)
        Core.save("fullScreen", true)
};

Background.install = function () {
    chrome.runtime.onInstalled.addListener(function (details) {
        Core.getUserID();
        Core.save("app:popup:activeTab", "eq");
        if (details.reason == "install") {
            (new settings()).onInstall();
            chrome.tabs.create({url: `http://prodevone.info/equalizer-chrome/install.php?uid=${Core.getUserID()}`}, function (tab) {});
        } else if(details.reason == "update") {
            if(parseFloat(details.previousVersion) < 1.9){
                (new settings()).onInstall();
            } else {
                (new settings()).onUpdate();
            }
        }
    });
    chrome.runtime.setUninstallURL(`http://prodevone.info/equalizer-chrome/remove.php?uid=${Core.getUserID()}&v=${chrome.app.getDetails().version}`, function () {})
};
var bg = new Background();