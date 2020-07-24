export default class GlobalPlayerStats {
    constructor(data) {
        this.result = data.result;
        this.source = data.source;
        this.mode = data.mode;
        this.name = data.name;
        this.account = data.account;
        this.global_stats = data.global_stats;
        this.per_input = data.per_input;
        this.seasons_available = data.seasons_available;
        this.season = data.season;
    }
}