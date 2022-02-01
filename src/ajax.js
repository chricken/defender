'use strict';

const ajax = {
    getJSON(url) {
        return fetch(
            url
        ).then(
            res => res.json()
        )
    }
}

export default ajax;