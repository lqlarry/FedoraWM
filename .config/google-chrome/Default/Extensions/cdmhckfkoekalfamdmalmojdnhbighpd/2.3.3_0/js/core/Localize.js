/**
 * @copyright CreatorMars4 2020
 * @author creatormars4 creatormars4@gmail.com
 * Class Localize
 * @file Localize.js
 */
class Localize{
    constructor(){
        $("[translate]").each(function (element) {
            $(this).html(
                chrome.i18n.getMessage($(this).attr('translate')) == "" ? $(this).attr('translate') : chrome.i18n.getMessage($(this).attr('translate'))
            );
        });

    }
}
