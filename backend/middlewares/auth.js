const apiAuth = function(req, res, next) {
    console.log(process.env.AUTH_TOKEN)
    if(req.headers.authorization != "Bearer 12tFt61L33aZ0qPEWU3lMRYKuUJye69T27wISkjWfB97I8JfUU1ritRipl0Jtvi3XB1SA7LKGUNpf61tnsNjug") {
        res.send({
            error: "Unauthorized Access!"
        });
    } else {
        next();
    }
}

module.exports = {apiAuth};