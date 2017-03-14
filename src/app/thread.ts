export class Thread {
    constructor(public om: string, public url: string, public type: number, public lastAuthor: string,
        public author: string, public title: string, public viewed: number, public comments: number,
        public locked: boolean, public timestamp: number) { }
}