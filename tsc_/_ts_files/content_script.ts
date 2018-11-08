interface wordProps {
    word: string;
    indepWordWt: number;
    depWordWt: number;
    tags: string[];
}

class Productify_Collector {
    private getAllText: string;
    private totalWords: number;
    private wordsArray: string[] = new Array();
    private totalWordsLength: number;
    protected getAllTextFiltered: string;
    private lengthCounter: number=0;
    protected wordsArrayFinal: string[] = new Array();

    constructor() {
        this.getAllText = document.body.innerText;
        this.totalWordsLength = this.getAllText.length;
        // this.lengthCounter = this.totalWordsLength;
        // this.wordsArray = this.getAllText.split(' ');
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

    constructor() {
        super();
        this.frequencyEachWord = {};

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
        this.displaysA();
    }

    displaysA() {
        console.warn('word frequency below');
        console.warn(this.frequencyEachWord)
    }

    main(wordBlock: wordProps, word: string) {
        for(let x in this.frequencyEachWord) {
            if (this.frequencyEachWord.hasOwnProperty(x) && this.frequencyEachWord[x] === word) {
                let a: number=0;
            }
        }
    }
}











 
let obj: Productify_Collector_Processor = new Productify_Collector_Processor()
obj.filterController();
obj.frequencyController();