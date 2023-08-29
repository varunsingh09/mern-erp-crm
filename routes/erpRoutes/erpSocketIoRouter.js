const express = require('express')
const io = require('./../../socketio')
const Employee = require('./../../models/erpModels/Employee')
const router = express.Router()

router.get('/employee', async (req, res) => {
    const page = req.query.page || 1;
    const limit = parseInt(req.query.items) || 10;
    const skip = page * limit - limit;
    try {

        //  Query the database for a list of all results
        const resultsPromise = Employee.find({})
            .skip(skip)
            .limit(limit)
            .sort({ _id: 'desc' })
            .populate().lean();
        // Counting the total documents
        const countPromise = Employee.count({});
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
                message: 'Successfully found all Employee',
            });
        } else {
            return res.status(203).json({
                success: false,
                result: [],
                pagination,
                message: 'Collection is Empty',
            });
        }
    } catch (error) {
        console.log('error................', error)
        return res.status(500).json({ success: false, result: [], message: 'Oopsxxzx there is an Error', error: error });
    }
})

router.post('/createEmployee', async (req, res) => {
    try {

        const employee = new Employee(req.body)
        await employee.save()
        const employees = await Employee.find().sort({ "created": -1 })
        io.emit('employee-added', employees)
        return res.status(201).json({
            success: true,
            employees,
            message: 'Successfully added employee',
        });
    } catch (error) {
        res.send(error)
    }
})

module.exports = router