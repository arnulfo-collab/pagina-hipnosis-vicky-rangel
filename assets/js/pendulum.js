document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || typeof THREE === 'undefined') return;

  const container = document.getElementById('hero-canvas-container');
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.z = 15;
  camera.position.y = -2;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Gold particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 150;
  const posArray = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 30;
  }
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    color: 0xe0c186,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
  });
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    particlesMesh.rotation.y = t * 0.05;
    particlesMesh.position.y = Math.sin(t * 0.5) * 0.5;
    camera.position.x += 0.05 * (mouseX * 2 - camera.position.x);
    camera.position.y += 0.05 * (mouseY * 2 - 2 - camera.position.y);
    camera.lookAt(0, -2, 0);
    renderer.render(scene, camera);
  }
  animate();

  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    heroBg.style.transition = 'opacity 2s ease';
    heroBg.style.opacity = '0';
  }

  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
});
