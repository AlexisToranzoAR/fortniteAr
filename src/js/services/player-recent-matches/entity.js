export default class PlayerRecentMatches {
    constructor(data) {
        this.result = data.result;
        this.account = data.account;
        this.name = data.name;
        this.max_results = data.max_results;
        this.matches = data.matches;
    }
}