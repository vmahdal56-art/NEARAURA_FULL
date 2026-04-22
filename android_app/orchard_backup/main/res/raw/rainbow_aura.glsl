precision mediump float;
varying vec2 vTextureCoord;
uniform float uTime;
void main() {
    vec3 color = 0.5 + 0.5 * cos(uTime + vTextureCoord.xyx + vec3(0,2,4));
    gl_FragColor = vec4(color, 1.0);
}
