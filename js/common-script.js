//nav의 서브 메뉴
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('header nav');
  if (!nav) return;

  const dropBg = nav.querySelector('.drop-bg');

  const depth1All = [...nav.querySelectorAll('.depth1 > li > a')];
  const depth2Links = nav.querySelectorAll('.depth2 > li > a');

  const depth1WithSub = depth1All.filter(a => a.nextElementSibling?.classList.contains('depth2'));
  const depth1NoSub   = depth1All.filter(a => !(a.nextElementSibling?.classList.contains('depth2')));

  let hoverTimer = null;
  const openMenu  = () => nav.classList.add('open');
  const closeMenu = () => nav.classList.remove('open');
  const armClose  = (d=80)=>{ clearTimeout(hoverTimer); hoverTimer=setTimeout(closeMenu,d); };
  const cancelClose = ()=> clearTimeout(hoverTimer);

  [...depth1WithSub, ...depth2Links].forEach(a => {
    a.addEventListener('mouseenter', () => { cancelClose(); openMenu(); });
    a.addEventListener('focus',      () => { cancelClose(); openMenu(); });
  });

  depth1NoSub.forEach(a => {
    a.addEventListener('mouseenter', () => armClose(0)); 
    a.addEventListener('focus',      () => armClose(0));
  });

  dropBg.addEventListener('mouseenter', () => armClose(60));

  nav.addEventListener('mouseleave', (e) => {
    const toEl = e.relatedTarget;
    if (!toEl || !nav.contains(toEl)) armClose(80);
  });


  nav.addEventListener('focusout', () => {
    setTimeout(() => { if (!nav.contains(document.activeElement)) closeMenu(); }, 0);
  });

  window.addEventListener('touchstart', (e) => {
    if (!nav.contains(e.target)) closeMenu();
  });
});