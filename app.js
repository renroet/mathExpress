const express = require('express');
const { mean, median, mode, getNums } = require('./helpers');
const ExpressError = require('./Error')

const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get('/mean', (req, res, next) => {
    
    if (!req.query.nums) {
        throw new ExpressError('Numbers are required', 400)
    }

    try{
        const NUMS = getNums(req)
        for(let num of NUMS) {
            if (num instanceof(Error)) {
                throw new ExpressError(`${num.message}`, 400)
            }
        }
        
        console.log(NUMS)
        const m = mean(NUMS)
        console.log(m)
        return res.json({operation: "mean",
                        value: `${m}`})
    }
    catch(err){
        next(err)
    }
    })
    
app.get('/median', (req, res, next) => {
    if (!req.query.nums) {
        throw new ExpressError('Numbers are required', 400)
    }

    try{
        const NUMS = getNums(req)
        for(let num of NUMS) {
            if (num instanceof(Error)) {
                throw new ExpressError(`${num.message}`, 400)
            }
        }
    console.log(NUMS)
    const m = median(NUMS)
    console.log(m)
    return res.json({operation: "median",
                    value: `${m}`})
    }
    catch(err){
        next(err)
    }
})
    
    
app.get('/mode', (req, res, next) => {
    if (!req.query.nums) {
        throw new ExpressError('Numbers are required', 400)
    }

    try{
        const NUMS = getNums(req)
        for(let num of NUMS) {
            if (num instanceof(Error)) {
                throw new ExpressError(`${num.message}`, 400)
            }
        }
    console.log(NUMS)
    const m = mode(NUMS)
    console.log(m)
    return res.json({operation: "mode",
                    value: `${m}`})
    }
    catch(err){
        next(err)
    }
})

app.use((req, res, next) => {
    const err = new ExpressError('I\'m sorry, that page seems to be missing at the moment.', 404)
    res.status(err.status);
    return res.send(err.message)
})

app.use((error, req, res, next) => {
    
    res.status(error.status || 500)
    
    return res.json({
        status: error.status,
        msg: error.message})

})


app.listen(3000, function() {
    console.log('Server running on port 3000')
})