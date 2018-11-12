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
                opt19: HTMLOptionElement = document.createElement('option'),
                opt20: HTMLOptionElement = document.createElement('option');
            plusButton.style.position = 'fixed';
            plusButton.style.left = '5%';
            plusButton.style.bottom ='10%';
            inputSelect.style.backgroundColor = '#fff';
            inputSelect.style.padding = '7px';
            inputSelect.style.borderRadius = '5px';
            // asssigning values and innerHTML content
            opt1.value ='software';
            opt2.value ='doctorAndHealth';
            opt3.value ='games';
            opt4.value ='lawyer';
            opt5.value ='lifestyle';
            opt6.value ='movies';
            opt7.value ='study';
            opt8.value ='ecommerce';
            opt9.value = 'socialMedia';
            opt10.value = 'searchengine';
            opt11.value = 'encyclopedia';
            opt12.value = 'employmentOrientedSocialNetwork';
            opt13.value = 'onlineOfficeSuite';
            opt14.value = 'instantMessaging';
            opt15.value = 'musicStreaming';
            opt16.value = 'weatherForecasting';
            opt17.value = 'news';
            opt18.value = 'technologyProducts';
            opt19.value = 'paymentSystem';
            opt20.value = 'others';
            opt1.innerHTML ='Software and Information Technology';
            opt2.innerHTML ='Doctor & Health';
            opt3.innerHTML ='Games';
            opt4.innerHTML ='Lawyer';
            opt5.innerHTML ='Lifestyle';
            opt6.innerHTML ='Movies';
            opt7.innerHTML ='Study';
            opt8.innerHTML ='E-Commerce';
            opt9.innerHTML = 'Social Media';
            opt10.innerHTML = 'Search Engine';
            opt11.innerHTML = 'Encyclopedia';
            opt12.innerHTML = 'Employment-Oriented Social Network';
            opt13.innerHTML = 'Online Office Suite';
            opt14.innerHTML = 'Instant Messaging';
            opt15.innerHTML = 'Music Streaming';
            opt16.innerHTML = 'weatherForecasting';
            opt17.innerHTML = 'News';
            opt18.innerHTML = 'Technology Products';
            opt19.innerHTML = 'Payment System';
            opt20.innerHTML = 'General / Others';
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
            inputSelect.appendChild(opt20);
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

        let xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = function() {
            if (this.status == 299) {
                console.warn(xhttp.response)
            }
          };
        console.log(JSON.stringify(object))
        var params = '?object='+JSON.stringify(object);
        xhttp.open('POST', 'https://productify-server.herokuapp.com/keys'+params, true);
        xhttp.send();
        
    }

}











 
let obj: Productify_Collector_Processor = new Productify_Collector_Processor()
obj.filterController();
obj.frequencyController();