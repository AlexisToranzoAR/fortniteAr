import GlobalPlayerStats from './entity.js';

export default function mapearGlobalPlayerStats(globalPlayerStatsAPI) {
    return new GlobalPlayerStats(globalPlayerStatsAPI);
}