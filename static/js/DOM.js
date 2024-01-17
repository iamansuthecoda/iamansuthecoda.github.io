const DOMELEMENTS = {
    GROUP: {
        sections: document.getElementsByTagName('section'),
        downButtons: document.getElementsByClassName('down-button')
    },
    downButton: document.getElementById('down-button'),
}

document.addEventListener('scroll', (e) => {
    for (i=0; i<DOMELEMENTS.GROUP.sections.length; i++) {
        const rect = DOMELEMENTS.GROUP.sections[i].getBoundingClientRect();
        if(rect.top > 0 && rect.top < 150) window.location.hash = `#${DOMELEMENTS.GROUP.sections[i].id}`;
    }
});

DOMELEMENTS.downButton.addEventListener('click', () => window.scrollBy({ top: 10, behavior: 'smooth' }));

// for(i=0; i<DOMELEMENTS.group.downButtons.length; i++){
//     const downBtn = DOMELEMENTS.group.downButtons[i];
//     downBtn.addEventListener('click', () => {
//         window.scrollBy({top:10, behavior:'smooth'});
//     });
// }

