'use strict';

import ajax from './ajax.js';

const lvl = {
    // Aktiver Level
    levelNum: 1,
    // Breite des Levels relativ zum Spielfeld
    width: 1,

    // Elemente, die im BG dargestellt werden
    bg: [],

    // Bilder, auf die bei der Darstellung Bezug genommen wird
    imgs: {},

    // Level zeichnen
    draw() {
        this.ctxBG.clearRect(0, 0, this.cBG.width, this.cBG.height);

        this.bg.map(el => {

            //console.log(el.x);
            let img = this.imgs[el.img];
            let h = this.cBG.height * el.height;
            let w = h / img.naturalHeight * img.naturalWidth;
            let posX = (((this.cBG.width * this.width)) * el.x) - cBG.width / 2;
            let posY = (this.cBG.height - h) * el.y;

            // console.log(this.imgs[el.img], posX, posY, w, h);
            // console.log(this.cBG.width, this.cBG.height);

            this.ctxBG.drawImage(this.imgs[el.img], posX, posY, w, h);
        })
    },

    // Übertragen der Leveldaten in die Datenstruktur
    process(data) {

        this.width = data.structure.width;

        this.imgs = {};
        const eventsResolved = [];
        for (let key in data.imgs) {
            this.imgs[key] = document.createElement('img');
            // erst, wenn alle Bilder geladen sind, soll diese Promisesammlung erfüllt sein
            eventsResolved.push(new Promise(resolve => {
                this.imgs[key].addEventListener('load', resolve)
            }))
            this.imgs[key].src = `img/${data.imgs[key]}`;
        }

        this.bg = data.bg;
        return Promise.all(eventsResolved);
    },

    // Laden der Leveldaten
    load(num) {
        return ajax.getJSON(`/data/lvl${num}.json`).then(
            this.process,
            console.log
        )
    },

    // Position der Elemente um ein Stückchen verschieben
    scroll(scrollX) {
        this.bg.forEach(el => {
            el.x += scrollX;
            el.x += (el.x < 0) ? 1 : 0;
            el.x -= (el.x > 1) ? 1 : 0;
        })
        this.draw();
    },

    init() {
        this.draw = this.draw.bind(this);
        this.process = this.process.bind(this);
        this.scroll = this.scroll.bind(this);

        // Canvas für den Background
        this.cBG = document.querySelector('#cBG');
        this.ctxBG = this.cBG.getContext('2d');

        this.load(this.levelNum).then(
            () => this.draw()
        ).then(
            //() => this.scroll()
            () => this.scrollTimer = setInterval(this.scroll, 30, .002)
        ).catch(
            console.log
        )
    }
}

export default lvl;