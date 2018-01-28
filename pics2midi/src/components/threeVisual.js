import React, { Component } from 'react'
import * as THREE from 'three'

class ThreeVisual extends Component {
  constructor(props) {
    super(props)

    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
    this.playMidi = this.playMidi.bind(this)
  }

  componentDidMount() {
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    const scene = new THREE.Scene()
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 0, 200);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0, 50, 0));
    geometry.vertices.push(new THREE.Vector3(50, 0, 0));

    const line = new THREE.Line(geometry, material);

    // camera.position.z = 4
    // scene.add(cube)
    scene.add(line)
    renderer.setClearColor('#000000')
    renderer.setSize(width, height)

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.material = material
    this.line = line

    this.mount.appendChild(this.renderer.domElement)
    this.start()
  }

  componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId)
  }

  playMidi() {
  }

  animate() {
    // this.line.rotation.x += 0.01
    // this.line.rotation.y += 0.01

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return (
      <div>
      <div
        style={{ width: '400px', height: '400px' }}
        ref={(mount) => { this.mount = mount }} />
        <button onClick={this.playMidi}>
        Play Midi
        </button>
        </div>
    )
  }
}

export default ThreeVisual
