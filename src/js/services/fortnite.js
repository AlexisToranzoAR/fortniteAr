import {
    getNews as getNewsFromAPI,
    getDailyShop as getDailyShopFromAPI,
    getUpcomingItems as getUpcomingItemsFromAPI,
    getGlobalPlayerStats as getGlobalPlayerStatsFromAPI,
    getPlayerRecentMatches as getPlayerRecentMatchesFromAPI
} from '../API/fortniteio.js';
import mapearNews from './news/mapper.js';
import mapearDailyShop from './daily-shop/mapper.js';
import mapearUpcomingItems from './upcoming-items/mapper.js';
import mapearGlobalPlayerStats from './global-player-stats/mapper.js';
import mapearPlayerRecentMatches from './player-recent-matches/mapper.js';

export async function getNews(mode, lang) {
    if (mode === undefined || lang === undefined) {
        throw new Error('Se necesita un modo de juego y un lenguaje para solicitar noticias.');
    }
    try {
        return mapearNews(await getNewsFromAPI(mode, lang));
    } catch (error) {
        throw console.error(error);
    }
}

export async function getDailyShop(lang) {
    if (lang === undefined) {
        throw new Error('Se necesita un lenguaje para solicitar la tienda diaria.');
    }
    try {
        return mapearDailyShop(await getDailyShopFromAPI(lang));
    } catch (error) {
        throw console.error(error);
    }
}

export async function getUpcomingItems(lang) {
    if (lang === undefined) {
        throw new Error('Se necesita un lenguaje para solicitar los futuros items.');
    }
    try {
        return mapearUpcomingItems(await getUpcomingItemsFromAPI(lang));
    } catch (error) {
        throw console.error(error);
    }
}

export async function getGlobalPlayerStats(username) {
    if (username === undefined) {
        throw new Error('Se necesita un username para solicitar las estadisticas.');
    }
    try {
        return mapearGlobalPlayerStats(await getGlobalPlayerStatsFromAPI(username));
    } catch (error) {
        throw console.error(error);
    }
}

export async function getPlayerRecentMatches(username) {
    if (username === undefined) {
        throw new Error('Se necesita un username para solicitar las ultimas partidas.');
    }
    try {
        return mapearPlayerRecentMatches(await getPlayerRecentMatchesFromAPI(username));
    } catch (error) {
        throw console.error(error);
    }
}
