document.addEventListener('DOMContentLoaded', () => {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || typeof THREE === 'undefined') {
    return; // Fallback to CSS background
  }

  const container = document.getElementById('hero-canvas-container');
  if (!container) return;

  // Scene setup
  const scene = new THREE.Scene();
  
  // Camera setup
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.z = 15;
  camera.position.y = -2;

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xc9a765, 1.2);
  directionalLight.position.set(5, 10, 7);
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xe0c186, 2, 20);
  pointLight.position.set(-2, -5, 5);
  scene.add(pointLight);

  // Pendulum Group
  const pendulum = new THREE.Group();
  scene.add(pendulum);

  // Materials
  const goldMaterial = new THREE.MeshStandardMaterial({
    color: 0xc9a765,
    metalness: 0.8,
    roughness: 0.2,
    envMapIntensity: 1.0,
  });

  const stringMaterial = new THREE.MeshStandardMaterial({
    color: 0xa8843f,
    metalness: 0.6,
    roughness: 0.4,
  });

  // String / Chain
  const stringLength = 10;
  const stringGeometry = new THREE.CylinderGeometry(0.02, 0.02, stringLength, 8);
  const string = new THREE.Mesh(stringGeometry, stringMaterial);
  string.position.y = -stringLength / 2;
  pendulum.add(string);

  // Pendulum Bob (Crystal / Sphere)
  const bobGeometry = new THREE.OctahedronGeometry(0.8, 2);
  const bob = new THREE.Mesh(bobGeometry, goldMaterial);
  bob.position.y = -stringLength;
  pendulum.add(bob);

  // Adjust pendulum pivot to top
  pendulum.position.y = 8;

  // Particles (Reiki Energy)
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 150;
  const posArray = new Float32Array(particlesCount * 3);
  
  for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 30;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    color: 0xe0c186,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });
  
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  // Mouse interaction
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  // Animation Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Pendulum swing
    // Use sine wave for realistic swing
    const swingAngle = Math.sin(elapsedTime * 1.5) * 0.3;
    pendulum.rotation.z = swingAngle;

    // Mouse interaction - subtle tilt
    targetX = mouseX * 0.1;
    targetY = mouseY * 0.1;
    
    pendulum.rotation.x += 0.05 * (targetY - pendulum.rotation.x);
    camera.position.x += 0.05 * (mouseX * 2 - camera.position.x);
    camera.position.y += 0.05 * (mouseY * 2 - 2 - camera.position.y);
    camera.lookAt(0, -2, 0);

    // Particles animation
    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.position.y = Math.sin(elapsedTime * 0.5) * 0.5;

    // Make bob pulse slightly
    const scale = 1 + Math.sin(elapsedTime * 3) * 0.02;
    bob.scale.set(scale, scale, scale);

    renderer.render(scene, camera);
  }

  animate();

  // Hide the CSS background image on the hero gradually since 3D is active
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    heroBg.style.transition = 'opacity 2s ease';
    heroBg.style.opacity = '0';
  }

  // Handle Resize
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
});
