# Javascript Trax Player
## About
This repository is an attempt to recreate the Trax Player originally a Flash(.swf) embedded element as seen below in pure Javascript. 

![TraxPlayer](images/trax.png)


At the moment its working and its looking like this.

![TraxPlayer](images/trax-pure-javascript.png)


## How to use 

A proper guide is coming soon

Embed the stylesheet

```html
<link href="css/style.css" rel="stylesheet">
```

Add the HTML

```html
<div class="trax-player" id="trax-player">
    <div class="display">
        <div class="loading"></div>
        <div class="display-inner">
            <div class="title"></div>
            <div class="author"></div>
        </div>

    </div>
    <div class="control">
        <button class="play-btn" onClick={_traxPlayer.Play()}>Play</button>
    </div>
    <div class="volumecontainer">
        <div class="volume-indicator">
            <div class="volume-indicator-filled">
                <div class="volume-indicator-filled-bg"></div>
            </div>
        </div>
        <input type="range" min="0" max="100" value="50" class="volume">
    </div>
    <div class="music-activity"></div>
</div>
```

Springle some javacript on it 

```javascript
var _traxPlayer = new TraxPlayer("SONGURL", "DIRECTORY_FOR_MP3"); 
```
