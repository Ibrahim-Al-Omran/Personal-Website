/**
 * Re-export three.js and add VertexColors for Vanta compatibility.
 * VertexColors was removed in Three.js r152+; its value was 2.
 */
export * from '../../node_modules/three/build/three.module.js';
export const VertexColors = 2;
