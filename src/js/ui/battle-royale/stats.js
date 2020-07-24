import { getGlobalPlayerStats } from '../../services/fortnite.js';

export default async function showStatsPage(username, type = 'global_stats') {
    console.log("Llego " + username)
    if (!type === 'global_stats' || !type === 'gamepad' || !type === 'keyboardmouse' || username === undefined) {
        throw new Error('Se necesita un username y un tipo de estadistica valido para mostrar las estadisticas.');
    }
    try {
        const stats = await getGlobalPlayerStats(username);
        if (stats[type] === null) {
            throw new Error('No se pueden mostrar las estadisticas de este username debido a que las tiene ocultas.')
        }
        $('#main-header').addClass('d-none');
        $('#main-section').addClass('d-none');
        $('#stats-header').removeClass('d-none');
        $('#stats-section').removeClass('d-none');
        $('#stats-account-name').html(stats.name);
        $('#stats-account-level').html(stats.account.level);
        let soloStats = null;
        let duoStats = null;
        let squadStats = null;
        if (type === 'global_stats') {
            soloStats = stats[type].solo;
            duoStats = stats[type].duo;
            squadStats = stats[type].squad;
        } else {
            soloStats = stats.per_input[type].solo;
            duoStats = stats.per_input[type].duo;
            squadStats = stats.per_input[type].squad;
        }
        showStats('solo', soloStats, 'placetop10', 'placetop25');
        showStats('duo', duoStats, 'placetop5', 'placetop12');
        showStats('squad', squadStats, 'placetop3', 'placetop6');
    } catch (error) {
        throw error;
    }
}

function showStats(modeGame, stats, topOne, topTwo) {
    $(`#stats-${modeGame}-matchesplayed`).html(addCommas(stats.matchesplayed) + ' Partidas');
    $(`#stats-${modeGame}-victories .fta-defstat__value`).html(addCommas(stats.placetop1));
    $(`#stats-${modeGame}-victoryporcent .fta-defstat__value`).html(stats.winrate.toString().slice(3).replace(/^\d/, '$&.'));
    $(`#stats-${modeGame}-top10 .fta-defstat__value`).html(addCommas(stats[topOne]));
    $(`#stats-${modeGame}-timeplayed .fta-defstat__value`).html(convertMinutes(stats.minutesplayed));
    $(`#stats-${modeGame}-kmatches .fta-defstat__value`).html((stats.kills / stats.matchesplayed).toFixed(2));
    $(`#stats-${modeGame}-scorematch .fta-defstat__value`).html((stats.score / stats.matchesplayed).toFixed(2));
    $(`#stats-${modeGame}-score .fta-defstat__value`).html(addCommas(stats.score));
    $(`#stats-${modeGame}-kills .fta-defstat__value`).html(addCommas(stats.kills));
    $(`#stats-${modeGame}-kd .fta-defstat__value`).html(stats.kd);
    $(`#stats-${modeGame}-top25 .fta-defstat__value`).html(addCommas(stats[topTwo]));
    $(`#stats-${modeGame}-averagematchtime .fta-defstat__value`).html(convertMinutes(stats.minutesplayed / stats.matchesplayed));
    $(`#stats-${modeGame}-kminute .fta-defstat__value`).html((stats.kills / stats.minutesplayed).toFixed(2));
    $(`#stats-${modeGame}-scoreminute .fta-defstat__value`).html((stats.score / stats.minutesplayed).toFixed(2));
    // PERCENTILEBAR
    $(`#stats-${modeGame}-victoryporcent .fta-percentilebar__fill`).css('width', stats.winrate * 1000 + '%');
    $(`#stats-${modeGame}-kmatches .fta-percentilebar__fill`).css('width', (stats.kills / stats.matchesplayed)*30 + '%');
    $(`#stats-${modeGame}-scorematch .fta-percentilebar__fill`).css('width', (stats.score / stats.matchesplayed)/1.5 + '%');
    $(`#stats-${modeGame}-kd .fta-percentilebar__fill`).css('width', (stats.kd)*30 + '%');
    $(`#stats-${modeGame}-kminute .fta-percentilebar__fill`).css('width', (stats.kills / stats.minutesplayed)*50 + '%');
    $(`#stats-${modeGame}-scoreminute .fta-percentilebar__fill`).css('width', stats.score / stats.minutesplayed + '%');
}

function convertMinutes(num) {
    const d = Math.floor(num / 1440);
    const h = Math.floor((num - (d * 1440)) / 60);
    const m = Math.floor(num % 60);
    const s = Math.floor((num - (Math.floor(num % 60))) * 60);

    if (d > 0) {
        return (d + "D " + h + "H " + m + "M ");
    } if (h > 0) {
        return (h + "H " + m + "M " + s + "S ");
    } else {
        return (m + "M " + s + "S ");
    }
}

function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}