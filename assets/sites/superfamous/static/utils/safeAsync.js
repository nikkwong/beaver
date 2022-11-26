module.exports = (fn) => {

    return async (req, res, next) => {

        try {

            await fn(req, res, next);

        } catch (e) {

            console.log(e)
            res.status(400).send(e && e.response && e.response.data || (e && e.toString ? e.toString() : e)); // check for http or process error. 

        }

    }

}