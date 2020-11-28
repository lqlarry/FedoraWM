/**
 * @copyright CreatorMars4 2020
 * @author creatormars4 creatormars4@gmail.com
 * Class Tabs
 * @extends TabHandler
 * @file Tabs.js
 */
class tabs extends TabHandler {
    tabInit(){
        switch (this.isType()) {
            case "eq":
                new Equalizer().show();
                break;
            case "chorus":
                new Chorus().show();
                break;
            case "limiter":
                new Limiter().show();
                break;
            case "convolver":
                new Convolver().show();
                break;
            case "pitch":
                new Pitch().show();
                break;
            default:
                new Equalizer().show();

        }
    }
}
const Tabs = new tabs();