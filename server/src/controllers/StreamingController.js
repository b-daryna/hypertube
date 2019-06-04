const ffmpeg = require('../helpers/ffmpeg')
const ts = require('torrent-stream')
const md5 = require('md5');
const pump = require('pump')

const initStreaming = (req, res, magnet, options) => {
    const engine = ts(magnet, options)
    const { range } = req.headers
    console.log(range)
    console.log('Initialization range: ', range)
    engine.on('ready', function () {
        const files = engine.files
        let isStreaming = false
        let toStream = null

        files.forEach((file, index) => {

            if (index === 0) {
                toStream = file
            }
            else {
                if (toStream && file.length > toStream.length) {
                    toStream = file
                }
                if (index === files.length - 1) {
                    console.log('-> File name: ', toStream.name)
                    console.log('-> File path: ', options.path)
                    //console.log('-> Is streamable: ', isStreamable(toStream.name))

                    if (!isStreaming && isStreamable(toStream.name) !== null) {
                        isStreaming = true

                        if (mustBeConverted(toStream.name))
                            initConversionStreaming(req, res, engine, toStream, options.path)
                        else {
                            processStandardStreaming(req, res, engine, toStream, range)
                        }
                    }
                    else {
                        file.select()
                    }
                }
            }
        })
    })
    engine.on('torrent', () => {
        checkTorrentStatus(engine)
    })
    engine.on('download', (index) => {
        console.log(`Engine downloading chunk: [${index}]`)
        console.log('Engine swarm downloaded : ', engine.swarm.downloaded)
    })
    engine.on('idle', () => {
    })
}

function checkTorrentStatus(engine) {
    let total = 0

    console.log('Checking torrents...', engine.files)
    engine.files.forEach((file) => {
        total += parseInt(file.length)
        //console.log('Total : ', total)
        //console.log('Downloaded : ', engine.swarm.downloaded)
        if (total === engine.swarm.downloaded)
            console.log('Torrent fully downloaded')
    })
}

const isStreamable = (fileName) => {
    const mimes = ['.*[.]{1}mp4', '.*[.]{1}avi', '.*[.]{1}mkv']


    return fileName.match(new RegExp('(' + mimes.join('|') + ')'))
}

const mustBeConverted = (fileName) => {
    const mimes = ['.*[.]{1}avi', '.*[.]{1}mkv']

    return fileName.match(new RegExp('(' + mimes.join('|') + ')'))
}

const processStandardStreaming = (req, res, engine, file, range) => {
    const parts = (range) ? range.replace(/bytes=/, '').split('-') : null
    const start = (parts) ? parseInt(parts[0], 10) : 0
    const end = (parts && parts[1]) ? parseInt(parts[1], 10) : file.length - 1

    const stream = file.createReadStream({ start, end })

    //console.log('Streaming[Standard]: ranges: ', range)
    console.log('Streaming[Standard]: processing')
    res.on('close', () => {
        engine.remove(true, () => { console.log('Engine cleared') })
        engine.destroy()
        console.log('Streaming[Standard]: closed')
    })
    res.writeHead(206, {
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'no-cache, no-store',
        'Content-Range': `bytes ${start}-${end}/${file.length}`,
        'Content-Length': parseInt(end - start) + 1,
        'Content-Type': 'video/mp4'
    })
    stream.pipe(res)
}

const initConversionStreaming = (req, res, engine, file, path) => {
    const stream = file.createReadStream()

    console.log('Streaming[Conversion]: initialized')
    console.log('Streaming[Conversion]: path: ', path + '/' + file.name)
    res.on('close', () => {
        console.log('Streaming[Conversion]: (response stream) closed')
    })
    res.writeHead(200, {
        'Cache-Control': 'no-cache, no-store',
        'Content-Length': file.length,
        'Content-Type': 'video/webm'
    })
    const conversion = ffmpeg(stream)
        .on('error', function (err) {
            console.log('Streaming[Conversion]: error:', err)
        })
        .audioBitrate(128)
        .audioCodec('libvorbis')
        .format('webm')
        .outputOptions([
            '-cpu-used 2',
            '-deadline realtime',
            '-error-resilient 1',
            '-threads 4'
        ])
        .videoBitrate(1024)
        .videoCodec('libvpx')
        .on('end', () => {
            console.log('Streaming[Conversion]: finished')
        })

    pump(conversion, res)
}

module.exports = {
    async stream(req, res) {
        try {
            const { magnet } = req.query.decoded
            // const magnet = 'magnet:?xt=urn:btih:21812EAB05A05ACD1D98424BA7BCD09FCC5481C1&dn=Prospect+%282018%29+%281080p+BluRay+x265+HEVC+10bit+AAC+5.1+Tigole%29+%5BQxR%5D&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce'

            const decoded = decodeURI(magnet)
            const path = `./files/${md5(decoded)}`
            const options = {
                connections: 100,
                uploads: 10,
                tmp: './files/cache',
                path: path,
                dht: true,
                verify: true,
                tracker: true
            }
            if (decoded && decoded.match(new RegExp(/^(magnet:\?xt=urn:btih:).*?$/))) {
                initStreaming(req, res, decoded, options)
            } else {
                return res.sendStatus(204)
            }
        }
        catch (err) {
            res.status(500).json({ error: err })
        }
    },
    async encodeParams(req, res, next) {
        try {
            const { magnet } = req.query;
            req.query.decoded = {};
            req.query.decoded.magnet = magnet;
            next();
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ error: err })
        }
    }
}