/**
 * @copyright CreatorMars4 2020
 * @author creatormars4 creatormars4@gmail.com
 * Class Instance
 * @file Instance.js
 */
class Instance{
    constructor(){

    }
   static isInstance(){
        if (Core.load("instance") == false)
            return window.onunload = function () {
                Core.save("instance", false)
            }, Core.save("instance", true), true
    }
}