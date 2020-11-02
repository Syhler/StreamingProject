const TorrentAlreadyAddedError = require("../Errors/TorrentAlreadyAddedError")


class TorrentDownloader {

    constructor(client) {
        this.client = client
        this.currentlyDownloadingTorrents = [];
    }


    download(magnetUri)
    {
        const infoHash = this.getInfoHashFromMagnet(magnetUri)

        const alreadyExist = this.checkIfAlreadyExist(infoHash)

        if (alreadyExist) {
            throw new TorrentAlreadyAddedError("Torrent already added");
        }

        this.client.add(magnetUri, {path: './test'}, (torrent) => this.handleAddedTorrent(torrent))
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
    handleAddedTorrent(torrent)
    {
        const index = this.currentlyDownloadingTorrents.length === 0 ? 0 : this.currentlyDownloadingTorrents.length -1;

        const interval = setInterval(() => {
            this.currentlyDownloadingTorrents[index] = {
                progress: torrent.progress,
                downloadSpeed: torrent.downloadSpeed,
                name: torrent.name,
                finished: false
            };
        }, 2000)

        const test = (callback) => {

            torrent.on("done", function ()
            {
                clearInterval(interval)
                callback()
            })
        }

        test(() => {
            if (this.currentlyDownloadingTorrents === undefined)
            {
                console.log()
                return;
            }

            this.currentlyDownloadingTorrents[index] = {
                progress: 1,
                downloadSpeed: 0,
                name: torrent.name,
                finished: true
            };
        })

    }

    checkIfAlreadyExist(infoHash) {
        const filtered = this.client.torrents.filter(x => x.discovery.infoHash === infoHash);

        return filtered.length !== 0;
    }
}

module.exports = TorrentDownloader;