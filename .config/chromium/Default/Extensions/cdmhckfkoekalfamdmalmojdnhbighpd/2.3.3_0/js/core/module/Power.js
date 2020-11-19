/**
 * @copyright CreatorMars4 2020
 * @author creatormars4 creatormars4@gmail.com
 * Class ModulePower
 * @extends Module
 * @file Power.js
 */
class ModulePower extends Module{
    toggle(){
        const self = this;
        if ($("#power").hasClass("off")) {
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                self.on(tabs[0])
            })
        } else {
            self.off()
        }
    }
    on(id){
        chrome.runtime.sendMessage({type: "powerOn", value: id});
        this.visualOn(id)
    }
    off(){
        var element = $("#volume")[0];
        chrome.runtime.sendMessage({type: "closeAudio"});
        this.visualOff();
        element.value = 1;
        element.updateBg();
        $("#editInBackground").hide();
        $("#gotoTab").hide();
    }
    visualOff(){
        Core.save("power", false);
        Core.save("id", null);
        Core.save("url", null);

        chrome.storage.local.set({ tab: {id: null, url: null, power: false},  power: false });

        $("#power").removeClass("on");
        $("#power").addClass("off");
        $("#power").text(chrome.i18n.getMessage("powerButtonOn"));

        Popup.hideModules();
        Popup.channelModal(chrome.i18n.getMessage("offMessage"), chrome.i18n.getMessage("offTitle"));
        chrome.browserAction.setIcon({path: "/assets/icons/off.png"});
        $("#title").html("")
    }
    visualOn(tab){
        Core.save("id", tab.id);
        Core.save("url", tab.url);
        Core.save("power", true);

        chrome.storage.local.get(null, function (config) {
            let item = config.tab;
            item.id = tab.id;
            item.url = tab.url;
            item.power = true;
            chrome.storage.local.set({ tab: item,  power: true });
        }.bind(this));


        $("#power").removeClass("off");
        $("#power").addClass("on");

        $("#power").text(chrome.i18n.getMessage("buttonOff"));

        chrome.browserAction.setIcon({path: "/assets/icons/on.png"});

        $("#eq").show();
        $("#equalizerTab").show();
        $("#modalOff").hide();

        Popup.showModules();
        Popup.advancedInit();
        Popup.setTitle(Core.load("id"));
        if(typeof Tabs == 'undefined'){
            new tabs().tabInit();
        } else {
            Tabs.tabInit()
        }

    }
    powerIcon(){
        const self = this;
        /**
         * Change next
         */
        chrome.tabs.query({active: true, currentWindow: true},  (tabs) =>  {
            if ($("#modalBody")[0].innerHTML == Core.getLocalizedText("offMessage")) {
                Power.on(tabs[0])
            } else if ($("#modalTitle")[0].innerHTML == Core.getLocalizedText("activeMessage")) {
                self.visualOn(tabs[0]);
                chrome.runtime.sendMessage({
                    type: "powerIcon",
                    value: tabs[0]
                })
            }
        })
    }
    initOn(){
        const self = this;
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) =>  {
            chrome.runtime.sendMessage({type: "initOn"});
            self.visualOn(tabs[0])
        });
    }
    active(){
        const self = this;
        chrome.tabs.get(Number(Core.load("id")),  (tabs) => {
            Popup.channelModal(tabs.title, chrome.i18n.getMessage("activeMessage"));

            $("#power").removeClass("off");
            $("#power").addClass("on");
            $("#power").text("Off");

            Popup.hideModules();
            new Tabs().tabInit();

            $("#visualizer").css({display: "inline"});
            $("#volume").attr("disabled", false);

            chrome.runtime.sendMessage({type: "sendSettingsToPopup"});

        })
    }
}

const Power = new ModulePower();
