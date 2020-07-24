export default class DailyShop {
    constructor(data) {
        this.uuid = data.uuid;
        this.endingDates = data.endingDates;
        this.featured = data.featured;
        this.daily = data.daily;
        this.specialFeatured = data.specialFeatured;
        this.specialDaily = data.specialDaily;
        this.community = data.community;
        this.offers = data.offers;
    }
}