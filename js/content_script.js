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
        this.customIcons = new Array();
        this.getAllText = document.body.innerText;
        this.totalWordsLength = this.getAllText.length;
        // this.lengthCounter = this.totalWordsLength;
        // this.wordsArray = this.getAllText.split(' ');
        this.customIcons.push(chrome.extension.getURL('plus.png'));
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
        for (var ele in arr) {
            if (arr[ele].length) {
                this.wordsArrayFinal.push(arr[ele]);
            }
        }
        this.totalWords = this.wordsArrayFinal.length;
        this.displays();
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
        _this.processedArraySendServer = new Array();
        return _this;
    }
    Productify_Collector_Processor.prototype.calculateFrequencyEachWord = function (word) {
        var count = 0;
        // check similar types
        for (var a in this.frequencyEachWord) {
            // console.log(a)
            if (this.frequencyEachWord.hasOwnProperty(a) && a === word) {
                // console.warn('same word found in dictionary: '+word);
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
        this.createHTMLTags();
        this.displaysA();
    };
    Productify_Collector_Processor.prototype.displaysA = function () {
        console.warn('word frequency below');
        console.warn(this.frequencyEachWord);
    };
    Productify_Collector_Processor.prototype.main = function (wordBlock, word) {
        for (var x in this.frequencyEachWord) {
            if (this.frequencyEachWord.hasOwnProperty(x) && x === word) {
                var a = 0;
                this.indepWordWt = this.frequencyEachWord[x] / 1;
                this.depWordWt = this.frequencyEachWord[x] / this.totalWords;
                this.depWordWt /= 1;
                wordBlock.word = word;
                wordBlock.indepWordWt = this.indepWordWt;
                wordBlock.depWordWt = this.depWordWt;
            }
        }
    };
    Productify_Collector_Processor.prototype.mainController = function (wordsArray) {
    };
    Productify_Collector_Processor.prototype.createHTMLTags = function () {
        console.log('reached createTags');
        var plusButton = document.createElement('span'), image = document.createElement('img');
        image.src = this.customIcons[0];
        image.style.position = 'fixed';
        image.style.left = '5%';
        image.style.bottom = '15%';
        image.style.height = "50px";
        image.onclick = function () {
            alert('clicked');
            var inputSelect = document.createElement('select'), opt1 = document.createElement('option'), opt2 = document.createElement('option'), opt3 = document.createElement('option'), opt4 = document.createElement('option'), opt5 = document.createElement('option'), opt6 = document.createElement('option'), opt7 = document.createElement('option'), opt8 = document.createElement('option');
            inputSelect.style.position = 'fixed';
            inputSelect.style.left = '5%';
            inputSelect.style.bottom = '10%';
            // asssigning values and innerHTML content
            opt1.value = 'software';
            opt2.value = 'doctor';
            opt3.value = 'games';
            opt4.value = 'lawyer';
            opt5.value = 'lifestyle';
            opt6.value = 'movies';
            opt7.value = 'study';
            opt8.value = 'ecommerce';
            opt1.innerHTML = 'software';
            opt2.innerHTML = 'doctor';
            opt3.innerHTML = 'games';
            opt4.innerHTML = 'lawyer';
            opt5.innerHTML = 'lifestyle';
            opt6.innerHTML = 'movies';
            opt7.innerHTML = 'study';
            opt8.innerHTML = 'ecommerce';
            inputSelect.appendChild(opt1);
            inputSelect.appendChild(opt2);
            inputSelect.appendChild(opt3);
            inputSelect.appendChild(opt4);
            inputSelect.appendChild(opt5);
            inputSelect.appendChild(opt6);
            inputSelect.appendChild(opt7);
            inputSelect.appendChild(opt8);
            document.body.appendChild(inputSelect);
        };
        // making input elements
        plusButton.appendChild(image);
        document.body.appendChild(plusButton);
    };
    return Productify_Collector_Processor;
}(Productify_Collector));
var obj = new Productify_Collector_Processor();
obj.filterController();
obj.frequencyController();
