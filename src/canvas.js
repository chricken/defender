'use strict';

import dom, { $, $$ } from './dom.js';
import lvl from './lvl.js';

const canvas = {
    resize() {
        this.cBG.width = window.innerWidth;
        this.cBG.height = window.innerHeight;
        //lvl.draw();
    },
    init() {
        this.cBG = $('#cBG');

        window.addEventListener('resize', this.resize);
        this.resize();


    }
}

export default canvas;