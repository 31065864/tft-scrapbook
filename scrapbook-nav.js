/* Section-nav arrows: hides the native scrollbar and adds ‹ › buttons that
   scroll the menu. Arrows auto-hide when every item already fits. */
(function () {
  function initNav(nav) {
    var inner = nav.querySelector('.sb-nav-inner');
    if (!inner || nav.dataset.arrowsInit) return;
    nav.dataset.arrowsInit = '1';

    var left = document.createElement('button');
    left.type = 'button';
    left.className = 'sb-nav-arrow sb-nav-arrow-left';
    left.setAttribute('aria-label', 'Scroll menu left');
    left.innerHTML = '‹';

    var right = document.createElement('button');
    right.type = 'button';
    right.className = 'sb-nav-arrow sb-nav-arrow-right';
    right.setAttribute('aria-label', 'Scroll menu right');
    right.innerHTML = '›';

    var bar = document.createElement('div');
    bar.className = 'sb-nav-bar';
    nav.insertBefore(bar, inner);
    bar.appendChild(left);
    bar.appendChild(inner);
    bar.appendChild(right);

    function update() {
      var max = inner.scrollWidth - inner.clientWidth;
      nav.classList.toggle('sb-nav-no-overflow', max <= 1);
      left.disabled = inner.scrollLeft <= 0;
      right.disabled = inner.scrollLeft >= max - 1;
    }
    function step(dir) {
      // scrollLeft += animates via CSS scroll-behavior: smooth; reliable where
      // scrollBy({behavior:'smooth'}) is a no-op (e.g. some headless engines).
      inner.scrollLeft += dir * inner.clientWidth * 0.7;
    }
    left.addEventListener('click', function () { step(-1); });
    right.addEventListener('click', function () { step(1); });
    inner.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    var active = inner.querySelector('a.active');
    if (active) active.scrollIntoView({ inline: 'center', block: 'nearest' });
    update();
  }

  function boot() {
    document.querySelectorAll('nav.sb-nav').forEach(initNav);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
