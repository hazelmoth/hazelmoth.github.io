(function () {
  const srcs = ['images/pixel_spark_med.png', 'images/pixel_spark_small.png'];
  const lightFilters = ['url(#sparkle-mauve)', 'url(#sparkle-blush)'];
  const allFilters   = ['url(#sparkle-coral)', 'url(#sparkle-mauve)', 'url(#sparkle-blush)'];
  const scales = [2, 3, 4, 5];

  // Percentage of viewport width that falls outside the 1280px content area
  const marginPct = Math.max(0, (window.innerWidth - 1280) / window.innerWidth * 100 / 2);

  // Fixed full-screen layer, sits above the background but below interactive content
  const layer = document.createElement('div');
  layer.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:-1;overflow:hidden';
  document.body.insertBefore(layer, document.body.firstChild);

  // Grid-jitter: divide viewport into cols×rows cells, place one sparkle per cell
  const cols = 4, rows = 5;
  const cellW = 100 / cols;
  const cellH = 100 / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const left = (c * cellW + Math.random() * cellW * 0.85).toFixed(1);
      const top  = (r * cellH + Math.random() * cellH * 0.85).toFixed(1);

      const el = document.createElement('img');
      el.src = srcs[Math.floor(Math.random() * srcs.length)];
      el.alt = '';
      el.setAttribute('aria-hidden', 'true');

      const opacity = (0.3 + Math.random() * 0.45).toFixed(2);
      const inMargin = parseFloat(left) < marginPct || parseFloat(left) > (100 - marginPct);
      const palette  = inMargin ? allFilters : lightFilters;
      const filter   = palette[Math.floor(Math.random() * palette.length)];

      el.style.cssText = [
        'position:absolute',
        'image-rendering:pixelated',
        'image-rendering:crisp-edges',
        `left:${left}%`,
        `top:${top}%`,
        `opacity:${opacity}`,
        `filter:${filter}`,
      ].join(';');

      el.onload = function () {
        const scale = scales[Math.floor(Math.random() * scales.length)];
        el.style.width  = (el.naturalWidth  * scale) + 'px';
        el.style.height = (el.naturalHeight * scale) + 'px';
      };

      layer.appendChild(el);
    }
  }
}());
