import {
  html,
  css,
  LitElement,
  property,
  customElement,
  state,
} from "lit-element";
import traxplayerStyles from "./habbo-traxplayer.style";

type Track = { blocks: number; piece: number };

@customElement("habbo-traxplayer")
export class TraxPlayer extends LitElement {
  static styles = traxplayerStyles;

  @property({ type: String }) songUrl = "";

  @property({ type: String }) sampleUrl = "";

  @state() private _title = "";
  @state() private _author = "";
  @state() private _samples: any[] = new Array();
  @state() private _tracks: any[] = new Array();
  @state() private _traxLengthInSeconds: number = 0;

  constructor() {
    super();
    for (var i = 0; i < 4; i++) {
        this._tracks.push({
            player: new Audio(),
            timeLeft: 0,
            blocks: 0,
            sample: 0,
            playlist: []
        });
    }
  }

  render() {
    return html`
      <div class="trax-player" id="trax-player">
        <div class="display">
          <div class="loading"></div>
          <div class="display-inner">
            <div class="title"></div>
            <div class="author"></div>
            <div class="time"><span class="length"></span></div>
          </div>
        </div>
        <div class="control">
          <button class="play-btn" @click="${this._play()}">Play</button>
        </div>
        <div class="volumecontainer">
          <div class="volume-indicator">
            <div class="volume-indicator-filled">
              <div class="volume-indicator-filled-bg"></div>
            </div>
          </div>
          <input type="range" min="0" max="100" value="50" class="volume" />
        </div>
        <div class="music-activity"></div>
      </div>
    `;
  }

  async firstUpdated() {
    // Give the browser a chance to paint
    await new Promise((r) => setTimeout(r, 0));
    await (async () => {
      await this._preload();
    })()
    .catch(error => {
      console.log(error);
    });
  }

  private async _fetchSong(): Promise<Track[][]> {
    var song = "status=0&name=Too lost in the lido&author=Patrick&track1=317,4;408,7;0,1;410,16;413,4;406,4;410,8;412,4&track2=0,2;321,2;443,22;91,2;317,8;443,8;412,2;0,2&track3=0,3;320,2;0,7;414,4;445,4;412,2;323,2;412,4;96,2;412,2;414,4;445,7;448,1;317,4&track4=0,3;324,2;0,6;448,1;0,6;96,2;322,4;96,2;99,2;322,4;412,2;0,2;322,2;96,2;322,2;0,1;324,2;0,3";

    //var song = await this._fetchUrl(this.songUrl);
    var urlSearchParams = new URLSearchParams("?" + song);

    var track1 = urlSearchParams.get("track1") as string;
    var track2 = urlSearchParams.get("track2") as string;
    var track3 = urlSearchParams.get("track3") as string;
    var track4 = urlSearchParams.get("track4") as string;
    this._title = urlSearchParams.get("name") as string;
    this._author = urlSearchParams.get("author") as string;
    return new Promise((resolve, reject) => {
      resolve([
        this._getTrack(track1),
        this._getTrack(track2),
        this._getTrack(track3),
        this._getTrack(track4),
      ]);
    });
  }

  private _getTrack(sample: string) {
    let track: Track[] = new Array();
    sample.split(";").forEach((sample) => {
      const samplePiece = sample.split(",")[0];
      const blocks = sample.split(",")[1];
      track.push({ blocks: parseInt(blocks), piece: parseInt(samplePiece) });
    });
    return track;
  }

  private _getUniqueSamples(tracks: Track[][]): Track[] {
    var flags: number[] = new Array();
    var output = new Array();

    for (var t = 0; t < tracks.length; t++) {
      for (var i = 0; i < tracks[t].length; i++) {
        if (flags[tracks[t][i].piece]) continue;

        flags.push(tracks[t][i].piece);
        output.push(tracks[t][i]);
      }
    }
    return output;
  }

  private _getSampleLength(duration: number): number{
    var result = duration * 1000;
    if (result < 2100) {
      return 1;
    }
    if (result < 4100) {
      return 2;
    }
    if (result < 6100) {
      return 3;
    }
    return 4;
  }
  private _getSampleUrl(sampleId: number) {
    return this.sampleUrl + "sound_machine_sample_" + sampleId + ".mp3";
  }
  private async _getDuration(sample: Track): Promise<{
    sampleLength: number;
    sample: Track;
    audioObj: HTMLAudioElement,
    src: string,
  }> {
    var _self = this;
    return new Promise(function (resolve) {
      var audio = new Audio();
      audio.addEventListener("loadedmetadata", function () {
        resolve({
          sampleLength: _self._getSampleLength(audio.duration),
          sample: sample,
          audioObj: audio,
          src: audio.src,
        });
      });
      audio.src = _self._getSampleUrl(sample.piece);
    });
  }

  private async _preload() {
    console.log(`SongUrl: ${this.songUrl}, sampleUrl: ${this.sampleUrl}`);
    var _self = this;

    try {
      var tracks = await this._fetchSong();

      console.log("Song loaded, loading samples");
      console.log("TRACKS");
      console.log(tracks);
      var uniqueSamples = _self
        ._getUniqueSamples(tracks)
        .map(function (sample) {
          return _self._getDuration(sample);
        });
      
      Promise.all(uniqueSamples).then(function (richSamples) {
        console.log(richSamples)
        for (var i = 0; i < richSamples.length; i++) {
          _self._samples[richSamples[i].sample.piece] = richSamples[i];
        }
        console.log("All samples loaded");
        for (var i = 0; i < tracks.length; i++) {
          console.log("sdf")
          // BUILD Actual Tracks
          var actualTrack = [];
          for (var t = 0; t < tracks[i].length; t++) {
            console.log(tracks[i][t].blocks)
            var repeat =
              tracks[i][t].blocks /
              _self._samples[tracks[i][t].piece].sampleLength;
            for (var x = 0; x < repeat; x++) {
              actualTrack.push(tracks[i][t].piece);
              for (
                var l = 0;
                l < _self._samples[tracks[i][t].piece].sampleLength - 1;
                l++
              ) {
                actualTrack.push("0");
              }
            }
          }
          _self._tracks[i].playlist = actualTrack;
        }
        _self._calculatePlaytime();
        //_self.OnReady();
      });
    } catch (err) {
      console.log("Failed during preload", err);
    }
  }

  private _calculatePlaytime() {
    var longestTrack = this._tracks[0].playlist;
    for (var t = 0; t < this._tracks.length; t++) {
        console.log(this._tracks[t].playlist.length)
        if (this._tracks[t].playlist.length > longestTrack.length) {
            longestTrack = this._tracks[t].playlist;
        }
    }
    var traxLengthInSeconds = longestTrack.length * 2;
    this._traxLengthInSeconds = traxLengthInSeconds;

    this._setPlayTime();
}

private _setPlayTime() {
  var str = this._secondsToString(this._traxLengthInSeconds);
  var time = this.getElementsByClassName("time");
  if (time.length > 0) {
      var totalTimeElement = document.createElement('span');
      totalTimeElement.innerHTML = "(" + str + ")";
      totalTimeElement.classList.add("length");
      time[0].innerHTML = str;
      time[0].appendChild(totalTimeElement);
  }

  console.log(str);
}

private _secondsToString(seconds: number) {
  var d = Number(seconds);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);

  var str = "0" + m + ":";
  if (s < 10) {
      str += "0";
  }
  str += "" + s;
  return str;
}


  private _fetchUrl(url: string) {
    let myHeaders = new Headers({ RequestMode: "cors" });
    let options = {
      method: "GET",
      headers: myHeaders,
    };

    return fetch(url, options).then((response) => response.text());
  }

  private _play() {
    //alert(this.sampleUrl)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "habbo-traxplayer": TraxPlayer;
  }
}
