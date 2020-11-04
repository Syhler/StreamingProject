const fs = require("fs")



const stream = (path, range, onRangeResponse, onAllResponse, onError) => {

    fs.stat(path, (err, stat) => {

        // Handle file not found
        if (err !== null && err.code === 'ENOENT') {
            onError("File not Found")
        }

        const fileSize = stat.size

        if (range) {

            const parts = range.replace(/bytes=/, "").split("-");

            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;

            const chunksize = (end-start)+1;
            const file = fs.createReadStream(path, {start, end});
            const header = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            }

            onRangeResponse(header, file)


        } else {
            const header = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            }


            const file = fs.createReadStream(path);
            onAllResponse(header, file)

        }
    });

}

module.exports = {stream}