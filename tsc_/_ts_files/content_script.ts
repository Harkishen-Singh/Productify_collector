interface wordProps {
    word: string;
    indepWordWt: number;
    depWordWt: number;
    tags: string;
    occurence: number;
}

interface Server {
    currentURL: string;
    currentTITLE: string;
    data: any[];
    time: string;
    userName ?: string;

}

class Productify_Collector {
    private getAllText: string;
    protected totalWords: number;
    private wordsArray: string[] = new Array();
    private totalWordsLength: number;
    protected getAllTextFiltered: string;
    private lengthCounter: number=0;
    protected wordsArrayFinal: string[] = new Array();
    protected wordsArrayFinalSingle: string[] = new Array();
    protected customIcons: any[] = new Array();

    constructor() {
        this.getAllText = document.body.innerText;
        this.totalWordsLength = this.getAllText.length;
        // this.lengthCounter = this.totalWordsLength;
        // this.wordsArray = this.getAllText.split(' ');
        this.customIcons.push(chrome.extension.getURL('plus.png'));
    }

    illegalWordsFilter(letter: string) {
        if ((letter.charCodeAt(0) >= 65 && letter.charCodeAt(0) <= 90 ) || (letter.charCodeAt(0) >= 97 && letter.charCodeAt(0) <= 122 )) {
            return letter;
        } else {
            return 0;
        }
    }

    filterController() {
        while(this.totalWordsLength-this.lengthCounter) {
            if (this.illegalWordsFilter(this.getAllText[this.lengthCounter])) {
                this.getAllTextFiltered+=this.getAllText[this.lengthCounter];
            } else {
                this.getAllTextFiltered+=' ';
            }
            this.lengthCounter++;
            if (((this.totalWordsLength-this.lengthCounter)===0)) {
                this.wordsArray = this.getAllTextFiltered.split(' ')
                this.removeEmptyTypes(this.wordsArray);
            }
                
        }
    }

    removeEmptyTypes(arr: string[]) {
        for(let ele in arr) {
            if(arr[ele].length) {
                let found:boolean = false;
                for(let u in this.wordsArrayFinal) {
                    if(this.wordsArrayFinal[u] === arr[ele]) {
                        found = true;
                    }
                }
                if (found===false)
                    this.wordsArrayFinalSingle.push(arr[ele]);
                this.wordsArrayFinal.push(arr[ele]);
            }
        }
        this.totalWords = this.wordsArrayFinal.length;
    }

}

class Productify_Collector_Processor extends Productify_Collector {

    private indepWordWt: number;
    private depWordWt: number;
    private frequencyEachWord: any;
    private processedArraySendServer : object[];
    private tagValue: string;

    constructor() {
        super();
        this.frequencyEachWord = {};
        this.processedArraySendServer = new Array();
    }

    calculateFrequencyEachWord(word: string) {
        let count: number=0;
        // check similar types
        for(let a in this.frequencyEachWord) {
            if (this.frequencyEachWord.hasOwnProperty(a) && a === word) {
                return;
            }
        }

        for(let x in this.wordsArrayFinal) {
            if (this.wordsArrayFinal[x] === word) {
                count++;
                
            }
        }
        this.frequencyEachWord[word] = count; // making a dictionary
    }

    frequencyController() {
        for(let y in this.wordsArrayFinal) {
            this.calculateFrequencyEachWord(this.wordsArrayFinal[y]);
        }
        this.createHTMLTags();
        this.displaysA();
    }

    displaysA() {
        console.warn('word frequency below');
        console.warn(this.frequencyEachWord)
    }

    main(wordBlock: wordProps, word: string) {
        for(let x in this.frequencyEachWord) {
            if (this.frequencyEachWord.hasOwnProperty(x) && x === word) {
                this.indepWordWt = (this.frequencyEachWord[x] / 1)*100;
                this.depWordWt = (this.frequencyEachWord[x] / this.totalWords) * 100;
                this.depWordWt /= 1;
                if(word.substr(0,9)==='undefined'){
                    wordBlock.word = word.substr(9).toLowerCase();
                } else {
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
    }

    mainController(wordsArray: string[], serverObject: Server) {
        for(let w in wordsArray) {
            this.main({word:'', indepWordWt:0, depWordWt:0, tags:'', occurence:0}, wordsArray[w]);
        }
        console.warn('processed array to be sent to the server is below')
        console.warn(this.processedArraySendServer);
        serverObject = {
            currentURL: document.URL,
            currentTITLE: document.title,
            time: Date(),
            data: this.processedArraySendServer,
            userName: '' // to be filled in the later versions
        };
        this.serverCall(serverObject)
    }   

    createHTMLTags() {
        let plusButton: HTMLSpanElement = document.createElement('span'),
            image: HTMLImageElement = document.createElement('img');
        plusButton.style.padding = '20px';
        plusButton.style.minWidth = '80px';
        plusButton.style.backgroundColor = '#DCEDC8';
        plusButton.style.borderRadius = '10px';
        image.src = this.customIcons[0];
        image.style.position = 'fixed';
        image.style.left = '5%';
        image.style.bottom ='15%';
        image.style.height = "50px";
        image.onclick = () => {
            let inputSelect: HTMLSelectElement = document.createElement('select'),
                opt1: HTMLOptionElement = document.createElement('option'),
                opt2: HTMLOptionElement = document.createElement('option'),
                opt3: HTMLOptionElement = document.createElement('option'),
                opt4: HTMLOptionElement = document.createElement('option'),
                opt5: HTMLOptionElement = document.createElement('option'),
                opt6: HTMLOptionElement = document.createElement('option'),
                opt7: HTMLOptionElement = document.createElement('option'),
                opt8: HTMLOptionElement = document.createElement('option'),
                opt9: HTMLOptionElement = document.createElement('option'),
                opt10: HTMLOptionElement = document.createElement('option'),
                opt11: HTMLOptionElement = document.createElement('option'),
                opt12: HTMLOptionElement = document.createElement('option'),
                opt13: HTMLOptionElement = document.createElement('option'),
                opt14: HTMLOptionElement = document.createElement('option'),
                opt15: HTMLOptionElement = document.createElement('option'),
                opt16: HTMLOptionElement = document.createElement('option'),
                opt17: HTMLOptionElement = document.createElement('option'),
                opt18: HTMLOptionElement = document.createElement('option'),
                opt19: HTMLOptionElement = document.createElement('option');
            let a = document.createElement('select'),
            b= document.createElement('option');
            a.appendChild(b);
            opt1.appendChild(a);
            plusButton.style.position = 'fixed';
            plusButton.style.left = '5%';
            plusButton.style.bottom ='10%';
            inputSelect.style.backgroundColor = '#fff';
            inputSelect.style.padding = '7px';
            inputSelect.style.borderRadius = '5px';
            // asssigning values and innerHTML content
            opt1.value ='adultcontent';
            opt2.value ='communal';
            opt3.value ='politics';
            opt4.value ='ecommerce';
            opt5.value ='entertainment';
            opt6.value ='fashion';
            opt7.value ='food';
            opt8.value ='gaming';
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
            opt1.innerHTML ='Adult Content';
            opt2.innerHTML ='Communal';
            opt3.innerHTML ='Politics';
            opt4.innerHTML ='E-Commerce';
            opt5.innerHTML ='Entertainment';
            opt6.innerHTML ='Fashion';
            opt7.innerHTML ='Food';
            opt8.innerHTML ='Gaming';
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
            let message: HTMLParagraphElement = document.createElement('p');
            message.innerHTML = 'Select the <b>most appropriate tag</b> for this Page:<br/>';
            plusButton.appendChild(message)
            plusButton.appendChild(inputSelect);
            let submitB: HTMLButtonElement = document.createElement('button');
            submitB.innerHTML = 'Save';
            submitB.style.backgroundColor = 'blue';
            submitB.style.color = 'white';
            submitB.style.padding = '5px';
            submitB.style.borderRadius = '4px';
            submitB.style.marginLeft = '20px';
            submitB.onclick = () => {
                this.tagValue = inputSelect.value;
                document.body.removeChild(plusButton);
                plusButton.removeChild(submitB);
                plusButton.removeChild(message);
                plusButton.removeChild(inputSelect);
                this.mainController(this.wordsArrayFinalSingle, {currentTITLE:'', currentURL:'', data:[],time:'', userName:''});
            };
            plusButton.appendChild(submitB)
            document.body.appendChild(plusButton)
            document.body.removeChild(image);
        };

        // making input elements


        document.body.appendChild(image);
    }

    serverCall(object: any) {

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


    }

}

 
let obj: Productify_Collector_Processor = new Productify_Collector_Processor()
obj.filterController();
obj.frequencyController();