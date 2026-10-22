/* TerraVision marketing site: theme, copy buttons, tabs, the pinned stage, gallery and small animations.
   No dependencies. Everything degrades to a readable static page without JS. */
(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var desktop = window.matchMedia('(min-width: 901px)');
  var REPO = 'https://github.com/patrickchugh/terravision';
  var RAW = 'https://raw.githubusercontent.com/patrickchugh/terravision/main/examples/graphs/';
  var DOCS_GALLERY = 'https://patrickchugh.github.io/terravision/gallery/';
  var CLOUD = { aws: { name: 'AWS', c: 'var(--aws)' }, azure: { name: 'Azure', c: 'var(--azure)' }, gcp: { name: 'Google Cloud', c: 'var(--gcp)' } };
  var GALLERY = window.TV_GALLERY || [];
  var byImg = {};
  GALLERY.forEach(function (g) { byImg[g.img] = g; });

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }

  /* ---------- Theme ---------- */
  $('.theme-toggle').addEventListener('click', function () {
    var root = document.documentElement;
    var current = root.getAttribute('data-theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    var next = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('tv-theme', next); } catch (e) { /* storage unavailable: theme lasts this visit */ }
  });

  /* ---------- Nav border on scroll ---------- */
  var nav = $('#nav');
  function onNavScroll() { nav.classList.toggle('is-scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onNavScroll, { passive: true });
  onNavScroll();

  /* ---------- Copy ---------- */
  var toast = $('#toast'), toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-on'); }, 1600);
  }
  function copyText(text, btn) {
    var done = function () {
      if (btn) {
        btn.classList.add('is-copied');
        setTimeout(function () { btn.classList.remove('is-copied'); }, 1600);
      }
      showToast('Copied to clipboard');
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
    } else { fallbackCopy(text); done(); }
  }
  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) { /* nothing else to try */ }
    document.body.removeChild(ta);
  }
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-copy], [data-copy-pane], [data-copy-text]');
    if (!btn) return;
    e.preventDefault();
    var text = '';
    if (btn.hasAttribute('data-copy-text')) text = btn.getAttribute('data-copy-text');
    else if (btn.hasAttribute('data-copy')) { var t = $(btn.getAttribute('data-copy')); text = t ? t.textContent : ''; }
    else {
      var win = btn.closest('.window');
      var pane = $$('[data-pane], pre.code', win).filter(function (p) { return !p.hidden; })[0];
      if (pane && pane.tagName !== 'PRE') { var a = $('a', pane); text = a ? a.href : pane.textContent; }
      else text = pane ? pane.textContent : '';
    }
    copyText(text.trim(), btn);
  });

  /* ---------- Syntax highlighting (tiny, line based) ---------- */
  var RULES = {
    bash: [
      [/#.*$/, 'c'], [/"[^"]*"|'[^']*'/, 's'], [/(?:^|\s)--?[A-Za-z][\w-]*/, 'y'], [/^\s*[\w.-]+/, 'f']
    ],
    json: [
      [/"(?:[^"\\]|\\.)*"(?=\s*:)/, 'y'], [/"(?:[^"\\]|\\.)*"/, 's'], [/\b(?:true|false|null)\b|-?\b\d+(?:\.\d+)?\b/, 'n']
    ],
    yaml: [
      [/#.*$/, 'c'], [/^\s*(?:-\s+)?[^:\s'"][^:]*?:(?=\s|$)/, 'y'], [/'[^']*'|"[^"]*"/, 's'], [/->/, 'k']
    ]
  };
  function highlightLine(line, rules) {
    var out = '', rest = line, atStart = true;
    while (rest.length) {
      var best = null;
      for (var i = 0; i < rules.length; i++) {
        var re = rules[i][0];
        if (!atStart && re.source.charAt(0) === '^') continue;
        var m = re.exec(rest);
        if (m && (!best || m.index < best.m.index)) best = { m: m, cls: rules[i][1] };
      }
      if (!best) { out += esc(rest); break; }
      var tok = best.m[0];
      out += esc(rest.slice(0, best.m.index));
      // keep the leading whitespace of a flag outside the coloured span
      var lead = tok.match(/^\s*/)[0];
      out += esc(lead) + '<span class="' + best.cls + '">' + esc(tok.slice(lead.length)) + '</span>';
      rest = rest.slice(best.m.index + tok.length);
      atStart = false;
    }
    return out;
  }
  $$('pre.code[data-lang]').forEach(function (pre) {
    var rules = RULES[pre.getAttribute('data-lang')];
    if (!rules) return;
    pre.innerHTML = pre.textContent.split('\n').map(function (l) { return highlightLine(l, rules); }).join('\n');
  });

  /* ---------- Hero install switch ---------- */
  var seg = $('.hero-install .seg'), heroCmd = $('#hero-cmd'), thumb = $('.seg-thumb', seg);
  function placeThumb(btn) { thumb.style.left = btn.offsetLeft + 'px'; thumb.style.width = btn.offsetWidth + 'px'; }
  $$('button', seg).forEach(function (b) {
    b.addEventListener('click', function () {
      $$('button', seg).forEach(function (o) { o.setAttribute('aria-selected', String(o === b)); });
      placeThumb(b);
      heroCmd.style.opacity = '0';
      setTimeout(function () { heroCmd.textContent = b.getAttribute('data-cmd'); heroCmd.style.opacity = '1'; }, 150);
    });
  });
  function initThumb() { placeThumb($('button[aria-selected="true"]', seg)); }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(initThumb);
  initThumb();
  window.addEventListener('resize', initThumb);

  /* ---------- Tabbed code windows ---------- */
  var GRAPH_OUT = {
    aws: { img: 'assets/graph/aws.webp', cmd: 'terravision draw --source aws.tvg.json --format svg', name: 'aws.dot.png' },
    azure: { img: 'assets/graph/azure.webp', cmd: 'terravision draw --source azure.tvg.json --format svg', name: 'azure.dot.png' },
    gcp: { img: 'assets/graph/gcp.webp', cmd: 'terravision draw --source gcp.tvg.json --format svg', name: 'gcp.dot.png' },
    yml: { img: 'assets/gallery/three-tier-web.webp', cmd: 'terravision draw --source three-tier-web.tvg.json --annotate terravision.yml', name: 'three-tier-web.dot.png' }
  };
  $$('.code-tabs').forEach(function (tabs) {
    var win = tabs.closest('.window');
    $$('button', tabs).forEach(function (b) {
      b.addEventListener('click', function () {
        var key = b.getAttribute('data-tab');
        $$('button', tabs).forEach(function (o) { o.setAttribute('aria-selected', String(o === b)); });
        $$('[data-pane]', win).forEach(function (p) { p.hidden = p.getAttribute('data-pane') !== key; });
        $$('[data-caption-for]', win).forEach(function (c) { c.hidden = c.getAttribute('data-caption-for') !== key; });
        if (win.id === 'graph-code') swapGraph(key);
      });
    });
  });
  function swapGraph(key) {
    var o = GRAPH_OUT[key], canvas = $('#graph-canvas'), img = $('#graph-img');
    canvas.classList.remove('is-drawn');
    setTimeout(function () {
      img.onload = function () { canvas.classList.add('is-drawn'); };
      img.src = o.img;
      if (img.complete) canvas.classList.add('is-drawn');
      $('#graph-cmd').textContent = o.cmd;
      $('#graph-out-name').textContent = o.name;
    }, reduceMotion ? 0 : 250);
  }

  /* ---------- Stage: four prompts played by scroll position ---------- */
  var STAGE = [
    { img: 'aws-eks-karpenter', label: 'EKS + Karpenter', cloud: 'aws' },
    { img: 'azure-aks', label: 'AKS microservices', cloud: 'azure' },
    { img: 'gcp-cloud-run-microservices', label: 'Cloud Run services', cloud: 'gcp' },
    { img: 'aws-serverless-event-driven', label: 'Serverless events', cloud: 'aws' }
  ].filter(function (s) { return byImg[s.img]; });

  var stage = $('#tour'), stageWin = $('#stage-window'), tabsRail = $('#stage-tabs');
  var stPrompt = $('#st-prompt'), stCaret = $('#st-caret'), stTool = $('#st-tool'), stCanvas = $('#st-canvas'), stImg = $('#st-img');
  var stSkeleton = $('.skeleton', stCanvas);
  var stageTabs = STAGE.map(function (s, i) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'spec-tab'; b.setAttribute('role', 'tab');
    b.setAttribute('aria-selected', 'false');
    b.style.setProperty('--c', CLOUD[s.cloud].c);
    b.innerHTML = '<span class="idx">0' + (i + 1) + '</span><span class="prov"></span>' + esc(s.label) + '<span class="bar"></span>';
    b.addEventListener('click', function () { goToStage(i); });
    tabsRail.appendChild(b);
    return b;
  });
  // Preload the stage diagrams so each one is ready when its turn comes
  STAGE.forEach(function (s) { var im = new Image(); im.src = 'assets/gallery/' + s.img + '.webp'; });

  var current = -1, playToken = 0, timers = [];
  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }

  function play(i) {
    if (i === current) return;
    current = i;
    var s = STAGE[i], g = byImg[s.img], token = ++playToken;
    stageTabs.forEach(function (t, k) { t.setAttribute('aria-selected', String(k === i)); });
    clearTimers();
    $$('.beat', stageWin).forEach(function (b) { b.classList.remove('is-on'); });
    stTool.classList.remove('is-done');
    stCanvas.classList.remove('is-drawn');
    stSkeleton.classList.add('is-idle');
    $('#st-cloud').textContent = CLOUD[s.cloud].name;
    $('#st-file').textContent = s.img + '.png';
    stImg.alt = g.title + ' architecture diagram drawn by TerraVision';
    later(function () { stImg.src = 'assets/gallery/' + s.img + '.webp'; }, reduceMotion ? 0 : 350);

    if (reduceMotion) {
      stPrompt.textContent = g.prompt; stCaret.style.display = 'none';
      $$('.beat', stageWin).forEach(function (b) { b.classList.add('is-on'); });
      stTool.classList.add('is-done'); stCanvas.classList.add('is-drawn');
      return;
    }

    // 1. type the prompt
    stCaret.style.display = '';
    stPrompt.textContent = '';
    var text = g.prompt, start = null, dur = clamp(text.length * 3.2, 900, 1800);
    function type(ts) {
      if (token !== playToken) return;
      if (start === null) start = ts;
      var n = Math.floor(clamp((ts - start) / dur, 0, 1) * text.length);
      stPrompt.textContent = text.slice(0, n);
      if (n < text.length) requestAnimationFrame(type);
      else afterTyping();
    }
    requestAnimationFrame(type);

    // 2. tool call runs, 3. diagram draws, 4. reply and suggestions
    function afterTyping() {
      stCaret.style.display = 'none';
      later(function () { $$('[data-beat="1"]', stageWin).forEach(function (b) { b.classList.add('is-on'); }); stSkeleton.classList.remove('is-idle'); }, 250);
      later(function () { stTool.classList.add('is-done'); stCanvas.classList.add('is-drawn'); }, 1500);
      later(function () { $$('[data-beat="2"]', stageWin).forEach(function (b) { b.classList.add('is-on'); }); }, 2100);
      later(function () { $$('[data-beat="3"]', stageWin).forEach(function (b) { b.classList.add('is-on'); }); }, 2500);
    }
  }

  function stageMetrics() {
    var rect = stage.getBoundingClientRect(), vh = window.innerHeight;
    // the pin is taller than the screen (the next heading hangs below it), so it stays stuck for stage minus pin height
    var total = stage.offsetHeight - $('.stage-pin', stage).offsetHeight;
    return { rect: rect, vh: vh, total: total, p: total > 0 ? clamp(-rect.top / total, 0, 1) : 0 };
  }
  function goToStage(i) {
    if (!desktop.matches) { play(i); restartAuto(); return; }
    var m = stageMetrics();
    var y = window.scrollY + m.rect.top + m.total * ((i + 0.15) / STAGE.length);
    window.scrollTo({ top: y, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  var cueText = $('#scroll-cue .cue-text'), cueStep = $('#cue-step');
  var stageTicking = false, started = false;
  function onStageScroll() {
    stageTicking = false;
    if (!desktop.matches) { stageWin.style.removeProperty('--enter'); return; }
    var m = stageMetrics();
    // 0 at the top of the page, 1 once the window pins
    var docTop = m.rect.top + window.scrollY;
    var enter = docTop > 0 ? clamp(window.scrollY / docTop, 0, 1) : 1;
    stage.style.setProperty('--enter', reduceMotion ? 1 : enter.toFixed(3));
    if (!started) return;
    var seg = m.p * STAGE.length, idx = Math.min(STAGE.length - 1, Math.floor(seg));
    play(idx);
    stageTabs.forEach(function (t, k) { t.style.setProperty('--p', k < idx ? 1 : k === idx ? Math.min(1, seg - idx).toFixed(3) : 0); });
    // the cue counts the examples, then just points on down the page once the last one plays
    var last = idx === STAGE.length - 1;
    cueText.firstChild.nodeValue = last ? 'Keep scrolling ' : 'Scroll to play ';
    cueStep.textContent = last ? '' : '0' + (idx + 1) + ' / 0' + STAGE.length;
  }
  window.addEventListener('scroll', function () {
    if (!stageTicking) { stageTicking = true; requestAnimationFrame(onStageScroll); }
  }, { passive: true });
  window.addEventListener('resize', onStageScroll);
  onStageScroll();

  // On small screens there is no pinning: cycle the examples while the window is in view
  var autoTimer = null, stageVisible = false;
  function restartAuto() {
    clearInterval(autoTimer);
    if (desktop.matches || reduceMotion || !stageVisible) return;
    autoTimer = setInterval(function () { play((current + 1) % STAGE.length); }, 9000);
  }
  new IntersectionObserver(function (entries) {
    stageVisible = entries[0].isIntersecting;
    restartAuto();
  }, { threshold: 0.3 }).observe(stageWin);
  desktop.addEventListener('change', function () { restartAuto(); onStageScroll(); });

  // Start after the window has risen into place
  setTimeout(function () { started = true; play(0); onStageScroll(); }, reduceMotion ? 0 : 1100);

  stCanvas.addEventListener('click', function () { if (current >= 0) openLightbox(byImg[STAGE[current].img]); });

  /* ---------- Play-once windows when they scroll into view ---------- */
  var runObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add('is-run');
      runObserver.unobserve(en.target);
      if (en.target.id === 'pr-window') runChecks();
    });
  }, { threshold: 0.35 });
  $$('.run-on-view').forEach(function (el) { runObserver.observe(el); });

  /* ---------- Environments terminal ---------- */
  var ENV_IMG = { dev: 'aws-serverless-event-driven', staging: 'aws-ecs-fargate-api', prod: 'aws-multi-region' };
  function renderEnv(env) {
    var cmd = 'terravision draw --source ./infra --varfile ' + env + '.tfvars --outfile ' + env + '-architecture';
    var lines = [
      '<span class="ln" style="--d:0s"><span class="p">$ </span><span class="cmd" style="--n:' + cmd.length + ';--t:1.1s">' + esc(cmd) + '</span></span>',
      '<span class="ln" style="--d:1.2s"><span class="wht">Preflight check..</span></span>',
      '<span class="ln" style="--d:1.45s"><span class="dim">  # plan built from code + </span><span class="env-badge ' + env + '">' + env + '.tfvars</span><span class="dim">, no cloud login</span></span>',
      '<span class="ln" style="--d:1.9s"><span class="wht">Decoding plan..</span></span>',
      '<span class="ln" style="--d:2.15s"><span class="wht">Analysing plan..</span></span>',
      '<span class="ln" style="--d:2.5s"><span class="wht">Rendering Architecture Image...</span></span>',
      '<span class="ln" style="--d:2.85s">  Output file: <span class="hl">' + env + '-architecture.dot.png</span></span>',
      '<span class="ln" style="--d:3.05s"><span class="ok">  Completed!</span></span>',
      '<div class="term-out" style="--d:3.3s"><img src="assets/gallery/' + ENV_IMG[env] + '.webp" alt="" loading="lazy"><div class="files"><span class="env-badge ' + env + '">' + env + '</span><span>.png</span><span>.svg</span><span>.drawio</span></div></div>'
    ];
    $('#env-term').innerHTML = lines.join('');
  }
  var envWin = $('#env-window');
  $$('[data-env]', envWin).forEach(function (b) {
    b.addEventListener('click', function () {
      $$('[data-env]', envWin).forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
      renderEnv(b.getAttribute('data-env'));
      envWin.classList.remove('is-run'); void envWin.offsetWidth; envWin.classList.add('is-run');
    });
  });
  renderEnv('prod');

  /* ---------- Pull request checks ---------- */
  function runChecks() {
    var checks = $$('[data-check]');
    checks.forEach(function (c, i) {
      setTimeout(function () { c.classList.add('is-on'); }, reduceMotion ? 0 : 300 + i * 900);
      setTimeout(function () { c.classList.add('is-done'); }, reduceMotion ? 0 : 900 + i * 900);
    });
    setTimeout(function () { $('#pr-bot').classList.add('is-on'); }, reduceMotion ? 0 : 900 + checks.length * 900);
  }

  /* ---------- Gallery ---------- */
  var FEATURED = ['three-tier-web', 'azure-three-tier', 'gcp-three-tier', 'aws-eks-karpenter', 'azure-hub-spoke', 'gcp-gke'];
  var ordered = FEATURED.map(function (k) { return byImg[k]; }).filter(Boolean)
    .concat(GALLERY.filter(function (g) { return FEATURED.indexOf(g.img) < 0; }));
  var grid = $('#gallery-grid'), moreBtn = $('#gallery-more');
  var filter = 'all', expanded = false, PAGE = 9;

  ['all', 'aws', 'azure', 'gcp'].forEach(function (k) {
    var n = k === 'all' ? GALLERY.length : GALLERY.filter(function (g) { return g.provider === k; }).length;
    var el = $('[data-count="' + k + '"]'); if (el) el.textContent = n;
  });

  function renderGallery() {
    var list = ordered.filter(function (g) { return filter === 'all' || g.provider === filter; });
    var shown = expanded ? list : list.slice(0, PAGE);
    grid.innerHTML = shown.map(function (g, i) {
      var c = CLOUD[g.provider];
      return '<article class="g-card" style="animation-delay:' + (Math.min(i, 8) * 45) + 'ms">' +
        '<a class="g-thumb" href="' + DOCS_GALLERY + '#' + g.id + '" data-open="' + g.img + '">' +
          '<span class="badge" style="--c:' + c.c + '">' + c.name + '</span>' +
          '<img src="assets/gallery/' + g.img + '.webp" width="' + g.w + '" height="' + g.h + '" loading="lazy" alt="' + esc(g.title) + ' architecture diagram">' +
        '</a>' +
        '<div class="g-body"><h3>' + esc(g.title) + '</h3><p>' + esc(g.prompt) + '</p>' +
          '<div class="g-actions">' +
            '<a href="#" data-copy-text="' + esc(g.prompt) + '"><svg><use href="#i-copy"/></svg>Copy prompt</a>' +
            '<a href="' + REPO + '/blob/main/examples/graphs/' + g.source + '.tvg.json"><svg><use href="#i-code"/></svg>Source</a>' +
          '</div></div></article>';
    }).join('');
    moreBtn.parentElement.hidden = list.length <= PAGE;
    moreBtn.textContent = expanded ? 'Show fewer' : 'Show all ' + list.length + ' examples';
  }
  $$('#filters button').forEach(function (b) {
    b.addEventListener('click', function () {
      filter = b.getAttribute('data-filter');
      $$('#filters button').forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
      renderGallery();
    });
  });
  moreBtn.addEventListener('click', function () {
    expanded = !expanded;
    renderGallery();
    if (!expanded) $('#gallery').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  });
  grid.addEventListener('click', function (e) {
    var a = e.target.closest('[data-open]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    openLightbox(byImg[a.getAttribute('data-open')]);
  });
  renderGallery();

  /* ---------- Modals ---------- */
  var lastFocus = null;
  function openModal(m) {
    lastFocus = document.activeElement;
    m.hidden = false;
    requestAnimationFrame(function () { m.classList.add('is-open'); });
    document.body.style.overflow = 'hidden';
    $('.modal-close', m).focus();
  }
  function closeModal(m) {
    m.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(function () {
      m.hidden = true;
      if (m.id === 'video-modal') $('.video-frame', m).innerHTML = '';
    }, 300);
    if (lastFocus) lastFocus.focus();
  }
  $$('.modal').forEach(function (m) {
    m.addEventListener('click', function (e) { if (e.target === m || e.target.closest('.modal-close')) closeModal(m); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    $$('.modal.is-open').forEach(closeModal);
  });

  $$('[data-video]').forEach(function (b) {
    b.addEventListener('click', function () {
      var m = $('#video-modal');
      $('.video-frame', m).innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/BbXWR-v_Dl0?autoplay=1&rel=0" title="TerraVision intro" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
      openModal(m);
    });
  });

  function openLightbox(g) {
    if (!g) return;
    var m = $('#lightbox');
    $('#lb-img').src = 'assets/gallery/' + g.img + '.webp';
    $('#lb-img').alt = g.title + ' architecture diagram';
    $('#lb-title').textContent = g.title;
    $('#lb-prompt').textContent = g.prompt;
    $('#lb-cmd').textContent = 'terravision draw --source ' + g.source + '.tvg.json --annotate ' + g.source + '.annotations.yml --format drawio';
    $('#lb-links').innerHTML =
      '<a href="' + RAW + g.source + '.png">PNG</a>' +
      '<a href="' + RAW + g.source + '.svg">SVG</a>' +
      '<a href="' + RAW + g.source + '.tvg.json">Source graph</a>' +
      '<a href="' + RAW + g.source + '.annotations.yml">Annotations</a>' +
      '<a href="' + DOCS_GALLERY + '#' + g.id + '">In the docs ↗</a>';
    $('.lb-img', m).scrollTop = 0;
    openModal(m);
  }

  /* ---------- Pause the horizon glint once the hero is out of view ---------- */
  var horizon = $('.horizon');
  new IntersectionObserver(function (en) { horizon.classList.toggle('is-paused', !en[0].isIntersecting); }).observe(horizon);

  /* ---------- Count-up stats ---------- */
  var countObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      countObserver.unobserve(en.target);
      if (reduceMotion) return;
      var el = en.target, to = +el.getAttribute('data-count-to'), t0 = null;
      (function step(ts) {
        if (t0 === null) t0 = ts;
        var k = clamp((ts - t0) / 1400, 0, 1);
        el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(step);
      })(performance.now());
    });
  }, { threshold: 0.6 });
  $$('[data-count-to]').forEach(function (el) { countObserver.observe(el); });

  /* ---------- Feature cards follow the pointer ---------- */
  $$('.card').forEach(function (card) {
    card.addEventListener('pointermove', function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  /* ---------- Closing prompt types itself ---------- */
  var CTA_PROMPTS = [
    'Draw an Azure hub-and-spoke landing zone',
    'Draw the architecture of the Terraform in ./infra',
    'Show how a request flows through it',
    'Write the Terraform for this architecture',
    'Draw a GKE cluster with Private Service Connect',
    'Make this diagram interactive'
  ];
  var ctaEl = $('#cta-typed');
  if (!reduceMotion) {
    var ci = 0, cj = CTA_PROMPTS[0].length, deleting = true, ctaVisible = false;
    new IntersectionObserver(function (en) { ctaVisible = en[0].isIntersecting; }).observe(ctaEl);
    (function tick() {
      var word = CTA_PROMPTS[ci], delay = deleting ? 22 : 45;
      if (ctaVisible) {
        if (deleting) { cj--; if (cj <= 0) { deleting = false; ci = (ci + 1) % CTA_PROMPTS.length; delay = 300; } }
        else { cj++; if (cj >= CTA_PROMPTS[ci].length) { deleting = true; delay = 2200; } }
        ctaEl.textContent = CTA_PROMPTS[ci].slice(0, Math.max(0, cj));
      } else delay = 400;
      setTimeout(tick, delay);
    })();
  }

  /* ---------- Live GitHub stars and release ---------- */
  function fmt(n) { return n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '') + 'k' : String(n); }
  if (window.fetch) {
    fetch('https://api.github.com/repos/patrickchugh/terravision').then(function (r) { return r.ok ? r.json() : null; }).then(function (d) {
      if (d && typeof d.stargazers_count === 'number') $$('[data-stars]').forEach(function (el) { el.textContent = '★ ' + fmt(d.stargazers_count); });
    }).catch(function () { /* keep the static label */ });
    fetch('https://api.github.com/repos/patrickchugh/terravision/releases/latest').then(function (r) { return r.ok ? r.json() : null; }).then(function (d) {
      if (d && d.tag_name) $$('[data-version]').forEach(function (el) { el.textContent = /^v/.test(d.tag_name) ? d.tag_name : 'v' + d.tag_name; });
    }).catch(function () { /* keep the static label */ });
  }
})();
