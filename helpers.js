

function mean(nums) {
    return nums.reduce((acc, curr) => 
        acc + curr
    )/nums.length
}

function median(nums) {
        
    for (let i = 0; i < nums.length; i++) {
            for(let j = 0; j < nums.length; j++) {
                if (nums[i] < nums[j]) {
                    [nums[i], nums[j]] = [nums[j], nums[i]]
                    }
            }
            
    }
    const len = nums.length
    console.log(nums)
    if (len % 2 === 0) {
        let both = nums.slice((len/2) - 1, (len/2) + 1)
        return((both[0] + both[1])/2)
    }
    else {
        return(parseInt(nums.slice(Math.floor((len/2)), Math.floor((len/2)) +1)))
    }
    

}

function mode(nums) {
    const all = new Map();

    nums.forEach(num => {
        if(all.has(num)) (all.set(num, all.get(num) + 1))
        if(!all.has(num)) (all.set(num, 1))
    })
    let high = ''
    const vals = Array.from(all)
    for (let i = 0; i < vals.length; i++) {
        if(vals[i+1]){
            if (vals[i][1] > vals[i+1][1]) {
                let low = vals[i + 1] 
                vals[i + 1] = vals[i]
                vals[i] = low
                }
        }
    
    }
   
    high = vals[vals.length - 1][0]
    return high

}


function getNums(req) {
    if (!req.query.nums) {
        return new Error('Numbers are required')
    }
    // const errors = []
    const n = req.query.nums.split(',')
    const NUMS = n.map(el => {
        const num = parseInt(el);
        if (!isNaN(num)) {
            return num;
        }
                
            else {  
                let err = new Error(`${el} is not a number`)
                return el = err
                // errors.push(err)          
        }
        })
    // if (errors) {
    //     return errors
    // }
    return NUMS
    }

module.exports = {
    mean: mean,
    median: median,
    mode: mode,
    getNums: getNums
}

let req = {query: {
                nums: '1,3,5,foo'
            }}

console.log(getNums(req))

// {
// let NUMS = req.map(el => {
//     if(parseInt(el) !== NaN) {
//         return parseInt(el)
//     }
        
//     else {   
//         return new Error(`${el} is not a number`)            
// }
// })
// return NUMS
// }