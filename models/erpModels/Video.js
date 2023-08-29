const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = global.Promise;

const videoSchema = new mongoose.Schema({
    file_name: {
        type: String,
        trim: true,
        required: true,
    },
    file_type: {
        type: String,
        trim: true,
        required: true,
    },
    file: {
        type: String,
        trim: true,
        required: true,
    },
    status: {
        type: String,
        default: '1',
    },
    created: {
        type: Date,
        default: Date.now,
    },
});
videoSchema.plugin(require('mongoose-autopopulate'));
videoSchema.index({
    file_name: 'text',
    file_type: 'text',
    status: 'text',
});

module.exports = mongoose.model('Video', videoSchema);
