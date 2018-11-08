"use strict";
var Productify_Collector = /** @class */ (function () {
    function Productify_Collector() {
        this.wordsArray = new Array();
        this.lengthCounter = 0;
        this.wordsArrayFinal = new Array();
        this.getAllText = document.body.innerText;
        this.totalWordsLength = this.getAllText.length;
        // this.lengthCounter = this.totalWordsLength;
        // this.wordsArray = this.getAllText.split(' ');
    }
    Productify_Collector.prototype.illegalWordsFilter = function (letter) {
        if ((letter.charCodeAt(0) >= 65 && letter.charCodeAt(0) <= 90) || (letter.charCodeAt(0) >= 97 && letter.charCodeAt(0) <= 122)) {
            return letter;
        }
        else {
            return 0;
        }
    };
    Productify_Collector.prototype.filterController = function () {
        while (this.totalWordsLength - this.lengthCounter) {
            if (this.illegalWordsFilter(this.getAllText[this.lengthCounter])) {
                this.getAllTextFiltered += this.getAllText[this.lengthCounter];
            }
            else {
                this.getAllTextFiltered += ' ';
            }
            this.lengthCounter++;
            if (((this.totalWordsLength - this.lengthCounter) === 0)) {
                this.wordsArray = this.getAllTextFiltered.split(' ');
                this.removeEmptyTypes(this.wordsArray);
            }
        }
    };
    Productify_Collector.prototype.removeEmptyTypes = function (arr) {
        var _this = this;
        for (var ele in arr) {
            if (arr[ele].length) {
                this.wordsArrayFinal.push(arr[ele]);
            }
        }
        this.displays();
        setTimeout(function () { return _this.displays(); }, 2000);
    };
    Productify_Collector.prototype.displays = function () {
        console.warn('Entire wordsArray of the current webpage is below');
        console.warn(this.wordsArrayFinal);
    };
    return Productify_Collector;
}());
var obj = new Productify_Collector();
obj.filterController();
