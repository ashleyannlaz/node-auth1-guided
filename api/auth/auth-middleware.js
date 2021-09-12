// #STEP4 

function restricted(req,res, next) {
    console.log('restricting access to auth users')
    next()
}

module.exports = { restricted }