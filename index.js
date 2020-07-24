const express = require('express');
const cors = require('cors');
const PUERTO = 8080;
const app = express();

const FortniteAPI = require("fortnite-api-io");
const fortniteAPI = new FortniteAPI("f4c23a26-d2e20e71-32705f75-446ff4f4");

app.use(cors());

app.get('/upcoming-items/:lang', async (req, res) => {
    const language = req.params.lang;
    const options = {
        lang: language
    };
    try {
        const upcomingItems = await fortniteAPI.listUpcomingItems(options);
        if (upcomingItems.result === true) {
            res.send(upcomingItems);
        } else {
            throw upcomingItems;
        }
    } catch (error) {
        res.status(404).send(error);
    }
})

app.get('/daily-shop/:lang', async (req, res) => {
    const language = req.params.lang;
    const options = {
        lang: language
    };
    try {
        const dailyShop = await fortniteAPI.getDailyShop(options);
        res.send(dailyShop);
    } catch (error) {
        res.status(404).send(error);
    }
})

app.get('/global-player-stats/:username', async (req, res) => {
    const username = req.params.username;
    try {
        const accountId = await fortniteAPI.getAccountIdByUsername(username);
        const globalPlayerStats = await fortniteAPI.getGlobalPlayerStats(accountId.account_id);
        if (globalPlayerStats.result === true) {
            res.send(globalPlayerStats);
        } else {
            throw globalPlayerStats;
        }
    } catch (error) {
        res.status(404).send(error);
    }
})

app.get('/player-recent-matches/:username', async (req, res) => {
    const username = req.params.username;
    try {
        const accountId = await fortniteAPI.getAccountIdByUsername(username);
        const playerRecentMatches = await fortniteAPI.getPlayerRecentMatches(accountId.account_id);
        if (playerRecentMatches.result === true) {
            res.send(playerRecentMatches);
        } else {
            throw playerRecentMatches;
        }
    } catch (error) {
        res.status(404).send(error);
    }
})

app.get('/news/:mode/:lang', async (req, res) => {
    const mode = req.params.mode;
    const language = req.params.lang;
    const options = {
        lang: language
    };
    try {
        const news = await fortniteAPI.getNews(mode, options);
        if (news.result === true && options.lang === news.lang && mode === news.type) {
            res.send(news);
        } else {
            throw news;
        }
    } catch (error) {
        res.status(404).send(error);
    }
})

app.listen(PUERTO);
console.log(`Escuchando en el puerto ${PUERTO}`);