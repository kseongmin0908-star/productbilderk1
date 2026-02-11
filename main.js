
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Parallax effect on hero section
    window.addEventListener('scroll', function() {
        const hero = document.getElementById('hero');
        let offset = window.pageYOffset;
        hero.style.backgroundPositionY = offset * 0.5 + 'px';
    });

    // Fade in elements on scroll
    const faders = document.querySelectorAll('section > *, .gallery-item');
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        fader.classList.add('fade-in');
        appearOnScroll.observe(fader);
    });
});

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
.fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}
.appear {
    opacity: 1;
    transform: translateY(0);
}
`;
document.head.appendChild(styleSheet);
