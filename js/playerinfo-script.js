(() => {
  const btn = document.querySelector('.audio-thumb');
  const audio = document.getElementById('anthem-audio');

  if (!btn || !audio) return;

  // 아이콘 텍스트 토글용
  const setIcon = (playing) => {
    const icon = btn.querySelector('.play-icon');
    if (!icon) return;
    icon.textContent = playing ? '❚❚' : '▶';
  };

  const playPause = async () => {
    try {
      if (audio.paused) {
        await audio.play();
        btn.classList.add('is-playing');
        btn.setAttribute('aria-pressed', 'true');
        setIcon(true);
      } else {
        audio.pause();
        btn.classList.remove('is-playing');
        btn.setAttribute('aria-pressed', 'false');
        setIcon(false);
      }
    } catch (e) {
      // 브라우저 자동재생 정책에 걸리면 여기로 들어올 수 있음
      console.warn('Playback error:', e);
    }
  };

  btn.addEventListener('click', playPause);
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); playPause(); }
  });

  // 재생이 끝나면 상태 되돌리기
  audio.addEventListener('ended', () => {
    btn.classList.remove('is-playing');
    btn.setAttribute('aria-pressed', 'false');
    setIcon(false);
  });
})();



const swiper = new Swiper('.swiper', {
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: 30,

  speed: 5000,                     
  autoplay: {
    delay: 0,                     
    disableOnInteraction: false,
    pauseOnMouseEnter: true,        
  },

  loopedSlides: 12,
  loopAdditionalSlides: 12,

  scrollbar: { el: '.swiper-scrollbar', draggable: true },

  grabCursor: true
});