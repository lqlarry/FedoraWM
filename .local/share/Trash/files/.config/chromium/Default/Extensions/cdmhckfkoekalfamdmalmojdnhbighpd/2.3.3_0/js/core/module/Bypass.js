/**
 * @copyright CreatorMars4 2020
 * @author creatormars4 creatormars4@gmail.com
 * Class BypassModule
 * @extends Module
 * @file Bypass.js
 */
class BypassModule extends Module{
    toggle(){
        let status = false;
        if ($("#bypass").hasClass("fg-green")) {
            $("#bypass").removeClass("fg-green");
            status = false
        } else {
            $("#bypass").addClass("fg-green");
            status = true;
        }
        if (this.isType() == "chorus") {
            Core.save("chorusBypass", status);
        }
        if (this.isType() == "pitch") {
            Core.save("pitchBypass", status);
            if (status == false) {
                $("#power").click();
            }
        }

        if (this.isType() == 'convolver') {
            Core.save("convolverBypass", status);
        }
        Power.off()
    }

    init(){
        if (this.isType() == 'chorus') {
            if(Core.isChorusBypass() == true) {
                if($("#bypass").addClass("fg-green")) {
                    if(true == Core.isConvolverBypass()) {
                        $("#bypass").addClass("fg-green")
                    } else if("pitch" == TabHandler.isType()) {
                        if(1 == Core.isPitchBypass()){
                            $("#bypass").addClass("fg-green")
                        }
                    }
                }
            }
        }
    }
}
const Bypass = new BypassModule();