import News from './entity.js';

export default function mapearNews(newsAPI) {
    return new News(newsAPI);
}