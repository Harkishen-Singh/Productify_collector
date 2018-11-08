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

    constructor() {
        this.getAllText = document.body.innerText;
        this.totalWordsLength = this.getAllText.length;
        this.wordsArray = this.getAllText.split(' ');
    }

    displays() {
        console.warn('Entire wordsArray of the current webpage is below');
        console.warn(this.wordsArray);
    }

}
 
let obj: Productify_Collector = new Productify_Collector()
obj.displays();