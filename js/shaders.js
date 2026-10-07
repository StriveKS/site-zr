// shaders.js — fundo vivo da nova versão em WebGL puro (sem dependências)
// FRAG_LINES: linhas douradas da tela de abertura (port do shader-lines, recolorido)
// FRAG_SILK:  seda clara em marfim/ouro que cobre o site inteiro (port do silk-background)
window.ZR = window.ZR || {};

ZR.shaders = (function () {

  function shader(canvas, frag, dpr, speed, off) {
    if (!canvas) return null;
    const g = canvas.getContext('webgl');
    if (!g) return null;

    const mk = (t, s) => { const o = g.createShader(t); g.shaderSource(o, s); g.compileShader(o); return o; };
    const p = g.createProgram();
    g.attachShader(p, mk(g.VERTEX_SHADER, 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'));
    g.attachShader(p, mk(g.FRAGMENT_SHADER, frag));
    g.linkProgram(p);
    g.useProgram(p);
    g.bindBuffer(g.ARRAY_BUFFER, g.createBuffer());
    g.bufferData(g.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), g.STATIC_DRAW);
    const l = g.getAttribLocation(p, 'p');
    g.enableVertexAttribArray(l);
    g.vertexAttribPointer(l, 2, g.FLOAT, false, 0, 0);
    const uT = g.getUniformLocation(p, 'time');
    const uR = g.getUniformLocation(p, 'resolution');

    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf, on = true;
    const t0 = performance.now();

    const size = () => {
      const d = Math.min(devicePixelRatio || 1, dpr);
      canvas.width = canvas.clientWidth * d;
      canvas.height = canvas.clientHeight * d;
      g.viewport(0, 0, canvas.width, canvas.height);
      g.uniform2f(uR, canvas.width, canvas.height);
      draw(performance.now());
    };
    const draw = n => { g.uniform1f(uT, off + (n - t0) / 1000 * speed); g.drawArrays(g.TRIANGLES, 0, 3); };
    const loop = n => { if (!on) return; draw(n); raf = requestAnimationFrame(loop); };
    addEventListener('resize', size);
    size();
    if (!still) loop(t0);

    return {
      stop() { on = false; cancelAnimationFrame(raf); removeEventListener('resize', size); }
    };
  }

  const FRAG_LINES = `precision highp float;uniform vec2 resolution;uniform float time;
float rnd(float x){return fract(sin(x)*1e4);}
float ring(float t,float o,vec2 uv){float s=0.;for(int i=0;i<5;i++){s+=.0008*float(i*i)/abs(fract(t-o+float(i)*.01)-length(uv));}return s;}
void main(){vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);
vec2 m=vec2(4.,2.),s=vec2(256.);uv=floor(uv*s/m)/(s/m);
float t=time*.06+rnd(uv.x)*.4;
vec3 c=clamp(vec3(ring(t,.02,uv),ring(t,.01,uv),ring(t,0.,uv)),0.,1.);
vec3 gold=vec3(.8,.64,.27);gl_FragColor=vec4(vec3(1.)-c*(vec3(1.)-gold),1.);}`;

  const FRAG_SILK = `precision highp float;uniform vec2 resolution;uniform float time;
void main(){vec2 u=gl_FragCoord.xy/resolution.xy*2.;float o=time*.7;
float y=u.y+.03*sin(8.*u.x-o);
float p=.6+.4*sin(5.*(u.x+y+cos(3.*u.x+5.*y)+.02*o)+sin(20.*(u.x+y-.1*o)));
float r=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453);
float k=1.-max(0.,p-r/15.*.8);
gl_FragColor=vec4(mix(vec3(1.),vec3(.86,.72,.42),k*.34),1.);}`;

  function init() {
    return {
      lines: shader(document.getElementById('shader'), FRAG_LINES, 1.5, 3, 1),
      silk: shader(document.getElementById('silk'), FRAG_SILK, 1, 1, 0)
    };
  }

  return { init };
})();
