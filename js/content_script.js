"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Productify_Collector_Processor = /** @class */ (function (_super) {
    __extends(Productify_Collector_Processor, _super);
    function Productify_Collector_Processor() {
        var _this = _super.call(this) || this;
        _this.frequencyEachWord = {};
        return _this;
    }
    Productify_Collector_Processor.prototype.calculateFrequencyEachWord = function (word) {
        var count = 0;
        // check similar types
        for (var a in this.frequencyEachWord) {
            if (this.frequencyEachWord.hasOwnProperty(a) && this.frequencyEachWord[a] === word) {
                console.warn('same word found in dictionary: ' + word);
                return;
            }
        }
        for (var x in this.wordsArrayFinal) {
            if (this.wordsArrayFinal[x] === word) {
                count++;
            }
        }
        this.frequencyEachWord[word] = count; // making a dictionary
    };
    Productify_Collector_Processor.prototype.frequencyController = function () {
        for (var y in this.wordsArrayFinal) {
            this.calculateFrequencyEachWord(this.wordsArrayFinal[y]);
        }
        this.displaysA();
    };
    Productify_Collector_Processor.prototype.displaysA = function () {
        console.warn('word frequency below');
        console.warn(this.frequencyEachWord);
    };
    return Productify_Collector_Processor;
}(Productify_Collector));
var obj = new Productify_Collector_Processor();
obj.filterController();
obj.frequencyController();
