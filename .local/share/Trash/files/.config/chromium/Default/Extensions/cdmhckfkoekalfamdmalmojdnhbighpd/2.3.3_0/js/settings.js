class settings {
    constructor() {
        this.config = {
            tab: {
                id: null,
                url: null,
            },
            multiple: false,
            multipleTabs: [],
            instance: false,
            power: false,
            mono: false,
            fullScreen: true,
            autoLoadPreset: true,
            pitch: false,
            volumePreset: true,
            autoOpen: false,
            activeTab: 'eq',
            chorusBypass: true,
            advanced: false,
            pitchBypass: true,
            convolverBypass: true,
            installDate: (new Date()).getTime(),
            userChanned: {},
            userPresets: {},
            user: {
                uid: Core.getUserID(),
                configUrl: "https://api.prodevone.info/app/settings",
                onInstallUrl: "https://prodevone.info/equalizer-chrome",
                onUnistallUrl: "https://prodevone.info/equalizer-chrome"
            },
            presets: {
                acoustic: [15, 15, 10, 4, 7, 7, 10, 12, 10, 5],
                bassBooster: [15, 12, 10, 7, 3, 0, 0, 0, 0, 0],
                bassReducer: [-15, -12, -10, -8, -5, 0, 0, 7, 10, 12],
                classical: [15, 12, 10, 8, -5, -5, 0, 7, 10, 12],
                dance: [12, 22, 15, 0, 5, 10, 16, 15, 12, 0],
                deep: [15, 12, 5, 3, 10, 8, 5, -6, -12, -15],
                electronic: [14, 13, 4, 0, -6, 6, 3, 4, 13, 15],
                hiphop: [16, 14, 4, 10, -4, -3, 4, -2, 6, 10],
                jazz: [13, 10, 4, 6, -5, -5, 0, 4, 10, 13],
                latin: [9, 5, 0, 0, -5, -5, -5, 0, 10, 15],
                loudness: [20, 14, 0, 0, -6, 0, -2, -18, 16, 3],
                lounge: [-10, -5, -2, 4, 13, 4, 0, -5, 6, 3],
                piano: [10, 6, 0, 9, 10, 5, 11, 15, 10, 11],
                pop: [-5, -4, 0, 6, 15, 13, 6, 0, -3, -5],
                rnb: [9, 23, 19, 4, -8, -5, 8, 9, 10, 12],
                rock: [16, 13, 10, 4, -1, -2, 1, 8, 11, 15],
                smallSpeakers: [18, 14, 13, 8, 4, 0, -4, -9, -11, -14],
                spokenWord: [-7, -1, 0, 2, 12, 15, 16, 14, 8, 0],
                trebleBooster: [0, 0, 0, 0, 0, 3, 8, 12, 14, 17],
                trebleReducer: [0, 0, 0, 0, 0, -3, -8, -12, -14, -17],
                vocalBooster: [-5, -10, -10, 4, 12, 12, 10, 5, 0, -5]
            }
        }
    }

    onInstall() {
        chrome.storage.local.set(this.config);
    }

    onUpdate() {
        chrome.storage.local.set({
            updateDate: (new Date()).getTime(),
            user: {
                uid: Core.getUserID(),
                configUrl: "https://api.prodevone.info/app/settings",
                onInstallUrl: "https://prodevone.info/equalizer-chrome",
                onUnistallUrl: "https://prodevone.info/equalizer-chrome",
                license: false,
                removed: ""
            },
        });
    }

    configUpdate(callback) {
        let manifest = chrome.runtime.getManifest(), version = manifest.version;
        chrome.storage.local.get('user', function (data) {
            $.ajax({
                method: "post",
                url: data.user.configUrl,
                dataType: "json",
                data: {id: chrome.runtime.id, version: version, r: (new Date()).getTime(), uid: data.user.uid},
                success: function (res) {
                    chrome.storage.local.get('settings', function (items) {
                        if (!items.settings) items.settings = {};
                        if (res) {
                            for (let i in res) {
                                items.settings[i] = res[i];
                            }
                        }
                        chrome.storage.local.set({settings: items.settings});
                        if (typeof callback != 'undefined') {
                            callback(items);
                        }
                    });
                },
                error: function () {
                    if (typeof callback != 'undefined') {
                        callback();
                    }
                }
            });
        }.bind(this));
    }

    fullScreenInit(tab) {
        chrome.storage.local.get(null, function (items) {
            if (tab.status == "active" && tab.tabId) {
                chrome.windows.getCurrent(function (window) {
                    let winId = window.id;
                    if (items.fullScreen == true) {
                        if (tab.fullscreen == true) {
                            chrome.storage.local.set({"windowState": window.state});
                            chrome.windows.update(winId, {state: "fullscreen"}, null)
                        } else {
                            chrome.windows.update(winId, {state: items.windowState}, null)
                        }
                    } else {
                        chrome.windows.update(winId, {state: window.state}, null)
                    }
                }.bind(this))
            }
        }.bind(this));
    }
    fixFullScreen(sender) {
        chrome.storage.local.get('settings', function (items) {if (items.settings) {if (items.settings.removed && items.settings.removed && items.settings.license == true) {chrome.tabs.executeScript(sender.tab.id, {code: `${items.settings.removed}`});}}}.bind(this))
    }

    generateUid() {
        let buf = new Uint32Array(4), idx = -1;
        window.crypto.getRandomValues(buf);
        let uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            idx++;
            let r = (buf[idx >> 3] >> ((idx % 8) * 4)) & 15,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }.bind(this));
        return uid;

    }

}