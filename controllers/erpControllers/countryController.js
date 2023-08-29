const mongoose = require('mongoose');
const Country = mongoose.model('Country');
const getOne = require('../corsControllers/custom').getOne;

/**
 *  Get all documents of a Model
 *  @param {Object} req.params
 *  @returns {Object} Results with pagination
 */

exports.list = async (req, res) => {
    const page = req.query.page || 1;
    const limit = parseInt(req.query.items) || 10;
    const skip = page * limit - limit;
    try {

        //  Query the database for a list of all results
        const resultsPromise = Country.find({ "iso3": "IND" }, { states: 1 })
            .skip(skip)
            .limit(limit)
            .sort({ _id: 'desc' })
            .populate().lean();
        // Counting the total documents
        const countPromise = Country.count({ "iso3": "IND" });
        // Resolving both promises
        const [result, count] = await Promise.all([resultsPromise, countPromise]);
        // Calculating total pages
        const pages = Math.ceil(count / limit);

        // Getting Pagination Object
        const pagination = { page, pages, count };
        if (count > 0) {
            return res.status(200).json({
                success: true,
                result,
                pagination,
                message: 'Successfully found all documents',
            });
        } else {
            return res.status(203).json({
                success: false,
                result: [],
                pagination,
                message: 'Collection is Empty',
            });
        }
    } catch {
        console.log('error................', error)
        return res.status(500).json({ success: false, result: [], message: 'Oopsxxzx there is an Error', error: error });
    }
};

