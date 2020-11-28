/**
 * @copyright CreatorMars4 2020
 * @author creatormars4 creatormars4@gmail.com
 * Class TabHandler
 * @file TabHandler.js
 */
class TabHandler {
    isType(){
        return Core.load("app:popup:activeTab")
    }
    useChorus(){
        Core.save("app:popup:activeTab", "chorus")
    }
    useConvolver(){
        Core.save("app:popup:activeTab", "convolver")
    }
    usePitch(){
        Core.save("app:popup:activeTab", "pitch")
    }
    useEqualizer(){
        Core.save("app:popup:activeTab", "eq")
    }
    useLimiter(){
        Core.save("app:popup:activeTab", "limiter")
    }
}

