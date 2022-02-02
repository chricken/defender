'use strict';

import dom, { $, $$ } from './dom.js';

const canvas = {
    resize() {
        this.cBG.width = window.innerWidth - 10;
        this.cBG.height = window.innerHeight - 10;
    },
    init() {
        this.cBG = $('#cBG');

        window.addEventListener('resize', this.resize);
        this.resize();


    }
}

export default canvas;