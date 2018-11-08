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
    private getAllTextFiltered: string;
    private lengthCounter: number=0;
    private wordsArrayFinal: string[] = new Array();

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
        setTimeout(()=> this.displays(), 2000);
    }

    displays() {
        console.warn('Entire wordsArray of the current webpage is below');
        console.warn(this.wordsArrayFinal);
    }

}
 
let obj: Productify_Collector = new Productify_Collector()
obj.filterController();