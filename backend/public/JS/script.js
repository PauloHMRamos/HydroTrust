/*

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
  });
*/
AOS.init({
    duration: 900,
    once: true
  });

// Código abaixo: Função chamada quando um link de navegação é clicado. //

let menuItem = document.querySelectorAll('.nav__link');

function selectLink() {

    menuItem.forEach((item) => {
        item.classList.remove('ativo');
    });

    this.classList.add('ativo');
}


menuItem.forEach((item) => {
    item.addEventListener('click', selectLink);
});

// Fim do código//




//Ao scrollar o mouse aparecer ou sumir o header //

let header = document.querySelector('.header');
let navItems = document.querySelectorAll('.nav__link'); 

let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const isScrollingDown = currentScrollY > lastScrollY;
    const isAtBottom = (windowHeight + currentScrollY) >= (documentHeight - 5); // margem de erro de 5px

    if (isScrollingDown && !isAtBottom) {
        header.classList.add('hide');
        navItems.forEach(item => item.classList.add('hide'));
    } else {
        header.classList.remove('hide');
        navItems.forEach(item => item.classList.remove('hide'));
    }

    lastScrollY = currentScrollY;
});

// Fim do código//




let sections = document.querySelectorAll('[id]');
let navLinks = document.querySelectorAll('.nav__link');

window.addEventListener('scroll', () => {
    let top = window.scrollY;
    let viewportHeight = window.innerHeight;
    let documentHeight = document.documentElement.scrollHeight;
    let isAtBottom = (top + viewportHeight) >= (documentHeight - 5);

    sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        const id = sec.getAttribute('id');

        if (id === 'footer' && isAtBottom) {
            navLinks.forEach(link => link.classList.remove('ativo'));
            let activeLink = document.querySelector('.nav__link[href="#' + id + '"]');
            if (activeLink) activeLink.classList.add('ativo');
        }
        else if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
            navLinks.forEach(link => link.classList.remove('ativo'));
            let activeLink = document.querySelector('.nav__link[href="#' + id + '"]');
            if (activeLink) activeLink.classList.add('ativo');
        }
    });
});




