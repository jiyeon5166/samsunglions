// 경기카드 오토슬라이드
const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    slidesPerView: 3, 
    spaceBetween: 60, 
    
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
});

//유튜브 재생
document.addEventListener('DOMContentLoaded', () => {
  const box = document.querySelector('.youtube_section .video_box');
  if (!box) return;

  const summary = box.querySelector('summary');
  const iframe  = box.querySelector('iframe');

  const rawSrc = iframe.getAttribute('src');
  if (rawSrc) {
    iframe.setAttribute('data-src', rawSrc);
    iframe.removeAttribute('src');
  }

  summary.addEventListener('click', (e) => {
    e.preventDefault();           
    if (box.open) return;

    box.open = true;

    const base = iframe.dataset.src || '';
    const sep  = base.includes('?') ? '&' : '?';
    iframe.src = `${base}${sep}autoplay=1&mute=1&rel=0&playsinline=1`;

    iframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
  });
});