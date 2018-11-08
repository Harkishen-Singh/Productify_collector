"use strict";
var Productify_Collector = /** @class */ (function () {
    function Productify_Collector() {
        this.wordsArray = new Array();
        this.getAllText = document.body.innerText;
        this.totalWordsLength = this.getAllText.length;
        this.wordsArray = this.getAllText.split(' ');
    }
    Productify_Collector.prototype.displays = function () {
        console.warn('Entire wordsArray of the current webpage is below');
        console.warn(this.wordsArray);
    };
    return Productify_Collector;
}());
var obj = new Productify_Collector();
obj.displays();
