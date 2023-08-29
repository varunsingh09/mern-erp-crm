const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = global.Promise;

const countrySchema = new mongoose.Schema({


    name: {
        type: String,
        trim: true,
        required: true,
    },
    iso3: {
        type: String,
        trim: true,
        required: true,
    },
    iso2: {
        type: String,
        trim: true,
        required: true,
    },
    numeric_code: {
        type: String,
        trim: true,
        required: true,
    },
    phone_code: {
        type: String,
        trim: true,
        required: true,
    },
    capital: {
        type: String,
        trim: true,
        required: true,
    },
    currency: {
        type: String,
        trim: true,
        required: true,
    },
    currency_name: {
        type: String,
        trim: true,
        required: true,
    },
    currency_symbol: {
        type: String,
        trim: true,
        required: true,
    },
    tld: {
        type: String,
        trim: true,
        required: true,
    },
    native: {
        type: String,
        trim: true,
        required: true,
    },
    region: {
        type: String,
        trim: true,
        required: true,
    },
    subregion: {
        type: String,
        trim: true,
        required: true,
    },
    nationality: {
        type: String,
        trim: true,
        required: true,
    },
    timezones: [],
    translations: {},
    latitude: {
        type: String,
        trim: true,
        required: true,
    },
    longitude: {
        type: String,
        trim: true,
        required: true,
    },
    emoji: {
        type: String,
        trim: true,
        required: true,
    },
    emojiU: {
        type: String,
        trim: true,
        required: true,
    },
    states: [],
});
countrySchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Country', countrySchema);
