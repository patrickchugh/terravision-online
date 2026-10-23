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
    var current = root.getAttribute('data-theme') || 'dark';
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
        '<a class="g-thumb" href="' + DOCS_GALLERY + '#' + g.id + '" target="_blank" rel="noopener" data-open="' + g.img + '">' +
          '<span class="badge" style="--c:' + c.c + '">' + c.name + '</span>' +
          '<img src="assets/gallery/' + g.img + '.webp" width="' + g.w + '" height="' + g.h + '" loading="lazy" alt="' + esc(g.title) + ' architecture diagram">' +
          '<span class="g-mag" aria-hidden="true"></span>' +
        '</a>' +
        '<div class="g-body"><h3>' + esc(g.title) + '</h3><p>' + esc(g.prompt) + '</p>' +
          '<div class="g-actions">' +
            '<a href="#" data-copy-text="' + esc(g.prompt) + '"><svg><use href="#i-copy"/></svg>Copy prompt</a>' +
            '<a href="' + REPO + '/blob/main/examples/graphs/' + g.source + '.tvg.json" target="_blank" rel="noopener"><svg><use href="#i-code"/></svg>Source</a>' +
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

  /* ---------- Gallery hover magnifier ---------- */
  var MAG = 3; // magnified width as a multiple of the card width
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  var hdCache = {};
  function hdUrl(img) { return 'assets/gallery/hd/' + img + '.webp'; }
  function preloadHd(img, done) {
    if (hdCache[img] === true) { done(); return; }
    var im = hdCache[img] || (hdCache[img] = new Image());
    im.addEventListener('load', function () { hdCache[img] = true; done(); }, { once: true });
    if (!im.src) im.src = hdUrl(img);
  }
  var magThumb = null, magTimer = 0, magFrame = 0, magEvent = null;
  function placeMag() {
    magFrame = 0;
    if (!magThumb || !magEvent) return;
    var r = magThumb.getBoundingClientRect(), g = byImg[magThumb.getAttribute('data-open')];
    var W = r.width * MAG, H = W * g.h / g.w;
    var cx = clamp(magEvent.clientX - r.left, 0, r.width), cy = clamp(magEvent.clientY - r.top, 0, r.height);
    // The point under the pointer sits at the same relative spot in the whole diagram
    var mag = $('.g-mag', magThumb);
    mag.style.backgroundSize = W + 'px ' + H + 'px';
    mag.style.backgroundPosition = (cx - cx / r.width * W) + 'px ' + (cy - cy / r.height * H) + 'px';
  }
  function endMag() {
    clearTimeout(magTimer);
    if (magThumb) magThumb.classList.remove('is-mag');
    magThumb = null;
  }
  grid.addEventListener('mousemove', function (e) {
    if (!finePointer.matches) return;
    var t = e.target.closest('.g-thumb');
    if (t !== magThumb) {
      endMag();
      if (!t) return;
      magThumb = t;
      var img = t.getAttribute('data-open'), mag = $('.g-mag', t);
      if (!mag.style.backgroundImage) mag.style.backgroundImage = 'url(' + (hdCache[img] === true ? hdUrl(img) : 'assets/gallery/' + img + '.webp') + ')';
      t.classList.add('is-mag');
      // Swap in the full-resolution copy if the pointer stays a moment
      magTimer = setTimeout(function () {
        preloadHd(img, function () { mag.style.backgroundImage = 'url(' + hdUrl(img) + ')'; });
      }, 250);
    }
    magEvent = e;
    if (!magFrame) magFrame = requestAnimationFrame(placeMag);
  });
  grid.addEventListener('mouseleave', endMag);

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

  /* ---------- Zoomable diagram viewer ---------- */
  var view = $('#lb-view'), lbImg = $('#lb-img'), lbHd = $('#lb-hd');
  var zoomPct = $('.zoom-pct', view), zoomIn = $('[data-zoom="in"]', view), zoomOut = $('[data-zoom="out"]', view);
  var MAX_ZOOM = 4;
  // s = 1 fits the diagram to the viewer's width; x, y are the image's offset in the viewer
  var zv = { g: null, s: 1, x: 0, y: 0, vw: 0, vh: 0, ih: 0 };
  function minZoom() { return Math.min(1, zv.vh / zv.ih); }
  function clampPan() {
    var cw = zv.vw * zv.s, ch = zv.ih * zv.s;
    zv.x = cw <= zv.vw ? (zv.vw - cw) / 2 : clamp(zv.x, zv.vw - cw, 0);
    zv.y = ch <= zv.vh ? (zv.vh - ch) / 2 : clamp(zv.y, zv.vh - ch, 0);
  }
  function applyZoom(animate) {
    clampPan();
    view.classList.toggle('is-animating', !!animate);
    view.classList.toggle('is-zoomed', zv.s > 1.01);
    lbImg.style.transform = 'translate(' + zv.x + 'px,' + zv.y + 'px) scale(' + zv.s + ')';
    zoomPct.textContent = Math.round(zv.s * 100) + '%';
    zoomIn.disabled = zv.s >= MAX_ZOOM - 0.001;
    zoomOut.disabled = zv.s <= minZoom() + 0.001;
  }
  function zoomAt(s, px, py, animate) {
    s = clamp(s, minZoom(), MAX_ZOOM);
    zv.x = px - (px - zv.x) * s / zv.s;
    zv.y = py - (py - zv.y) * s / zv.s;
    zv.s = s;
    applyZoom(animate);
  }
  function measureView() {
    var oldVw = zv.vw;
    // client sizes ignore the modal's opening scale transform
    zv.vw = view.clientWidth; zv.vh = view.clientHeight;
    zv.ih = zv.vw * zv.g.h / zv.g.w;
    lbImg.style.width = zv.vw + 'px';
    lbImg.style.height = zv.ih + 'px';
    if (oldVw) { zv.x *= zv.vw / oldVw; zv.y *= zv.vw / oldVw; }
  }
  function resetZoom(animate) { zv.s = 1; zv.x = 0; zv.y = 0; applyZoom(animate); }
  function zoomStep(dir) { zoomAt(zv.s * (dir > 0 ? 1.5 : 1 / 1.5), zv.vw / 2, zv.vh / 2, true); }

  $('.zoom-bar', view).addEventListener('click', function (e) {
    var b = e.target.closest('[data-zoom]'); if (!b) return;
    var k = b.getAttribute('data-zoom');
    if (k === 'in') zoomStep(1);
    else if (k === 'out') zoomStep(-1);
    else if (k === 'reset') resetZoom(true);
    else { zv.s = minZoom(); applyZoom(true); }
  });
  $('.zoom-bar', view).addEventListener('pointerdown', function (e) { e.stopPropagation(); });
  $('.zoom-bar', view).addEventListener('dblclick', function (e) { e.stopPropagation(); });

  // Scroll pans; pinch on a trackpad or Ctrl/⌘ + scroll zooms toward the pointer
  view.addEventListener('wheel', function (e) {
    e.preventDefault();
    var r = view.getBoundingClientRect(), k = e.deltaMode === 1 ? 16 : 1;
    if (e.ctrlKey || e.metaKey) {
      zoomAt(zv.s * Math.exp(-clamp(e.deltaY * k, -50, 50) * 0.01), e.clientX - r.left, e.clientY - r.top);
    } else {
      zv.x -= (e.shiftKey && !e.deltaX ? e.deltaY : e.deltaX) * k;
      if (!e.shiftKey) zv.y -= e.deltaY * k;
      applyZoom();
    }
  }, { passive: false });

  view.addEventListener('dblclick', function (e) {
    var r = view.getBoundingClientRect();
    zoomAt(zv.s >= MAX_ZOOM - 0.01 ? 1 : zv.s * 2, e.clientX - r.left, e.clientY - r.top, true);
  });

  // Drag to pan, two fingers to pinch
  var pointers = {}, pinch = null;
  function pinchState() {
    var p = Object.keys(pointers).map(function (id) { return pointers[id]; });
    var r = view.getBoundingClientRect();
    return { d: Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y), mx: (p[0].x + p[1].x) / 2 - r.left, my: (p[0].y + p[1].y) / 2 - r.top };
  }
  view.addEventListener('pointerdown', function (e) {
    if (e.button !== 0) return;
    view.setPointerCapture(e.pointerId);
    pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
    view.classList.add('is-dragging');
    if (Object.keys(pointers).length === 2) pinch = pinchState();
  });
  view.addEventListener('pointermove', function (e) {
    var p = pointers[e.pointerId]; if (!p) return;
    var dx = e.clientX - p.x, dy = e.clientY - p.y;
    p.x = e.clientX; p.y = e.clientY;
    if (pinch) {
      var n = pinchState();
      zv.x += n.mx - pinch.mx; zv.y += n.my - pinch.my;
      zoomAt(zv.s * n.d / pinch.d, n.mx, n.my);
      pinch = n;
    } else {
      zv.x += dx; zv.y += dy;
      applyZoom();
    }
  });
  function endPointer(e) {
    delete pointers[e.pointerId];
    if (Object.keys(pointers).length < 2) pinch = null;
    if (!Object.keys(pointers).length) view.classList.remove('is-dragging');
  }
  view.addEventListener('pointerup', endPointer);
  view.addEventListener('pointercancel', endPointer);

  document.addEventListener('keydown', function (e) {
    if (!zv.g || !$('#lightbox').classList.contains('is-open') || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === '+' || e.key === '=') zoomStep(1);
    else if (e.key === '-' || e.key === '_') zoomStep(-1);
    else if (e.key === '0') resetZoom(true);
    else return;
    e.preventDefault();
  });
  window.addEventListener('resize', function () {
    if (!zv.g || $('#lightbox').hidden) return;
    measureView(); applyZoom();
  });

  function openLightbox(g) {
    if (!g) return;
    var m = $('#lightbox');
    zv.g = g; zv.vw = 0;
    lbImg.src = hdCache[g.img] === true ? hdUrl(g.img) : 'assets/gallery/' + g.img + '.webp';
    lbHd.hidden = hdCache[g.img] === true;
    preloadHd(g.img, function () {
      if (zv.g !== g) return;
      lbImg.src = hdUrl(g.img);
      lbHd.hidden = true;
    });
    $('#lb-img').alt = g.title + ' architecture diagram';
    $('#lb-title').textContent = g.title;
    $('#lb-prompt').textContent = g.prompt;
    $('#lb-cmd').textContent = 'terravision draw --source ' + g.source + '.tvg.json --annotate ' + g.source + '.annotations.yml --format drawio';
    $('#lb-links').innerHTML =
      '<a href="' + RAW + g.source + '.png" target="_blank" rel="noopener">PNG</a>' +
      '<a href="' + RAW + g.source + '.svg" target="_blank" rel="noopener">SVG</a>' +
      '<a href="' + RAW + g.source + '.tvg.json" target="_blank" rel="noopener">Source graph</a>' +
      '<a href="' + RAW + g.source + '.annotations.yml" target="_blank" rel="noopener">Annotations</a>' +
      '<a href="' + DOCS_GALLERY + '#' + g.id + '" target="_blank" rel="noopener">In the docs ↗</a>';
    m.hidden = false;
    measureView();
    resetZoom();
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

  /* ---------- Closing prompt types itself, alternating review and design ---------- */
  // Each run of prompts belongs to a mode; the headline word and the tag switch with it
  var CTA_SETS = [
    { mode: 'review', prompts: [
      'Draw the architecture of the Terraform in ./infra',
      'Show me the architecture of github.com/patrickchugh/testcase-bastion',
      'Draw prod from ./infra with prod.tfvars for our security review'
    ] },
    { mode: 'design', prompts: [
      'Draw an Azure hub-and-spoke landing zone',
      'Draw a GKE cluster with Private Service Connect',
      'Write the Terraform for this architecture'
    ] }
  ];
  var CTA_PROMPTS = [];
  // Alternate review and design prompts: review, design, review, design…
  for (var k = 0; k < CTA_SETS[0].prompts.length; k++) {
    CTA_SETS.forEach(function (set) { CTA_PROMPTS.push({ mode: set.mode, text: set.prompts[k] }); });
  }
  var ctaEl = $('#cta-typed'), ctaH = $('#cta-h'), ctaTag = $('#cta-tag');
  function setCtaMode(mode) {
    if (ctaH.getAttribute('data-mode') === mode) return;
    ctaH.setAttribute('data-mode', mode);
    $('.w-review', ctaH).setAttribute('aria-hidden', String(mode !== 'review'));
    $('.w-design', ctaH).setAttribute('aria-hidden', String(mode !== 'design'));
    ctaTag.textContent = mode;
    ctaTag.classList.toggle('is-design', mode === 'design');
  }
  if (!reduceMotion) {
    var ci = 0, cj = CTA_PROMPTS[0].text.length, deleting = true, ctaVisible = false, held = false;
    new IntersectionObserver(function (en) { ctaVisible = en[0].isIntersecting; }).observe(ctaEl);
    (function tick() {
      var delay = deleting ? 18 : 42;
      // the first prompt is already on screen: hold it before erasing, so it gets read
      if (ctaVisible && !held) { held = true; ctaEl.scrollLeft = ctaEl.scrollWidth; setTimeout(tick, 3200); return; }
      if (ctaVisible) {
        if (deleting) {
          cj--;
          if (cj <= 0) {
            deleting = false; ci = (ci + 1) % CTA_PROMPTS.length; delay = 300;
            setCtaMode(CTA_PROMPTS[ci].mode);
            delay = 900; // let the word swap land first
          }
        } else { cj++; if (cj >= CTA_PROMPTS[ci].text.length) { deleting = true; delay = 2200; } }
        ctaEl.textContent = CTA_PROMPTS[ci].text.slice(0, Math.max(0, cj));
        ctaEl.scrollLeft = ctaEl.scrollWidth; // long prompts (URLs) keep the typing end in view
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
