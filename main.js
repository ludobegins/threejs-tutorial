import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

function animate() {
  requestAnimationFrame( animate )

  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01

  controls.update()

  renderer.render( scene, camera )
}

function addStar() {

  const star = new THREE.Mesh( starGeometry, starMaterial )

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ))

  star.position.set(x, y, z)
  scene.add(star)

}

function moveCamera() {

  const t = document.body.getBoundingClientRect().top
  moon.rotation.x += 0.05
  moon.rotation.y += 0.007
  moon.rotation.z += 0.05

  ludo.rotation.y += 0.01
  ludo.rotation.z += 0.01

  camera.position.z = t * -0.02
  // camera.position.x = t * -0.0002
  // camera.position.y = t * -0.0002

  moon2.rotation.z += 0.1

}

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)


const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial( {color: 0xFF6347} )
const torus = new THREE.Mesh( geometry, material )

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper)


const controls = new OrbitControls(camera, renderer.domElement)

// Stars

const starGeometry = new THREE.SphereGeometry(0.25, 24, 24)
const starMaterial = new THREE.MeshStandardMaterial({color: 0xffffff})
Array(200).fill().forEach(addStar)

// TextureLoader

const textureLoader = new THREE.TextureLoader()

// Space background

const spaceTexture = textureLoader.load('space.jpg')
scene.background = spaceTexture

// Ludo

const ludoTexture = textureLoader.load('ludo.png')

const ludo = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial( { map: ludoTexture } )
)

ludo.position.set(10, 10, 0)

scene.add(ludo)

// Moon

const moonTexture = textureLoader.load('moon.jpg')
const normalTexture = textureLoader.load('normal.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
)

scene.add(moon)

const moon2 = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
)

moon2.position.set(10, 0, 20)
scene.add(moon2)

document.body.onscroll = moveCamera

animate()

