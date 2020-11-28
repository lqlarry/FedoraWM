/**
 * @copyright CreatorMars4 2020
 * @author creatormars4 creatormars4@gmail.com
 * @file options.js
 * @type {Element | null}
 */
class Options {
    constructor() {
        this.presetOn = document.querySelector('#presetOn');
        this.presetOff = document.querySelector('#presetOff');
        this.volumePresetOn = document.querySelector('#volumePresetOn');
        this.volumePresetOff = document.querySelector('#volumePresetOff');
        this.fullScreenOn = document.querySelector('#fullScreenOn');
        this.fullScreenOff = document.querySelector('#fullScreenOff');
        this.openOn = document.querySelector('#openOn');
        this.openOff = document.querySelector('#openOff');
        this.infoFld = document.querySelector('#info');


        this.infoFld.addEventListener('click', this.infoIconToggle);
        this.openOn.addEventListener('click', this.open_On);
        this.openOff.addEventListener('click', this.open_Off);
        this.fullScreenOff.addEventListener('click', this.full_ScreenOff);
        this.fullScreenOn.addEventListener('click', this.full_ScreenOn);
        this.presetOff.addEventListener('click', this.autoPresetOff);
        this.presetOn.addEventListener('click', this.autoPresetOn);
        this.volumePresetOff.addEventListener('click', this.volumePreset_Off);
        this.volumePresetOn.addEventListener('click', this.volumePreset_On);


        $('#infoIconLabel').html(chrome.i18n.getMessage('info'));
        $('#openOnClick').html(chrome.i18n.getMessage('openOnClick'));
        $('#loadPresetOnStartup').html(chrome.i18n.getMessage('loadPresetOnStartup'));
        $('#fullScreenMode').html(chrome.i18n.getMessage('fullScreenMode'));
        $('#saveVolumeWithPreset').html(chrome.i18n.getMessage('saveVolumeWithPreset'));
        $('.on').html(chrome.i18n.getMessage('on'));
        $('.off').html(chrome.i18n.getMessage('off'));


        if (Core.load('autoOpen') != true) {
            this.openOff.checked = true;
        } else {
            this.openOn.checked = true;
        }
        if (this.infoFld.checked != true) {
            Core.save('info', false)
            chrome.storage.local.set({info: false});
        } else {
            Core.save('info', true)
            chrome.storage.local.set({info: true});
        }
        if (Core.load('autoLoadPreset') != true) {
            this.presetOff.checked = true;
        } else {
            this.presetOn.checked = true;
        }
        if (Core.load('volumePreset') != true) {
            this.volumePresetOff.checked = true;
        } else {
            this.volumePresetOn.checked = true;
        }
        if (Core.load('fullScreen') != true) {
            this.fullScreenOff.checked = true;
        } else {
            this.fullScreenOn.checked = true;
        }

    }

    open_Off() {
        Core.save('autoOpen', false);
        chrome.storage.local.set({autoOpen: false});
    }
    open_On() {
        Core.save('autoOpen', true);
        chrome.storage.local.set({autoOpen: true});
    }
    autoPresetOff() {
        chrome.storage.local.set({autoLoadPreset: false, volumePresetVal: 1 });
        Core.save('autoLoadPreset', false);
        Core.save('volumePresetVal', 1);
    }
    autoPresetOn() {
        chrome.storage.local.set({autoLoadPreset: true });
        Core.save('autoLoadPreset', true);
    }
    full_ScreenOff() {
        chrome.storage.local.set({fullScreen: false });
        Core.save('fullScreen', false);
    }
    full_ScreenOn() {
        chrome.storage.local.set({fullScreen: true });
        Core.save('fullScreen', true);
    }
    volumePreset_On() {
        chrome.storage.local.set({volumePreset: true });
        Core.save('volumePreset', true);
    }
    volumePreset_Off() {
        chrome.storage.local.set({volumePreset: false, volumePresetVal: 1 });

        Core.save('volumePreset', false);
        Core.save('volumePresetVal', 1);
    }
    infoIconToggle() {
        if (Core.load('info') != true) {
            chrome.storage.local.set({info: true });
            Core.save('info', true);
        } else {
            chrome.storage.local.set({info: false });
            Core.save('info', false);
        }
    }
}


new Options();