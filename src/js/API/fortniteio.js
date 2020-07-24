const serverUrl = 'http://localhost:8080';

export async function getNews(mode, lang) {
    const newsUrl = `${serverUrl}/news/${mode}/${lang}`;
    return fetch(newsUrl)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .catch(error => console.error(error));
}

export async function getDailyShop(lang) {
    const dailyShopUrl = `${serverUrl}/daily-shop/${lang}`;
    return fetch(dailyShopUrl)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .catch(error => console.error(error));
}

export async function getUpcomingItems(lang) {
    const upcomingItemsUrl = `${serverUrl}/upcoming-items/${lang}`;
    return fetch(upcomingItemsUrl)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .catch(error => console.error(error));
}

export async function getGlobalPlayerStats(username) {
    const globalPlayerStatsUrl = `${serverUrl}/global-player-stats/${username}`;
    return fetch(globalPlayerStatsUrl)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .catch(error => console.error(error));
}

export async function getPlayerRecentMatches(username) {
    const playerRecentMatchesUrl = `${serverUrl}/player-recent-matches/${username}`;
    return fetch(playerRecentMatchesUrl)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .catch(error => console.error(error));
}
