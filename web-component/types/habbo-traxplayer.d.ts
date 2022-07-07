import { LitElement } from "lit-element";
declare class TraxPlayer extends LitElement {
    static styles: import("lit-element").CSSResult;
    songUrl: string;
    sampleUrl: string;
    private _volume;
    private _title;
    private _author;
    private _samples;
    private _tracks;
    private _traxLengthInSeconds;
    private _traxLengthAsText;
    private _ready;
    private _playing;
    private _timeInSeconds;
    private _timeAsText;
    private _position;
    private _time;
    private _ticker;
    constructor();
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): Promise<void>;
    private _fetchSong;
    private _getTrack;
    private _getUniqueSamples;
    private _getSampleLength;
    private _getSampleUrl;
    private _getDuration;
    private _preload;
    private _onReady;
    private _setVolume;
    private _calculatePlaytime;
    private _setPlayTime;
    private _secondsToString;
    private _setTime;
    private _fetchUrl;
    private _tick;
    private _playNextBeat;
    private _resetPlayer;
    private _play;
}
declare global {
    interface HTMLElementTagNameMap {
        "habbo-traxplayer": TraxPlayer;
    }
}
export {};
