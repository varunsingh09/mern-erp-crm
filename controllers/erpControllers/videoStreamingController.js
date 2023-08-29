const mongoose = require('mongoose');
const fs = require("fs");
const Video = mongoose.model('Video');

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
        const resultsPromise = Video.find({})
            .skip(skip)
            .limit(limit)
            .sort({ _id: 'desc' })
            .populate().lean();
        // Counting the total documents
        const countPromise = Video.count({});
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
                message: 'Successfully found all video',
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

exports.live = async (req, res) => {
    try {
        const range = req.headers.range;
        if (!range) {
            res.status(400).send("Requires Range header");
        }

        const sourceLocation = `./public/uploads/admin`;

        const video = await Video.findOne({})
            .limit(1)
            .sort({ _id: 'desc' }).
            populate().
            lean();
        console.log('video', video?.file)


        const videoFilePath = `${sourceLocation}/${video?.file}`;
        const videoSize = fs.statSync(videoFilePath).size;

        const CHUNK_SIZE = 10 ** 6; // 1MB
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

        // Create headers
        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };

        // HTTP Status 206 for Partial Content
        res.writeHead(206, headers);

        // create video read stream for this particular chunk
        const videoStream = fs.createReadStream(videoFilePath, { start, end });

        // Stream the video chunk to the client
        videoStream.pipe(res);
    } catch (err) {
        console.log('err.......................................', err)
        res.status(500).json({ success: false, result: null, message: err.message, error: err });
    }
};


/**
 *  Creates a Single document by giving all necessary req.body fields
 *  @param {object} req.body
 *  @returns {string} Message
 */

exports.create = async (req, res) => {
    try {
        console.log('req.body', req.body)
        let { file_name, file_type, photo } = req.body;
        req.body.file = photo;
        if (!file_name && !file_type && !photo)
            return res.status(400).json({
                success: false,
                result: null,
                message: "Filename and filetype or video fields they don't have been entered.",
            });

        const existingVideo = await Video.findOne({ file_name: file_name });

        if (existingVideo)
            return res.status(400).json({
                success: false,
                result: null,
                message: 'Video this name already exists.',
            });

        const result = await new Video(req.body).save();
        if (!result) {
            return res.status(403).json({
                success: false,
                result: null,
                message: "document couldn't save correctly",
            });
        }
        return res.status(200).send({
            success: true,
            result: {
                _id: result._id,
                file_name: result.file_name,
                status: result.status,
                file_type: result.file_type,
                photo: result.photo,
                created: result.created
            },
            message: 'Video document save correctly',
        });
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({ success: false, message: 'there is error' });
    }
};


/**
 *  Updates a Single document
 *  @param {object, string} (req.body, req.params.id)
 *  @returns {Document} Returns updated document
 */

exports.update = async (req, res) => {
    try {
        req.body.file = req.body.photo

        const row = await Video.findOne({ _id: req.params.id });
        const { file = '' } = row;
        if (file) {
            const pathToFile = `./public/uploads/admin/${file}`
            if (fs.existsSync(pathToFile)) {
                fs.unlink(pathToFile, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log('deleted'); console.log("Successfully deleted the file.", pathToFile)
                })
            }
        }


        // Find document by id and updates with the required fields
        const result = await Video.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true, // return the new result instead of the old one
            runValidators: true,
        }).exec();
        if (!result) {
            return res.status(404).json({
                success: false,
                result: null,
                message: 'No document found by this id: ' + req.params.id,
            });
        } else {
            return res.status(200).json({
                success: true,
                result,
                message: 'we update this document by this id: ' + req.params.id,
            });
        }
    } catch (err) {
        // If err is thrown by Mongoose due to required validations
        if (err.name == 'ValidationError') {
            return res.status(400).json({
                success: false,
                result: null,
                message: 'Required fields are not supplied',
                error: err,
            });
        } else {
            // Server Error
            return res.status(500).json({
                success: false,
                result: null,
                message: 'Oops there is an Error',
                error: err,
            });
        }
    }
};
