/// <reference types="jquery" />
import {
    getNews,
    getDailyShop
} from '../../services/fortnite.js'

export default async function showHomePage(lang) {
    if (lang === undefined) {
        throw new Error('Se necesita un lenguaje para mostrar las noticias.');
    }
    showNews(lang);
    showShop(lang);
}

async function showNews(lang) {
    const mode = 'br';
    try {
        const battleRoyaleNews = await getNews(mode, lang);
        const newsUrl = 'https://github.com/alexistoranzoar';
        const newsAuthor = 'FortniteAPI.io'
        battleRoyaleNews.news.forEach((news, i) => {
            const newsDate = news.date.slice(0, 10);
            if (i > 9) {
                $('#news').append(`
                    <div class="card text-white my-3 collapse-news collapse" id="news-${i}">
                        <div class="row">
                            <div class="col-md-4 my-auto">
                                <img src="${news.image}" class="img-fluid rounded mx-auto d-block" loading="lazy"></img>
                            </div>
                            <div class="col-md-8">
                                <div class="card-block p-3">
                                    <h4 class="font-weight-bold">${news.title}</h4>
                                    <div class="collapse-content">
                                        <p class="card-text collapse" id="collapse-news-${i}">${searchLink(news.body)}</p>
                                        <p class="text-muted inline">por <span class="author"><a class="text-muted inline" href="https://${newsAuthor}" target="__blank">${newsAuthor}</a></span>, <span class="date">${newsDate}</span></p>
                                        <a class="btn btn-outline-warning collapsed" data-toggle="collapse" href="#collapse-news-${i}" aria-expanded="false" aria-controls="collapseContent">Leer Más</a>
                                        <div class="d-inline px-3">
                                            <a href="https://www.reddit.com/submit?url=${newsUrl}&title=${news.body}" target="_blank" class="reddit-link"><i class="fab fa-reddit-alien float-right p-1 my-2 mx-3"></i></a>
                                        </div>
                                        <div class="d-inline px-3">
                                            <a href="https://www.facebook.com/sharer/sharer.php?u=${newsUrl}" target="_blank" class="facebook-link"><i class="fab fa-facebook-f float-right p-1 my-2 mx-3"></i></a>
                                        </div>
                                        <div class="d-inline px-3">
                                            <a href="https://twitter.com/intent/tweet?url=${newsUrl}&text=${news.body}" target="_blank" class="twitter-link"><i class="fab fa-twitter float-right p-1 my-2 mx-3"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `)
            } else {
                $('#news').append(`
                    <div class="card text-white my-3" id="news-${i}">
                        <div class="row">
                            <div class="col-md-4 my-auto">
                                <img src="${news.image}" class="img-fluid rounded mx-auto d-block" loading="lazy"></img>
                            </div>
                            <div class="col-md-8">
                                <div class="card-block p-3">
                                    <h4 class="font-weight-bold">${news.title}</h4>
                                    <div class="collapse-content">
                                        <p class="card-text collapse" id="collapse-news-${i}">${searchLink(news.body)}</p>
                                        <p class="text-muted inline">por <span class="author"><a class="text-muted inline" href="https://${newsAuthor}" target="__blank">${newsAuthor}</a></span>, <span class="date">${newsDate}</span></p>
                                        <a class="btn btn-outline-warning collapsed" data-toggle="collapse" href="#collapse-news-${i}" aria-expanded="false" aria-controls="collapseContent">Leer Más</a>
                                        <div class="d-inline px-3">
                                            <a href="https://www.reddit.com/submit?url=${newsUrl}&title=${news.body}" target="_blank" class="reddit-link"><i class="fab fa-reddit-alien float-right p-1 my-2 mx-3"></i></a>
                                        </div>
                                        <div class="d-inline px-3">
                                            <a href="https://www.facebook.com/sharer/sharer.php?u=${newsUrl}" target="_blank" class="facebook-link"><i class="fab fa-facebook-f float-right p-1 my-2 mx-3"></i></a>
                                        </div>
                                        <div class="d-inline px-3">
                                            <a href="https://twitter.com/intent/tweet?url=${newsUrl}&text=${news.body}" target="_blank" class="twitter-link"><i class="fab fa-twitter float-right p-1 my-2 mx-3"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `)
            }
        });
    } catch (error) {
        throw console.error(error);
    }
}

async function showShop(lang) {
    try {
        const shop = await getDailyShop(lang);
        const featuredItems = shop.featured;
        const dailyItems = shop.daily;
        const specialFeaturedItems = shop.specialFeatured;

        showFeaturedItems(featuredItems);
        showDailyItems(dailyItems);
        showSpecialFeaturedItems(specialFeaturedItems);
    } catch (error) {
        throw console.error(error);
    }
}

function searchLink(text) {
    var exp = /(((http(s)?(\:\/\/)))?(www\.)?([\w\-\.\/])*(\.[a-zA-Z]{2,3}\/?))[^\s\b\n|]*[^.,;:\?\!\@\^\$ -]/g;
    if (/http(s)?:\/\//g.test(text)) {
        return text.replace(exp, "<a href='$&' target='__blank'>$&</a>");
    } else {
        return text.replace(exp, "<a href='https://$&' target='__blank'>$&</a>");
    }
}

function showFeaturedItems(featuredItems) {
    featuredItems.forEach((item, i) => {
        $('#featured-store').append(itemShop(item, i, 'featured'));
    })
}

function showDailyItems(dailyItems) {
    dailyItems.forEach((item, i) => {
        $('#daily-store').append(itemShop(item, i, 'daily'));
    })
}

function showSpecialFeaturedItems(specialFeaturedItems) {
    specialFeaturedItems.forEach((item, i) => {
        $('#special-featured-store').append(itemShop(item, i, 'special-featured'));
    })
}

function itemShop(item, i, store) {
    const rarity = item.rarity;
    const description = item.description;
    const background = item.icon;
    const name = item.name;
    const price = item.price
    return `
        <a href="#${store}-store" class="fortnite-item fortnite-item-${rarity}" title="${description}" id="${store}-item-${i}"">
            <img class="fortnite-item-image" src="${background}" alt="${rarity} skin de fortnite.">
            <div class="fortnite-item-details">
                <div class="fortnite-item-name">${name}</div>
                <div class="fortnite-item-price">
                    <img src="src/img/vbucks.png" alt="Monedas vbucks">
                    <span>${price}</span>
                </div>
            </div>
        </a>
    `;
}
