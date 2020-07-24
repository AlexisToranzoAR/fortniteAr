import DailyShop from './entity.js';

export default function mapearDailyShop(dailyShopAPI) {
    return new DailyShop(dailyShopAPI);
}