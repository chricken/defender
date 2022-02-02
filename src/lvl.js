'use strict';

import ajax from './ajax.js';

const lvl = {
    // Breite des Levels relativ zum Spielfeld
    width: 1,

    // Elemente, die im BG dargestellt werden
    bg: [],

    // Bilder, auf die bei der Darstellung Bezug genommen wird
    imgs: {},

    // Level zeichnen
    draw(scrollX) {
        this.bg.map(el => {

            let img = this.imgs[el.img];
            let h = this.cBG.height * el.height;
            let w = h / img.naturalHeight * img.naturalWidth;

            console.log(
                this.imgs[el.img],
                cBG.width * el.x,
                cBG.height - h,
                w, h
            );

            this.ctxBG.drawImage(
                this.imgs[el.img],
                cBG.width * el.x,
                cBG.height - h,
                w, h
            )
        })
    },

    // Übertragen der Leveldaten in die Datenstruktur
    process(data) {
        this.width = data.structure.width;

        this.imgs = {};
        for (let key in data.imgs) {
            this.imgs[key] = document.createElement('img');
            this.imgs[key].src = `img/${data.imgs[key]}`;
        }

        this.bg = data.bg;
        // console.log(lvl);
    },

    // Laden der Leveldaten
    load(num) {
        return ajax.getJSON(`/data/lvl${num}.json`).then(
            this.process,
            console.log
        )
    },

    init() {
        this.draw = this.draw.bind(this);
        this.process = this.process.bind(this);

        // Canvas für den Background
        this.cBG = document.querySelector('#cBG');
        this.ctxBG = this.cBG.getContext('2d');
        this.load(1).then(
            () => this.draw(0)
        )
    }
}

export default lvl;