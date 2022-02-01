'use strict';

import dom, { $, $$ } from './dom.js';

const canvas = {
    cSpielfeld: false,
    resize() {
        this.cSpielfeld.width = window.innerWidth - 10;
        this.cSpielfeld.height = window.innerHeight - 10;
    },
    init() {
        this.cSpielfeld = $('#cSpielfeld');

        window.addEventListener('resize', this.resize);
        this.resize();


    }
}

export default canvas;