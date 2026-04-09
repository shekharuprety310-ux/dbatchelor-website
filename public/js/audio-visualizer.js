/* ============================================
   AUDIO VISUALIZER BACKGROUND
   Animated canvas waveform
   ============================================ */

(function () {
  const canvas = document.getElementById('audioCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, animId;
  let time = 0;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  // Colors matching the theme
  const colors = {
    primary: 'rgba(10, 125, 232, ',
    accent: 'rgba(0, 212, 255, ',
    dark: 'rgba(26, 42, 74, ',
  };

  function drawWave(yOffset, amplitude, frequency, speed, color, lineWidth) {
    ctx.beginPath();
    ctx.lineWidth = lineWidth;

    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, color + '0)');
    gradient.addColorStop(0.3, color + '0.6)');
    gradient.addColorStop(0.7, color + '0.6)');
    gradient.addColorStop(1, color + '0)');
    ctx.strokeStyle = gradient;

    for (let x = 0; x <= width; x += 3) {
      const y =
        yOffset +
        Math.sin((x / width) * frequency * Math.PI * 2 + time * speed) * amplitude +
        Math.sin((x / width) * frequency * 0.5 * Math.PI * 2 + time * speed * 1.3) * (amplitude * 0.4);

      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  function drawCircularWave(cx, cy, radius, amplitude, frequency, color) {
    ctx.beginPath();
    const gradient = ctx.createRadialGradient(cx, cy, radius - amplitude, cx, cy, radius + amplitude);
    gradient.addColorStop(0, color + '0)');
    gradient.addColorStop(0.5, color + '0.15)');
    gradient.addColorStop(1, color + '0)');
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1.5;

    for (let angle = 0; angle <= Math.PI * 2; angle += 0.02) {
      const r =
        radius +
        Math.sin(angle * frequency + time * 0.5) * amplitude +
        Math.cos(angle * frequency * 0.7 + time * 0.3) * (amplitude * 0.5);
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      if (angle === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  }

  function drawBars() {
    const barCount = 60;
    const barWidth = width / barCount;

    for (let i = 0; i < barCount; i++) {
      const x = i * barWidth;
      const barH =
        (Math.sin(i * 0.3 + time * 0.8) * 0.5 + 0.5) * 60 +
        (Math.sin(i * 0.15 + time * 0.5) * 0.5 + 0.5) * 30;

      const alpha = 0.06 + (barH / 90) * 0.08;
      ctx.fillStyle = `rgba(10, 125, 232, ${alpha})`;
      ctx.fillRect(x, height - barH, barWidth - 1, barH);
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Dark gradient base
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, 'rgba(8, 14, 26, 1)');
    bgGrad.addColorStop(1, 'rgba(13, 22, 40, 1)');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Bottom equalizer bars
    drawBars();

    // Multiple waveform layers
    drawWave(height * 0.55, 35, 3, 0.4, colors.primary, 1.5);
    drawWave(height * 0.6, 25, 5, 0.6, colors.accent, 1);
    drawWave(height * 0.5, 45, 2, 0.3, colors.dark, 2);
    drawWave(height * 0.65, 20, 7, 0.8, colors.primary, 0.8);
    drawWave(height * 0.45, 30, 4, 0.5, colors.accent, 1.2);

    // Circular wave at center (subtle)
    drawCircularWave(width * 0.75, height * 0.3, 120, 12, 6, colors.primary);
    drawCircularWave(width * 0.25, height * 0.7, 80, 8, 8, colors.accent);

    // Radial glow spots
    [
      { x: width * 0.1, y: height * 0.2, r: 200, c: colors.primary + '0.04)' },
      { x: width * 0.9, y: height * 0.8, r: 250, c: colors.accent + '0.03)' },
    ].forEach(({ x, y, r, c }) => {
      const radGrad = ctx.createRadialGradient(x, y, 0, x, y, r);
      radGrad.addColorStop(0, c);
      radGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, width, height);
    });

    time += 0.012;
    animId = requestAnimationFrame(animate);
  }

  animate();
})();
