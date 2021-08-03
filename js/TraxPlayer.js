function Log(err, info) {
    console.log("### ERROR: " + info);
    console.log(err);
}
class TraxPlayer {
    ticker;
    playing;
    position;
    samples;
    author;
    name;
    tracks;
    constructor(songUrl, sampleUrl) {
        this.samples = new Array();
        this.ready = false;
        this.position = 0;
        this.playing = false;
        this.songUrl = songUrl;
        this.sampleUrl = sampleUrl;
        var tracks = [];
        for (var i = 0; i < 4; i++) {
            tracks.push({
                player: new Audio(),
                timeLeft: 0,
                repeat: 0,
                sample: 0,
                playlist: []
            });
        }
        this.tracks = tracks;
        this.Preload();
    }

    GetSampleUrl(sampleId) {
        return this.sampleUrl + "sound_machine_sample_" + sampleId + ".mp3";
    }


    GetTrack(sample) {
        var track = [];
        sample.split(";").forEach(sample => {
            var samplePiece = sample.split(",")[0];
            var repeat = sample.split(",")[1];
            track.push({ repeat: repeat, piece: samplePiece })
        });
        return track;
    }

    GetSampleLength(duration) {

        var _loc2_ = duration * 1000;
        if (_loc2_ < 2100) {
            return 1;
        }
        if (_loc2_ < 4100) {
            return 2;
        }
        if (_loc2_ < 6100) {
            return 3;
        }
        if (_loc2_ < 8100) {
            return 4;
        }
        throw new Error("Sample is too long:");
    }

    GetDuration(sample) {
        var _self = this;
        return new Promise(function(resolve) {
            var audio = new Audio();
            audio.addEventListener('loadedmetadata', function() {
                resolve({
                    sampleLength: _self.GetSampleLength(audio.duration),
                    sample: sample,
                    audioObj: audio,
                    src: audio.src
                });
            });
            audio.src = _self.GetSampleUrl(sample.piece);
        });
    }

    GetUniqueSamples(tracks) {
        var flags = [],
            output = [];
        for (var t = 0; t < tracks.length; t++) {
            for (var i = 0; i < tracks[t].length; i++) {
                if (flags[tracks[t][i].piece])
                    continue;

                flags[tracks[t][i].piece] = true;
                output.push(tracks[t][i]);
            }
        }
        return output;

    }

    FetchSong() {
        // I will have to work with this later
        /*fetch(this.songUrl)
            .then(response => response.json())
            .then(data => console.log(data));*/
        var song = "status=0&name=Too lost in the lido&author=Patrick&track1=317,4;408,7;0,1;410,16;413,4;406,4;410,8;412,4:2:0,2;321,2;443,22;91,2;317,8;443,8;412,2;0,2:3:0,3;320,2;0,7;414,4;445,4;412,2;323,2;412,4;96,2;412,2;414,4;445,7;448,1;317,4:4:0,3;324,2;0,6;448,1;0,6;96,2;322,4;96,2;99,2;322,4;412,2;0,2;322,2;96,2;322,2;0,1;324,2;0,3&track2=0,2;321,2;443,22;91,2;317,8;443,8;412,2;0,2:3:0,3;320,2;0,7;414,4;445,4;412,2;323,2;412,4;96,2;412,2;414,4;445,7;448,1;317,4:4:0,3;324,2;0,6;448,1;0,6;96,2;322,4;96,2;99,2;322,4;412,2;0,2;322,2;96,2;322,2;0,1;324,2;0,3&track3=0,3;320,2;0,7;414,4;445,4;412,2;323,2;412,4;96,2;412,2;414,4;445,7;448,1;317,4:4:0,3;324,2;0,6;448,1;0,6;96,2;322,4;96,2;99,2;322,4;412,2;0,2;322,2;96,2;322,2;0,1;324,2;0,3&track4=0,3;324,2;0,6;448,1;0,6;96,2;322,4;96,2;99,2;322,4;412,2;0,2;322,2;96,2;322,2;0,1;324,2;0,3";
        song = "?" + song;
        var urlSearchParams = new URLSearchParams(song);

        var track1 = urlSearchParams.get("track1").split(":2:")[0];
        var track2 = urlSearchParams.get("track1").split(":2:")[1].split(":3:")[0];
        var track3 = urlSearchParams.get("track1").split(":2:")[1].split(":3:")[1].split(":4:")[0];
        var track4 = urlSearchParams.get("track1").split(":2:")[1].split(":3:")[1].split(":4:")[1];
        return new Promise((resolve, reject) => {
            resolve([this.GetTrack(track1), this.GetTrack(track2), this.GetTrack(track3), this.GetTrack(track4)]);
        });
    }

    Preload() { // Load all samples in song
        console.log(`SongUrl: ${
            this.songUrl
        }, sampleUrl: ${
            this.sampleUrl
        }`);
        var _self = this;
        this.FetchSong().then(function(tracks) {
            console.log("Song loaded, loading samples");
            console.log("TRACKS");
            console.log(tracks);
            var uniqueSamples = _self.GetUniqueSamples(tracks).map(function(sample) {
                return _self.GetDuration(sample);
            });

            Promise.all(uniqueSamples).then(function(richSamples) {
                for (var i = 0; i < richSamples.length; i++) {
                    _self.samples[richSamples[i].sample.piece] = richSamples[i];
                }
                console.log("All samples loaded")

                for (var i = 0; i < tracks.length; i++) {


                    // BUILD Actual Tracks
                    var actualTrack = [];
                    for (var t = 0; t < tracks[i].length; t++) {
                        //console.log(_self.samples[tracks[i][t].piece].sampleLength)
                        for (var x = 0; x < tracks[i][t].repeat; x++) {
                            actualTrack.push(tracks[i][t].piece);
                            for (var l = 0; l < _self.samples[tracks[i][t].piece].sampleLength - 1; l++) {
                                actualTrack.push("0");
                            }

                        }
                    }
                    _self.tracks[i].playlist = actualTrack;
                    // /
                }

            });





        }).catch(function(err) {
            Log(err, "Failed during preload")
        });

    }

    Tick() {
        console.log("Tick");
        for (var i = 0; i < this.tracks.length; i++) {
            this.PlayNextBeat(i);
        }
        this.position = this.position + 1;
    }

    PlayNextBeat(track) {
        this.tracks[track].player = this.samples[this.tracks[track].playlist[this.position]].audioObj;
        this.tracks[track].timeLeft = this.samples[this.tracks[track].playlist[this.position]].sampleLength;
        this.tracks[track].repeat = this.tracks[track].playlist[this.position].repeat;
        this.tracks[track].sample = this.tracks[track].playlist[this.position];
        if (this.tracks[track].sample != 0) {
            this.tracks[track].player.play();
        }
        /* console.log("############## " + track + "  ################");
         console.log("TRACK POSITION: " + this.position);
         console.log("TIMELEFT: " + this.tracks[track].timeLeft);
         console.log("SAMPLE REPEAT: " + this.tracks[track].repeat);
         console.log("SAMPLE: " + this.tracks[track].sample);*/

        /*f (this.tracks[track].timeLeft > 0) {
            console.log("Minus time")
            this.tracks[track].timeLeft = this.tracks[track].timeLeft--;
        }
        if (this.tracks[track].repeat > 0) {
            console.log("Minus repeat")
            this.tracks[track].repeat = this.tracks[track].repeat--;
        }
        if (this.tracks[track].timeLeft === 0) {
            if (this.tracks[track].repeat != 0) { // this.tracks[track].player.play();
                console.log("Play")
                return;
            }

        }

        if (this.tracks[track].playlist[this.position]) {
            this.tracks[track].player = this.samples[this.tracks[track].playlist[this.position].piece].audioObj;
            this.tracks[track].timeLeft = this.samples[this.tracks[track].playlist[this.position].piece].sampleLength;
            this.tracks[track].repeat = this.tracks[track].playlist[this.position].repeat;
            this.tracks[track].sample = this.tracks[track].playlist[this.position].piece;

            // this.tracks[track].player.play();
        }*/
    }

    Play() {
        this.playing = !this.playing;
        if (this.playing) {
            this.position = 0;
            this.ticker = setInterval(function() {
                this.Tick()
            }.bind(this), 2000);
        } else {
            clearInterval(this.ticker);
        }
    }
}