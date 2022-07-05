import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import traxplayerStyles from "./habbo-traxplayer.style";


@customElement("habbo-traxplayer")
export class TraxPlayer extends LitElement {
  static styles = traxplayerStyles;

  @property({ type: String })
  songUrl = "";

  @property({ type: String })
  sampleUrl = "";

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
    console.log("LOAD")
  }

  private _fetchUrl(url: string) {
    let myHeaders = new Headers({ RequestMode: "cors" });
    let options = {
        method: "GET",
        headers: myHeaders
    };

    return fetch(url, options).then(response => response.text());
};

  private _play() {
    //alert(this.sampleUrl)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "habbo-traxplayer": TraxPlayer;
  }
}
