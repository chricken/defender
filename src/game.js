'use strict';

import ajax from './ajax.js';

const game = {
    // Breite des Levels relativ zum Spielfeld
    width: 1,

    // Elemente, die im BG dargestellt werden
    bg: [],

    // Bilder, auf die bei der Darstellung Bezug genommen wird
    imgs: {},

    // Übertragen der Leveldaten in die Datenstruktur
    processLvl(data) {
        game.width = data.structure.width;

        game.imgs = data.imgs;

        game.bg = data.bg;

        console.log(game);
    },

    // Laden der Leveldaten
    loadLvl(lvl) {
        ajax.getJSON(`/data/lvl${lvl}.json`).then(
            this.processLvl
        )
    },

    init() {
        this.loadLvl(1);
    }
}

export default game;