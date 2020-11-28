/**
 * @copyright CreatorMars4 2020
 * @author creatormars4 creatormars4@gmail.com
 * Class Core
 * @file Core.js
 */
class Core {
    static load(key) {
        var data = window.localStorage[key];
        if (typeof data === "undefined") {
            return null;
        }
        try {
            return JSON.parse(data);
        } catch (e) {
            return data;
        }
    }

    static save(key, data) {
        if(key == undefined){
            return false;
        }
        localStorage[key] = data;
        return true;
    }
    static getLocalizedText(key) {
        return chrome.i18n.getMessage(key)
    }

    static isAdvanced() {
        return Core.load("advanced")
    }

    static isConvolverPreset() {
        return Core.load("convolverPreset")
    }

    static isChorusPreset() {
        return Core.load("chorusPreset")
    }

    static isLimiterPreset() {
        return Core.load("limiterPreset");
    }

    static isEqPreset() {
        return Core.load("eqPreset");
    }

    static isPitchPreset() {
        return Core.load("pitchPreset");
    }

    static isAutoLoadPreset() {
        return Core.load("autoLoadPreset");
    }

    static isConvolverBypass() {
        return Core.load("convolverBypass");
    }

    static isChorusBypass() {
        return Core.load("chorusBypass");
    }

    static isPitchBypass() {
        return Core.load("pitchBypass");
    }

    static isVolumePreset() {
        return Core.load("volumePreset");
    }

    static getUserID() {
        var uid = Core.load('uid');
        if (uid) {
            return uid;
        } else {
            var buf = new Uint32Array(4),
                idx = -1;
            window.crypto.getRandomValues(buf);
            uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                idx++;
                var r = (buf[idx >> 3] >> ((idx % 8) * 4)) & 15,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            Core.save('uid', uid);
            return uid;
        }
    }
}


