# three-tds-loader 

> NodeJS wrapper for Three.js' GPU Particle System

By default, [Three.js](https://www.npmjs.com/package/three) does not have [GPU Particle System](https://threejs.org/examples/#webgl_loader_3ds) built in. This is a NodeJS wrapper for the GPU Particle System so that it can be used with npm in systems using browserify, webpack, etc.

## Install

```
$ npm install --save three-gpu-particle-system
```

## Usage

```js
var THREE = require('three');
var GPUps = require('three-gpu-particle-system')(THREE);

console.log(typeof GPUps);
//=> 'function'
```

## License

MIT © [CodeTheorist](https://github.com/codetheorist)
