const TorrentAlreadyAddedError = require("../Errors/TorrentAlreadyAddedError")
const downloadMovieTable = require("../Database/Tables/DownloadMovie")
const pendingMovieTable = require("../Database/Tables/PendingMovie")
const path = require('path');

class TorrentDownloader {

    constructor(client) {
        this.client = client
        this.currentlyDownloadingTorrents = [];
    }


    async download(magnetUri)
    {
        //const path = "../../sharedData"

        const torrentPath = path.join(__dirname, "..","..","sharedData")

        const infoHash = this.getInfoHashFromMagnet(magnetUri)

        const alreadyExist = this.checkIfAlreadyExist(infoHash)

        if (alreadyExist) {
            throw new TorrentAlreadyAddedError("Torrent already added");
        }

        this.client.add(magnetUri, {path: torrentPath}, (torrent) => this.handleAddedTorrent(torrent))

    }

    getInfoHashFromMagnet(magnetUri) {
        return magnetUri.split(":")[3].split("&")[0].toLowerCase();
    }

    /**
     * returns currentlyDownloadingTorrent objects
     * contains: progress, downloadSpeed, name, and finished
     * @returns {[object]}
     */
    getDownloadProcesses()
    {
        return this.currentlyDownloadingTorrents;
    }

    /**
     * Handle the currently added torrent
     * @param torrent that have been added to the client
     */
    async handleAddedTorrent(torrent)
    {
        const index = this.currentlyDownloadingTorrents.length === 0 ? 0 : this.currentlyDownloadingTorrents.length -1;

        const data = {
            title: torrent.name,
            path: torrent.path + "/"+torrent.name,
            magnetLink: torrent.magnetURI
        }

        const insertResult = await downloadMovieTable.insert(data)

        const interval = setInterval(() => {
            this.currentlyDownloadingTorrents[index] = {
                progress: torrent.progress,
                downloadSpeed: torrent.downloadSpeed,
                name: torrent.name,
                finished: false
            };
        }, 2000)

        const onDone = async (callback) => {

            torrent.on("done", function ()
            {
                clearInterval(interval)
                callback()
            })
        }

        await onDone(async () => {
            if (this.currentlyDownloadingTorrents === undefined)
            {
                return;
            }

            this.currentlyDownloadingTorrents[index] = {
                progress: 1,
                downloadSpeed: 0,
                name: torrent.name,
                finished: true
            };

            await downloadMovieTable.update(insertResult[0].insertId, true);
            await pendingMovieTable.insert(torrent.magnetURI)
            console.log("Done")

        })

    }

    checkIfAlreadyExist(infoHash) {
        const filtered = this.client.torrents.filter(x => x.discovery.infoHash === infoHash);

        return filtered.length !== 0;
    }
}

module.exports = TorrentDownloader;