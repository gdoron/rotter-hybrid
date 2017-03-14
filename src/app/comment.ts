export class Comment {
    constructor(public index: string, public parent: string, public level: string, public author: string, public title: string,
        public timestamp: number, public html: string) { }
}