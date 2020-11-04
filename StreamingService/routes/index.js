const express = require('express');
const router = express.Router();
const movieTable = require("../Database/Table/Movie")
const streaming = require("../Modules/Streaming")


/* GET home page. */
router.get('/:id', async function (req, res, next) {


    const movie = await movieTable.getById(req.params.id)

    if (movie.length === 0)
    {
        return res.status(404).send({message: "Movie not found"})
    }

    const path = movie[0].path
    const range = req.headers.range;

    streaming.stream(path, range, (header, file) => {

        res.writeHead(206, header);
        file.pipe(res);

    }, (header, file) => {

        res.writeHead(200, header);
        file.pipe(res)

    }, (message) => {
        res.status(404).send(message)
    })


});

module.exports = router;
