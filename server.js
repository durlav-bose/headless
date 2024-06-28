const express = require("express");
const app = express();
const port = 3000;

async function init() {
  var THREE = require('./index')
  , fs = require('fs')
  , join = require('path').join;

/**
 * Stage size.
 */

var width = 320;
var height = 240;

/**
 * Renderer.
 */

var renderer = new THREE.CanvasRenderer();
console.log('renderer :>> ', renderer);
renderer.setSize(width, height);

/**
 * Camera.
 */

var camera = new THREE.PerspectiveCamera(75, width / height, 1, 3000);
camera.position.z = 500;

/**
 * Cube with texture.
 */

var map = THREE.ImageUtils.loadTexture(join(__dirname, 'lenna.jpg'));
var material = new THREE.MeshLambertMaterial({ map: map });
var geom = new THREE.CubeGeometry(200, 200, 200);
var mesh = new THREE.Mesh(geom, material);

mesh.rotation.x = 0.1;
mesh.rotation.y = 0.5;
mesh.rotation.z = 0.5;

console.log('mesh :>> ', mesh);

/**
 * Scene.
 */

var scene = new THREE.Scene();
scene.add(camera);
scene.add(mesh);

/**
 * Rendering.
 */

renderer.render(scene, camera);

// console.log('renderer :>> ', renderer);
// console.log('renderer :>> ', renderer.render);

/**
 * Output result.
 */

renderer.domElement.toBuffer(function(err, buf) {
  fs.writeFile(join(__dirname, 'out.png'), buf, function(err) {
    if (err) throw err;
    console.log('see output result file: out.png');
  });
});
}

app.get("/", (req, res) => {
  init();
  res.send("Rendered scene");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
