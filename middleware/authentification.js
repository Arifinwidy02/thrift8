const isOwner = function (req, res, next) {
    if (req.session.role !== `owner`.toLowerCase()) {
        console.log(req.session.role, 'dari middleware');
        const error = `You must become an owner to access this !`
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }
}

const isAdmin = function (req, res, next) {
    if (!req.session.userId && req.session.role !== `admin`.toLowerCase()) {
        const error = `please login first`
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }
}


module.exports = {
    isOwner, isAdmin
}