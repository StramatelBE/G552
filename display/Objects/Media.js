const { ipcRenderer } = require('electron');

class Medias {
    constructor() {
        this.medias = [];
        this.currentMedia = null;
        this.currentMediaIndex = -1; // setting -1 as initial value indicating no media is being played
        this.currentMediaDuration = null;
        this.currentMediaName = null;
        this.currentMediaPath = null;
        this.currentMediaType = null;

        ipcRenderer.on('mediaData', (event, mediaData) => {
            // Assumes mediaData is an array of media objects
            this.medias = mediaData;
            if(this.medias.length > 0) {
                this.setCurrentMedia(0);
            }
        });
    }

    setCurrentMedia(index) {
        if(index >= 0 && index < this.medias.length) {
            this.currentMediaIndex = index;
            this.currentMedia = this.medias[this.currentMediaIndex];
            this.currentMediaDuration = this.currentMedia.duration;
            this.currentMediaName = this.currentMedia.name;
            this.currentMediaPath = this.currentMedia.path;
            this.currentMediaType = this.currentMedia.type;
        }
    }

    play() {
        if(this.currentMedia) {
            // You need to implement the play functionality here
            // Depends on what kind of media it is and how you want to play it
        }
    }

    pause() {
        if(this.currentMedia) {
            // You need to implement the pause functionality here
            // Depends on what kind of media it is and how you want to pause it
        }
    }

    stop() {
        if(this.currentMedia) {
            if (this.currentMediaType === "video") {
                // implement here
            }
            else if (this.currentMediaType === "image") {

            }
        }
    }

    next() {
        if(this.currentMediaIndex < this.medias.length - 1) {
            this.setCurrentMedia(this.currentMediaIndex + 1);
            this.play();
        }
    }

    prev() {
        if(this.currentMediaIndex > 0) {
            this.setCurrentMedia(this.currentMediaIndex - 1);
            this.play();
        }
    }
}
