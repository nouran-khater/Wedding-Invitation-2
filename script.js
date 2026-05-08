  let opened = false;
  let musicPlaying = false;

  function openEnvelope() {
    if (opened) return;
    opened = true;

    const wrap = document.getElementById('envelopeWrap');
    wrap.classList.add('opening');

    // Flash transition
    const overlay = document.getElementById('open-transition');
    setTimeout(() => {
      overlay.classList.add('flash');
    }, 600);

    setTimeout(() => {
      // Hide scene 1
      document.getElementById('scene-envelope').classList.add('hide');
      // Show scene 2
      document.getElementById('scene-invitation').classList.add('show');
      overlay.classList.remove('flash');

      // Trigger scroll reveals
      setTimeout(observeReveal, 300);
    }, 900);
  }

  function toggleMusic() {
    const audio = document.getElementById('weddingAudio');
    const disc = document.getElementById('vinylDisc');
    const icon = document.getElementById('playIcon');

    musicPlaying = !musicPlaying;
     
    if (musicPlaying) {
      disc.classList.add('playing');
      icon.textContent = '⏸';
      audio.play().catch(()=>{}); // Uncomment when you have an audio source
    } else {
      disc.classList.remove('playing');
      icon.textContent = '▶';
      audio.pause();
    }
  }

  // Scroll reveal
  function observeReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 80);
          }
        });
      }, { threshold: 0.15 });
      reveals.forEach(el => io.observe(el));
    } else {
      reveals.forEach(el => el.classList.add('visible'));
    }
  }