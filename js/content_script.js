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
        this.wordsArrayFinalSingle = new Array();
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
                var found = false;
                for (var u in this.wordsArrayFinal) {
                    if (this.wordsArrayFinal[u] === arr[ele]) {
                        found = true;
                    }
                }
                if (found === false)
                    this.wordsArrayFinalSingle.push(arr[ele]);
                this.wordsArrayFinal.push(arr[ele]);
            }
        }
        this.totalWords = this.wordsArrayFinal.length;
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
            if (this.frequencyEachWord.hasOwnProperty(a) && a === word) {
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
                this.indepWordWt = (this.frequencyEachWord[x] / 1) * 100;
                this.depWordWt = (this.frequencyEachWord[x] / this.totalWords) * 100;
                this.depWordWt /= 1;
                if (word.substr(0, 9) === 'undefined') {
                    wordBlock.word = word.substr(9).toLowerCase();
                }
                else {
                    wordBlock.word = word.toLowerCase();
                }
                wordBlock.indepWordWt = this.indepWordWt;
                wordBlock.depWordWt = this.depWordWt;
                wordBlock.tags = (this.tagValue).toLowerCase();
                wordBlock.occurence = this.frequencyEachWord[x];
                this.processedArraySendServer.push(wordBlock);
                return wordBlock;
            }
        }
    };
    Productify_Collector_Processor.prototype.mainController = function (wordsArray, serverObject) {
        for (var w in wordsArray) {
            this.main({ word: '', indepWordWt: 0, depWordWt: 0, tags: '', occurence: 0 }, wordsArray[w]);
        }
        console.warn('processed array to be sent to the server is below');
        console.warn(this.processedArraySendServer);
        serverObject = {
            currentURL: document.URL,
            currentTITLE: document.title,
            time: Date(),
            data: this.processedArraySendServer,
            userName: '' // to be filled in the later versions
        };
        this.serverCall(serverObject);
    };
    Productify_Collector_Processor.prototype.createHTMLTags = function () {
        var _this = this;
        var plusButton = document.createElement('span'), image = document.createElement('img');
        plusButton.style.padding = '20px';
        plusButton.style.minWidth = '80px';
        plusButton.style.backgroundColor = '#DCEDC8';
        plusButton.style.borderRadius = '10px';
        image.src = this.customIcons[0];
        image.style.position = 'fixed';
        image.style.left = '5%';
        image.style.bottom = '15%';
        image.style.height = "50px";
        image.onclick = function () {
            var inputSelect = document.createElement('select'), opt1 = document.createElement('option'), opt2 = document.createElement('option'), opt3 = document.createElement('option'), opt4 = document.createElement('option'), opt5 = document.createElement('option'), opt6 = document.createElement('option'), opt7 = document.createElement('option'), opt8 = document.createElement('option'), opt9 = document.createElement('option'), opt10 = document.createElement('option'), opt11 = document.createElement('option'), opt12 = document.createElement('option'), opt13 = document.createElement('option'), opt14 = document.createElement('option'), opt15 = document.createElement('option'), opt16 = document.createElement('option'), opt17 = document.createElement('option'), opt18 = document.createElement('option'), opt19 = document.createElement('option');
            var a = document.createElement('select'), b = document.createElement('option');
            a.appendChild(b);
            opt1.appendChild(a);
            plusButton.style.position = 'fixed';
            plusButton.style.left = '5%';
            plusButton.style.bottom = '10%';
            inputSelect.style.backgroundColor = '#fff';
            inputSelect.style.padding = '7px';
            inputSelect.style.borderRadius = '5px';
            // asssigning values and innerHTML content
            opt1.value = 'adultcontent';
            opt2.value = 'communal';
            opt3.value = 'politics';
            opt4.value = 'ecommerce';
            opt5.value = 'entertainment';
            opt6.value = 'fashion';
            opt7.value = 'food';
            opt8.value = 'gaming';
            opt9.value = 'hatespeech';
            opt10.value = 'health';
            opt11.value = 'knowledge';
            opt12.value = 'medic';
            opt13.value = 'softwareDevelopment';
            opt14.value = 'sports';
            opt15.value = 'study';
            opt16.value = 'technology';
            opt17.value = 'violence';
            opt18.value = 'wildlife';
            opt19.value = 'others';
            opt1.innerHTML = 'Adult Content';
            opt2.innerHTML = 'Communal';
            opt3.innerHTML = 'Politics';
            opt4.innerHTML = 'E-Commerce';
            opt5.innerHTML = 'Entertainment';
            opt6.innerHTML = 'Fashion';
            opt7.innerHTML = 'Food';
            opt8.innerHTML = 'Gaming';
            opt9.innerHTML = 'Hate Speech';
            opt10.innerHTML = 'Health';
            opt11.innerHTML = 'Knowledge';
            opt12.innerHTML = 'Medic';
            opt13.innerHTML = 'Software Development';
            opt14.innerHTML = 'Sports';
            opt15.innerHTML = 'Study';
            opt16.innerHTML = 'Technology';
            opt17.innerHTML = 'Violence';
            opt18.innerHTML = 'WildLife';
            opt19.innerHTML = 'Others';
            inputSelect.appendChild(opt1);
            inputSelect.appendChild(opt2);
            inputSelect.appendChild(opt3);
            inputSelect.appendChild(opt4);
            inputSelect.appendChild(opt5);
            inputSelect.appendChild(opt6);
            inputSelect.appendChild(opt7);
            inputSelect.appendChild(opt8);
            inputSelect.appendChild(opt9);
            inputSelect.appendChild(opt10);
            inputSelect.appendChild(opt11);
            inputSelect.appendChild(opt12);
            inputSelect.appendChild(opt13);
            inputSelect.appendChild(opt14);
            inputSelect.appendChild(opt15);
            inputSelect.appendChild(opt16);
            inputSelect.appendChild(opt17);
            inputSelect.appendChild(opt18);
            inputSelect.appendChild(opt19);
            var message = document.createElement('p');
            message.innerHTML = 'Select the <b>most appropriate tag</b> for this Page:<br/>';
            plusButton.appendChild(message);
            plusButton.appendChild(inputSelect);
            var submitB = document.createElement('button');
            submitB.innerHTML = 'Save';
            submitB.style.backgroundColor = 'blue';
            submitB.style.color = 'white';
            submitB.style.padding = '5px';
            submitB.style.borderRadius = '4px';
            submitB.style.marginLeft = '20px';
            submitB.onclick = function () {
                _this.tagValue = inputSelect.value;
                document.body.removeChild(plusButton);
                plusButton.removeChild(submitB);
                plusButton.removeChild(message);
                plusButton.removeChild(inputSelect);
                _this.mainController(_this.wordsArrayFinalSingle, { currentTITLE: '', currentURL: '', data: [], time: '', userName: '' });
            };
            plusButton.appendChild(submitB);
            document.body.appendChild(plusButton);
            document.body.removeChild(image);
        };
        // making input elements
        document.body.appendChild(image);
    };
    Productify_Collector_Processor.prototype.serverCall = function (object) {
        // let xhttp = new XMLHttpRequest();
        // xhttp.onreadystatechange = function() {
        //     if (this.status == 299) {
        //         console.warn(xhttp.response)
        //     }
        //   };
        // var params = '?object='+JSON.stringify(object);
        // xhttp.open('POST', 'http://0.0.0.0:5000/keys'+params, true);
        // // xhttp.open('POST', 'http://18.224.229.228:5000/keys'+params, true);
        // xhttp.send();
        // socket codes
        var socket = io.connect('https://productify-server.herokuapp.com/');
        socket.emit('datamessage', {
            message: JSON.stringify(object)
        });
    };
    return Productify_Collector_Processor;
}(Productify_Collector));
var obj = new Productify_Collector_Processor();
obj.filterController();
obj.frequencyController();
