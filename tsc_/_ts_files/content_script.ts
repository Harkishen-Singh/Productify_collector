interface wordProps {
    word: string;
    indepWordWt: number;
    depWordWt: number;
    tags: string[];
}

class Productify_Collector {
    private getAllText: string;
    protected totalWords: number;
    private wordsArray: string[] = new Array();
    private totalWordsLength: number;
    protected getAllTextFiltered: string;
    private lengthCounter: number=0;
    protected wordsArrayFinal: string[] = new Array();
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
                this.wordsArrayFinal.push(arr[ele]);
            }
        }
        this.totalWords = this.wordsArrayFinal.length;
        this.displays();
    }

    displays() {
        console.warn('Entire wordsArray of the current webpage is below');
        console.warn(this.wordsArrayFinal);
    }

}

class Productify_Collector_Processor extends Productify_Collector {

    private indepWordWt: number;
    private depWordWt: number;
    private frequencyEachWord: any;
    private processedArraySendServer : object[];

    constructor() {
        super();
        this.frequencyEachWord = {};
        this.processedArraySendServer = new Array();
    }

    calculateFrequencyEachWord(word: string) {
        let count: number=0;
        // check similar types
        for(let a in this.frequencyEachWord) {
            // console.log(a)
            if (this.frequencyEachWord.hasOwnProperty(a) && a === word) {
                // console.warn('same word found in dictionary: '+word);
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
                let a: number=0;
                this.indepWordWt = this.frequencyEachWord[x] / 1;
                this.depWordWt = this.frequencyEachWord[x] / this.totalWords;
                this.depWordWt /= 1;
                wordBlock.word = word;
                wordBlock.indepWordWt = this.indepWordWt;
                wordBlock.depWordWt = this.depWordWt;
            }
        }
    }

    mainController(wordsArray: string[]) {

    }

    createHTMLTags() {
        console.log('reached createTags')
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
                opt8: HTMLOptionElement = document.createElement('option');
            plusButton.style.position = 'fixed';
            plusButton.style.left = '5%';
            plusButton.style.bottom ='10%';
            inputSelect.style.backgroundColor = '#fff';
            inputSelect.style.padding = '7px';
            inputSelect.style.borderRadius = '5px';
            // asssigning values and innerHTML content
            opt1.value ='software';
            opt2.value ='doctor';
            opt3.value ='games';
            opt4.value ='lawyer';
            opt5.value ='lifestyle';
            opt6.value ='movies';
            opt7.value ='study';
            opt8.value ='ecommerce';
            opt1.innerHTML ='software';
            opt2.innerHTML ='doctor';
            opt3.innerHTML ='games';
            opt4.innerHTML ='lawyer';
            opt5.innerHTML ='lifestyle';
            opt6.innerHTML ='movies';
            opt7.innerHTML ='study';
            opt8.innerHTML ='ecommerce';
            inputSelect.appendChild(opt1);
            inputSelect.appendChild(opt2);
            inputSelect.appendChild(opt3);
            inputSelect.appendChild(opt4);
            inputSelect.appendChild(opt5);
            inputSelect.appendChild(opt6);
            inputSelect.appendChild(opt7);
            inputSelect.appendChild(opt8);
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
                document.body.removeChild(plusButton);
                plusButton.removeChild(submitB);
                plusButton.removeChild(message);
                plusButton.removeChild(inputSelect)
            };
            plusButton.appendChild(submitB)
            document.body.appendChild(plusButton)
            document.body.removeChild(image);
        };

        // making input elements


        document.body.appendChild(image);
    }

}











 
let obj: Productify_Collector_Processor = new Productify_Collector_Processor()
obj.filterController();
obj.frequencyController();