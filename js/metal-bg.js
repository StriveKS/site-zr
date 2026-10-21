// metal-bg.js — novo fundo do site ZR: fitas de metal líquido em estúdio.
// Porte fiel do componente "ShaderMetal" (Back.md, 21st.dev) para JS puro.
// Canvas transparente sobre o corpo; tema claro fixo (site é ivory). Pausa
// fora da tela/aba, respeita prefers-reduced-motion com um frame parado,
// e recupera de contexto WebGL perdido. A luz-chave segue o ponteiro.
window.ZR = window.ZR || {};

ZR.metal = (function () {

  const VERT = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

  const FRAG = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_count;
uniform float u_iridescence;
uniform float u_pull;
uniform float u_dark;
uniform vec2 u_mouse;
uniform vec2 u_light;
uniform vec3 u_f0;

const float TAU = 6.28318530718;
const float TILT = -0.32;

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float lines(float x, float seed) {
  float i = floor(x);
  float f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(hash(vec2(i, seed)), hash(vec2(i + 1.0, seed)), f);
}

vec2 rotate(vec2 p, float a) {
  float c = cos(a);
  float s = sin(a);
  return vec2(c * p.x - s * p.y, s * p.x + c * p.y);
}

float spine(float x, float k, float lane, float t, vec2 m) {
  float y = lane;
  y += 0.13 * sin(1.15 * x + 0.55 * t + 2.1 * k);
  y += 0.06 * sin(2.6 * x - 0.8 * t + 1.3 * k + 0.7);
  y += 0.025 * sin(5.3 * x + 1.3 * t + 4.0 * k);
  float near = exp(-(x - m.x) * (x - m.x) * 5.0);
  y += (m.y - y) * 0.22 * u_pull * near;
  return y;
}

vec3 studio(vec3 r, float t) {
  float a = 0.28 * sin(t * 0.11);
  r.xz = rotate(r.xz, a);
  float y = r.y;

  vec3 top = mix(vec3(0.82, 0.83, 0.86), vec3(0.025, 0.025, 0.028), u_dark);
  vec3 horizon = mix(vec3(1.0), vec3(0.16, 0.16, 0.17), u_dark);
  vec3 ground = mix(vec3(0.05, 0.05, 0.055), vec3(0.004), u_dark);
  vec3 sky = mix(horizon, top, smoothstep(0.0, 0.85, y));
  vec3 floor_ = mix(ground * 2.4, ground, smoothstep(0.0, -0.5, y));
  vec3 c = mix(floor_, sky, smoothstep(-0.025, 0.025, y));

  float box = smoothstep(0.6, 0.45, abs(r.x)) * smoothstep(0.42, 0.55, y) *
              smoothstep(1.0, 0.85, y);
  c += box * mix(1.6, 2.2, u_dark);

  float stripL = smoothstep(0.1, 0.03, abs(r.x + 0.78)) * smoothstep(-0.35, -0.1, y) * smoothstep(0.8, 0.5, y);
  float stripR = smoothstep(0.08, 0.02, abs(r.x - 0.72)) * smoothstep(-0.3, -0.05, y) * smoothstep(0.75, 0.45, y);
  c += stripL * vec3(1.25, 1.1, 0.95) * mix(1.0, 1.5, u_dark);
  c += stripR * vec3(0.9, 1.05, 1.3) * mix(0.8, 1.3, u_dark);

  float card = smoothstep(0.7, 0.2, abs(r.x)) * smoothstep(-0.95, -0.7, y) * smoothstep(-0.4, -0.65, y);
  c += card * mix(0.35, 0.18, u_dark);
  return c;
}

vec3 tonemap(vec3 x) {
  x = max(x, 0.0);
  return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
}

vec3 linearToSrgb(vec3 c) {
  c = clamp(c, 0.0, 1.0);
  vec3 lo = c * 12.92;
  vec3 hi = 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055;
  return mix(lo, hi, step(vec3(0.0031308), c));
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  float px = 1.0 / u_resolution.y;
  vec2 p = rotate((frag - 0.5 * u_resolution) * px, TILT);
  vec2 m = rotate((u_mouse - 0.5) * u_resolution * px, TILT);
  float t = u_time;

  vec3 L = normalize(vec3(u_light, 0.85));
  float count = u_count;
  float spread = mix(0.0, 0.3, clamp((count - 1.0) / 4.0, 0.0, 1.0)) + 0.08 * step(1.5, count);
  float baseWidth = mix(0.13, 0.075, clamp((count - 1.0) / 4.0, 0.0, 1.0));

  vec3 col = vec3(0.0);
  float alpha = 0.0;

  for (int i = 0; i < 5; i++) {
    float k = float(i);
    if (k >= count) break;
    float f = count > 1.0 ? k / (count - 1.0) : 0.5;
    float lane = (f - 0.5) * spread;
    float tk = t * mix(0.82, 1.0, f);

    float x = p.x;
    float e = 0.004;
    float c = spine(x, k, lane, tk, m);
    float slope = (spine(x + e, k, lane, tk, m) - spine(x - e, k, lane, tk, m)) / (2.0 * e);
    float stretch = inversesqrt(1.0 + slope * slope);
    float d = (p.y - c) * stretch;

    float theta = 1.5 * x + 0.45 * tk + 1.7 * k + 0.55 * sin(0.7 * x - 0.3 * tk + k);
    float ct = cos(theta);
    float st = sin(theta);
    float hw = baseWidth * (0.82 + 0.22 * sin(0.9 * x + 0.35 * tk + 2.3 * k));
    float proj = hw * max(abs(ct), 0.035);

    float sd = d + 0.045;
    float shadowW = proj + 0.05;
    float shadow = (1.0 - smoothstep(0.35, 1.0, abs(sd) / shadowW)) * mix(0.2, 0.32, u_dark);
    col *= 1.0 - shadow;
    alpha = alpha + shadow * (1.0 - alpha);

    float v = d / (ct >= 0.0 ? proj : -proj);
    float aa = 1.2 * px / proj;
    float cover = 1.0 - smoothstep(1.0 - aa, 1.0 + aa, abs(v));
    if (cover <= 0.0) continue;

    vec3 T = normalize(vec3(1.0, slope, 0.0));
    vec3 N2 = normalize(vec3(-slope, 1.0, 0.0));
    vec3 B = ct * N2 + st * vec3(0.0, 0.0, 1.0);
    vec3 n = -st * N2 + ct * vec3(0.0, 0.0, 1.0);

    float roll = v * 0.45 + v * v * v * 0.5;
    float ripple = sin(x * 13.0 - tk * 2.2 + k * 3.1) * 0.06 + sin(x * 31.0 + tk * 1.3 + k) * 0.015;
    float grain = lines(v * 34.0 + k * 17.0, k) - 0.5;
    n = normalize(n + B * (roll + grain * 0.015) + T * ripple);
    float edge = smoothstep(0.14, 0.03, abs(ct));
    vec3 rim = B * (st >= 0.0 ? 1.0 : -1.0) + vec3(0.0, 0.2, 0.0);
    n = normalize(mix(n, normalize(rim), edge));
    float back = step(n.z, 0.0);
    n *= 1.0 - 2.0 * back;

    vec3 r = reflect(vec3(0.0, 0.0, -1.0), n);
    vec3 env = studio(r, t);

    float facing = clamp(n.z, 0.0, 1.0);
    vec3 F = u_f0 + (1.0 - u_f0) * pow(1.0 - facing, 5.0);

    float film = 0.5 + 0.5 * sin(x * 1.6 + v * 0.9 + tk * 0.35 + k * 1.9);
    vec3 rainbow = 0.5 + 0.5 * cos(TAU * (film * 1.6 + facing * 1.1 + vec3(0.0, 0.33, 0.67)));
    rainbow = 0.2 + 0.8 * rainbow;
    rainbow /= max(dot(rainbow, vec3(0.2126, 0.7152, 0.0722)), 0.2);
    float sheen = u_iridescence * (0.45 + 0.55 * (1.0 - facing));
    F *= mix(vec3(1.0), rainbow, sheen);

    float rl = max(dot(r, L), 0.0);
    float spec = pow(rl, 90.0) * 5.0 + pow(rl, 14.0) * 0.55;

    vec3 lit = env * F + spec * F;
    lit *= mix(1.0, 0.72, back) * (0.94 + grain * 0.12);
    lit *= mix(0.86, 1.0, f);
    vec3 rgb = linearToSrgb(tonemap(lit * 1.05));

    col = col * (1.0 - cover) + rgb * cover;
    alpha = alpha * (1.0 - cover) + cover;
  }

  float dither = (hash(frag + fract(t) * 91.0) - 0.5) / 255.0;
  col += dither * alpha;
  alpha = clamp(alpha + dither * step(0.0005, alpha) * 1.5, 0.0, 1.0);
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), alpha);
}
`;

  function clampNum(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function numberOr(value, fallback, min, max) {
    if (typeof value !== 'number' || !Number.isFinite(value)) return fallback;
    return clampNum(value, min, max);
  }

  // Hex → RGB linear, para a refletância base do metal
  function hexToLinear(hex) {
    const h = hex.replace('#', '').trim();
    const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h.padEnd(6, '0').slice(0, 6);
    const n = Number.parseInt(full, 16);
    const srgb = Number.isNaN(n) ? [0.8, 0.8, 0.8] : [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
    return srgb.map(c => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  }

  function compileShader(gl, type, source) {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn('metal-bg: shader falhou:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  const MAX_PIXELS = 2400000;
  const REST_LIGHT = { x: -0.45, y: 0.55 };

  function create(canvas, initial) {
    const options = Object.assign(
      { color: '#DDBB63', ribbons: 3, speed: 0.22, iridescence: 0.18, interactive: true },
      initial || {}
    );

    const mouse = { x: 0.5, y: 0.5 };
    const target = { x: 0.5, y: 0.5 };
    const light = { ...REST_LIGHT };
    const lightTarget = { ...REST_LIGHT };
    let pull = 0;
    let pullTarget = 0;
    let darkMix = 0; // site ZR é claro: 0 sempre

    const gl = canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance'
    });
    if (!gl) return null;

    let vs = null, fs = null, program = null, buf = null;
    let uResolution, uTime, uCount, uIridescence, uPull, uDark, uMouse, uLight, uF0;

    const initGl = () => {
      vs = compileShader(gl, gl.VERTEX_SHADER, VERT);
      fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG);
      if (!vs || !fs) return false;

      program = gl.createProgram();
      if (!program) return false;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.warn('metal-bg: link falhou:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        program = null;
        return false;
      }
      gl.useProgram(program);

      buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

      const u = (name) => gl.getUniformLocation(program, name);
      uResolution = u('u_resolution');
      uTime = u('u_time');
      uCount = u('u_count');
      uIridescence = u('u_iridescence');
      uPull = u('u_pull');
      uDark = u('u_dark');
      uMouse = u('u_mouse');
      uLight = u('u_light');
      uF0 = u('u_f0');
      return true;
    };
    if (!initGl()) return null;

    // o canvas é position:fixed;inset:0 — clientWidth/Height = viewport
    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w <= 0 || h <= 0) return false;
      const ratio = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(MAX_PIXELS / (w * h)));
      const width = Math.max(1, Math.floor(w * ratio));
      const height = Math.max(1, Math.floor(h * ratio));
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      wake();
      if (width === canvas.width && height === canvas.height) return false;
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, canvas.width, canvas.height);
      return true;
    };

    let f0Key = '';
    const syncMetal = () => {
      const hex = options.color || '#DDBB63';
      if (hex === f0Key) return;
      f0Key = hex;
      gl.uniform3fv(uF0, hexToLinear(hex));
    };

    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let onScreen = true;
    let raf = 0;
    let destroyed = false;
    let lost = false;
    let last = 0;
    let clock = 0;

    const visible = () => onScreen && document.visibilityState !== 'hidden';

    function wake() {
      if (raf || destroyed || lost) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    }

    const settling = () =>
      Math.abs(target.x - mouse.x) > 1e-3 ||
      Math.abs(target.y - mouse.y) > 1e-3 ||
      Math.abs(lightTarget.x - light.x) > 1e-3 ||
      Math.abs(lightTarget.y - light.y) > 1e-3 ||
      Math.abs(pullTarget - pull) > 1e-3 ||
      Math.abs(0 - darkMix) > 1e-3;

    const tick = (now) => {
      raf = 0;
      if (lost) return;
      const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
      last = now;
      if (!visible()) return;
      const flowing = !mqReduce.matches;
      if (flowing) clock += dt;

      const ease = (rate) => 1 - Math.exp(-dt * rate);
      mouse.x += (target.x - mouse.x) * ease(3);
      mouse.y += (target.y - mouse.y) * ease(3);
      light.x += (lightTarget.x - light.x) * ease(5);
      light.y += (lightTarget.y - light.y) * ease(5);
      pull += (pullTarget - pull) * ease(2.5);
      darkMix += (0 - darkMix) * ease(6);

      syncMetal();
      const speed = numberOr(options.speed, 0.22, 0, 4);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, clock * speed * 3 + 11);
      gl.uniform1f(uCount, Math.round(numberOr(options.ribbons, 3, 1, 5)));
      gl.uniform1f(uIridescence, numberOr(options.iridescence, 0.18, 0, 1));
      gl.uniform1f(uPull, options.interactive === false ? 0 : pull);
      gl.uniform1f(uDark, darkMix);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform2f(uLight, light.x, light.y);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (flowing || settling()) raf = requestAnimationFrame(tick);
    };

    const redraw = () => {
      if (destroyed || lost) return;
      cancelAnimationFrame(raf);
      raf = 0;
      last = performance.now();
      tick(last);
    };

    const ro = new ResizeObserver(() => { if (resize()) redraw(); });
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    const io = new IntersectionObserver((entries) => {
      onScreen = entries[0] ? entries[0].isIntersecting : true;
      wake();
    });
    io.observe(canvas);
    const onVisibility = () => wake();
    document.addEventListener('visibilitychange', onVisibility);
    const onReduce = () => wake();
    mqReduce.addEventListener('change', onReduce);

    const onMove = (e) => {
      if (options.interactive === false) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      const inside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
      pullTarget = inside ? 1 : 0;
      if (inside) {
        target.x = x;
        target.y = y;
        lightTarget.x = (x * 2 - 1) * 0.9;
        lightTarget.y = (y * 2 - 1) * 0.9;
      } else {
        lightTarget.x = REST_LIGHT.x;
        lightTarget.y = REST_LIGHT.y;
      }
      wake();
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    const onLost = (e) => {
      e.preventDefault();
      lost = true;
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const onRestored = () => {
      if (destroyed || !initGl()) return;
      lost = false;
      f0Key = '';
      gl.viewport(0, 0, canvas.width, canvas.height);
      wake();
    };
    canvas.addEventListener('webglcontextlost', onLost);
    canvas.addEventListener('webglcontextrestored', onRestored);

    resize();
    wake();

    return {
      setOptions(next) {
        Object.assign(options, next || {});
        if (options.interactive === false) {
          pullTarget = 0;
          lightTarget.x = REST_LIGHT.x;
          lightTarget.y = REST_LIGHT.y;
        }
        wake();
      },
      destroy() {
        destroyed = true;
        cancelAnimationFrame(raf);
        raf = 0;
        ro.disconnect();
        io.disconnect();
        document.removeEventListener('visibilitychange', onVisibility);
        mqReduce.removeEventListener('change', onReduce);
        window.removeEventListener('pointermove', onMove);
        canvas.removeEventListener('webglcontextlost', onLost);
        canvas.removeEventListener('webglcontextrestored', onRestored);
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteBuffer(buf);
        const lose = gl.getExtension('WEBGL_lose_context');
        queueMicrotask(() => {
          if (!canvas.isConnected && !gl.isContextLost()) lose?.loseContext();
        });
      }
    };
  }

  function init() {
    const canvas = document.getElementById('metal');
    if (!canvas) return null;
    const lowPower =
      (navigator.hardwareConcurrency || 8) <= 4 ||
      (navigator.deviceMemory || 8) <= 4 ||
      window.matchMedia('(pointer: coarse)').matches;
    const instance = create(canvas, {
      color: '#DDBB63',
      ribbons: lowPower ? 2 : 3,
      speed: 0.22,
      iridescence: 0.18,
      interactive: true
    });
    return instance;
  }

  return { init };
})();
