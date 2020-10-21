
class TorrentAlreadyAddedError extends Error{

    constructor (message) {
        super(message)
        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name
        this.status = 406 //not acceptable
    }

    statusCode() {
        return this.status
    }

}

module.exports = TorrentAlreadyAddedError;