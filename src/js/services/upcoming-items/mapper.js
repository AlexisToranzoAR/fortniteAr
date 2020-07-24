import UpcomingItems from './entity.js';

export default function mapearUpcomingItems(upcomingItemsAPI) {
    return new UpcomingItems(upcomingItemsAPI);
}