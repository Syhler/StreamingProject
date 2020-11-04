const express = require('express');
const router = express.Router();
const fs = require('fs')
const TorrentDownloader = require("./../Torrent/TorrentDownloader")
const WebTorrent = require('webtorrent')
const pendingMovieTable = require("../Database/Tables/PendingMovie")
const movieTable = require("../Database/Tables/Movie")


/* GET home page. */
const client = new WebTorrent()
const torrentHandler = new TorrentDownloader(client);

router.get('/', async function (req, res, next) {

    //torrentHandler.download("magnet:?xt=urn:btih:dd8255ecdc7ca55fb0bbf81323d87062db1f6d1c&dn=Big+Buck+Bunny&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fbig-buck-bunny.torrent")

    try {

        await torrentHandler.download("magnet:?xt=urn:btih:dd8255ecdc7ca55fb0bbf81323d87062db1f6d1c&dn=Big+Buck+Bunny&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fbig-buck-bunny.torrent")
        res.status(200).send();
    }
    catch (e)
    {
        res.status(500).send(e)
    }

});

router.get('/progress', (req, res) => {
    res.send({message: torrentHandler.getDownloadProcesses()})
})

router.get("/movie", (async (req, res) => {

    await pendingMovieTable.getAll((result) => {

        result.forEach((data, _) => {

            const filesInDir =  fs.readdirSync(data.path)
            console.log(data.path)

            const filesWithPath = filesInDir.map(x => x = data.path + "/" + x)

            data.files = filesWithPath

            delete data.path;


        })


        return res.status(200).send({pendingMovies: result})
    }, (err) => {
        return res.status(500).send({error: err})
    })

}))

router.post("/movie", (async (req, res) => {

    const title = req.query.title;
    const path = req.query.path;




    await movieTable.insert(title, path, () => {

        return res.status(200).send();
    }, (err) =>{
        return res.status(500).send({error: err})
    })


}))

router.delete("/movie/:id", ((req, res) => {

    const id = req.params.id

    deleteMovie(id, () => {
        return res.status(200).send()
    }, (err) => {
        return res.status(500).send({error: err})
    })

}))

module.exports = router;
