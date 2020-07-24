export default class News {
    constructor(data) {
        this.result = data.result;
        this.type = data.type;
        this.lang = data.lang;
        this.show = data.show;
        this.news = data.news;
    }
}