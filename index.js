let ffmpeg = require('fluent-ffmpeg');
let VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
let fs = require('fs');
const express = require('express');
const app = express();
const Promise = require('bluebird');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({
    uploadDir: './assets'

});
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors("*"));

app.post('/api/upload', multipartMiddleware, (req, res) => {
    fs.rename('./' + req.files.uploads[0].path, './assets/' + 'video.mp4', function (err) {
        if (err) throw err;
        fs.stat('./assets/' + 'video.mp4', function (err, stats) {
            if (err) throw err;
            console.log('stats: ' + JSON.stringify(stats));
        });
    });

    res.json({
        'message': 'File uploaded succesfully.'
    });
});

app.get('/api/verify', multipartMiddleware, (req, res) => {
    console.log("GET /api/verify");

    cropVideo().then(function () {
        let listRequest = [];
        for (let index = 1; index <= 10; index++) {
            listRequest.push({
                request: requestVisual(index)
            })
        }

        Promise.all(listRequest.map(item => item.request.then(request => ({
            item,
            request
        })))).then(results => {
            let countScore = 0;
            for (let result of results) {
                if (result != undefined) {
                    if (result.request != undefined) {
                        if (result.request.images != undefined) {
                            if (result.request.images[0] != undefined) {
                                if (result.request.images[0].classifiers[0] != undefined) {
                                    if (result.request.images[0].classifiers[0].classes[0] != undefined) {
                                        if (result.request.images[0].classifiers[0].classes[0].score != undefined) {
                                            let score = result.request.images[0].classifiers[0].classes[0].score;
                                            if (score > 0.75 && score <= 0.85) {
                                                countScore += 1;
                                            } else if (score > 0.85 && score <= 0.90) {
                                                countScore += 2;
                                            } else if (score > 0.90) {
                                                countScore += 3;
                                            }
                                            console.log(score);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            console.log(countScore);
            if (countScore > 3) {
                console.log("Você acertou o comando");
                res.send({
                    result: "Você acertou o comando"
                })
            } else {
                console.log("Você errou o comando");
                res.send({
                    result: "Você errou o comando"
                })
            }
        });
    });

});

function cropVideo() {
    return new Promise(function (resolve, reject) {
        ffmpeg('./assets/video.mp4')
            .on('end', function () {
                console.log('Screenshots taken');
                resolve(true);
            })
            .on('error', function (err) {
                console.error(err);
            })
            .screenshots({
                count: 10,
                folder: './assets/'
            });
    });
}

function requestVisual(index) {
    return new Promise(function (resolve, reject) {

        var visualRecognition = new VisualRecognitionV3({
            version: '2018-03-19',
            iam_apikey: 'EFC2KiU_nWKRHNuXCgNGrhYOxk2NeLBeZNSlQuwveb82'
        });

        var images_file = fs.createReadStream("./assets/tn_" + index + ".png");
        var classifier_ids = ["DefaultCustomModel_916556356"];
        var threshold = 0.6;

        var params = {
            images_file: images_file,
            classifier_ids: classifier_ids,
            threshold: threshold
        };

        visualRecognition.classify(params, function (err, response) {
            if (err) {
                console.log(err);
                resolve(JSON.stringify(response, null, 2));
            } else {
                console.log("Request VisualRecognition Success!")
                resolve(response);
            }
        });
    });
}



var port = process.env.PORT || 3001
app.listen(port, function () {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});