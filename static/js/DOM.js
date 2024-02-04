const DOMELEMENTS = {
    s0: document.getElementById('s0'),
    s1: document.getElementById('s1'),
    s2: document.getElementById('s2'),
    s3: document.getElementById('s3'),
    s4: document.getElementById('s4'),
    s5: document.getElementById('s5'),
    s6: document.getElementById('s6'),
    reset3JSBtn: document.getElementById('threejs-reset-cam-pos'),
    GROUP: {
        sections: document.getElementsByTagName('section'),
        downButtons: document.getElementsByClassName('down-button')
    },
    downButton: document.getElementById('down-button'),
}

DOMELEMENTS.downButton.addEventListener('click', () => window.scrollBy({ top: 10, behavior: 'smooth' }));