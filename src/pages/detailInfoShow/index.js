import React from 'react';
import { connect } from 'dva';
import { Loading, Message } from '@alifd/next';
import './index.scss';
import checkAuth from '../../utils/checkAuth';
// import * as THREE from 'three';
const THREE = require('three');
const STLLoader = require('three-stl-loader')(THREE);
const TrackballControls = require('three-trackballcontrols');

// 渲染需要的要素
let camera; let scene; let
  renderer;
let controls;
// myMap存储模型mesh
const myMap = new Map();
// bcs: 背景颜色初始索引; bcarr: 背景颜色切换数组
let bcs = 0;
const bcarr = [0xFFFFFF, 0xFFE4B5, 0x696969];
// pointsLength: 测量时取点的个数，为2则测量长度；为3则测量角度
// pointsArray: 点数组
let pointsLength = 0;
let pointsArray = [];
// lineArray: 线段数组
let lineArray = [];
// 光线投射
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
// 辅助线材质
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
class DetailInfoShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingVisible: true,
      myMap: null,
    };
  }


  componentDidMount() {
    const { data } = this.props;
    const { appData: { stlData } } = data;
    this.draw(stlData);
  }

  draw(stlData) {
    let i = 0;
    const initCamera = () => {
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 0, 35);
      camera.add(new THREE.PointLight(0xffffff));
      scene.add(camera);
    };
    const initScene = () => {
      scene = new THREE.Scene();
    };
    const initRender = () => {
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0xffffff);
      const element = document.getElementById('wrapper');// 获取父节点
      element.appendChild(renderer.domElement);// 添加至父节点内
    };
    const initLight = () => {
      scene.add(new THREE.AmbientLight(0x444444));// 环境光
    };
    const initControls = () => {
      controls = new TrackballControls(camera, renderer.domElement);
      controls.rotateSpeed = 2;
      controls.zoomSpeed = 3;
      controls.panSpeed = 1;
      controls.staticMoving = true;
      controls.dynamicDampingFactor = 0.2;
      controls.minDistance = 10;
      controls.maxDistance = 100;
      controls.noPan = false;
    };
    const initModel = () => {
      const loader = new STLLoader();

      while (i < stlData.length) {
        (function (i) {
          loader.load(`public/${stlData[i].filePath}`, (geometry, index) => {
            const mat = new THREE.MeshLambertMaterial({
              color: stlData[i].color, side: THREE.DoubleSide, opacity: stlData[i].opacity, visible: stlData[i].visible,
            });
            const mesh = new THREE.Mesh(geometry, mat);
            mesh.rotation.x -= 0.5 * Math.PI;
            mesh.scale.set(0.1, 0.1, 0.1);
            // scene.add(mesh);
            mesh.name = stlData[i].name;
            myMap.set(i, mesh);
          });
        }(i));
        i++;
      }
    };
    const init = () => {
      initRender();
      initScene();
      initCamera();
      initLight();
      initModel();
      initControls();
    };

    let cp = 0;
    const x = 0; const y = 0; const z = 0;
    const fp = new THREE.Vector3();
    const renderSTL = () => {
      const { length } = stlData;
      if (myMap.size == length) {
        for (var i = 0; i < length; i++) {
          if (myMap.get(i).material.opacity == 1) {
            myMap.get(i).material.transparent = false;
            myMap.get(i).material.depthWrite = true;
          } else {
            myMap.get(i).material.transparent = true;
            myMap.get(i).material.depthWrite = false;
        	}
        }
      }
    	// if(myMap.size!=6){
    	// 	// loading();
    	// }
      if (myMap.size == length && cp == 0) {
      	renderer.setClearColor(0xFFFFFF);
        for (i = 0; i < length; i++) {
          const geo = myMap.get(i).geometry;
          const po = new THREE.Vector3();
          geo.computeBoundingBox();
          po.addVectors(geo.boundingBox.min, geo.boundingBox.max);
          po.multiplyScalar(0.05);
          fp.x += po.x;
          fp.y += po.y;
          fp.z += po.z;
        }
        for (var i = 0; i < length; i++) {
          myMap.get(i).translateX(-fp.x / 10 - 4);
          myMap.get(i).translateY(-fp.y / 10 - 3);
          myMap.get(i).translateZ(-fp.z / 10 - 2);
          scene.add(myMap.get(i));
        }
        cp = 1;
      }
      renderer.render(scene, camera);
    };

    const animate = () => {
      renderSTL();
      // renderer.render( scene, camera );
      if (myMap.size === stlData.length && this.state.loadingVisible === true) {
        this.setState({
          loadingVisible: false,
        });
        this.showButton(myMap);
      }
      controls.update();
      requestAnimationFrame(animate);
    };

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderSTL();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    init();
    animate();
    window.onresize = onWindowResize;
  }


  changeBackgroundColor() {
    if (bcs == 2) {
      bcs = 0;
      renderer.setClearColor(bcarr[bcs]);
    } else {
      bcs += 1;
      renderer.setClearColor(bcarr[bcs]);
    }
  }

  measureLength() {
    if (pointsLength) {
      Message.show({
        type: 'warning',
        content: '请先取消测量',
      });
      return;
    }
    Message.show({
      type: 'notice',
      content: '请取两个点',
    });
    pointsLength = 2;
  }

  measureAngle() {
    if (pointsLength) {
      Message.show({
        type: 'warning',
        content: '请先取消测量',
      });
      return;
    }
    pointsLength = 3;
  }

  cancleMeasure() {
    for (let i = 0; i < lineArray.length; ++i) {
      scene.remove(lineArray[i]);
    }
    lineArray = [];
    pointsArray = [];
    pointsLength = 0;
  }

  changeOpacity(item) {
    const index = item[0];
    const mesh = this.state.myMap.get(index);
    let { opacity } = mesh.material;
    mesh.material.transparent = true;
    if (opacity === 1) {
      opacity = 0;
    } else {
      opacity += 0.25;
    }
    mesh.material.opacity = opacity;
    controls.update();
    renderer.render(scene, camera);
  }

  showButton(myMap) {
    this.setState({
      myMap,
    });
    // console.log('test here---------', this.state.myMap[0][1] == myMap.get(this.state.myMap[0][0]));
  }

  transColor(item, index) {
    const { data } = this.props;
    const { appData: { stlData } } = data;
    let { r, g, b } = item[1].material.color;
    r *= 255;
    g *= 255;
    b *= 255;
    return `rgb(${r},${g},${b})`;
  }

  calculateVolume(object) {
    let volumes = 0;
    object.legacy_geometry = new THREE.Geometry().fromBufferGeometry(object.geometry);
    for (let i = 0; i < object.legacy_geometry.faces.length; i++) {
      const Pi = object.legacy_geometry.faces[i].a;
      const Qi = object.legacy_geometry.faces[i].b;
      const Ri = object.legacy_geometry.faces[i].c;
      const P = new THREE.Vector3(object.legacy_geometry.vertices[Pi].x, object.legacy_geometry.vertices[Pi].y, object.legacy_geometry.vertices[Pi].z);
      const Q = new THREE.Vector3(object.legacy_geometry.vertices[Qi].x, object.legacy_geometry.vertices[Qi].y, object.legacy_geometry.vertices[Qi].z);
      const R = new THREE.Vector3(object.legacy_geometry.vertices[Ri].x, object.legacy_geometry.vertices[Ri].y, object.legacy_geometry.vertices[Ri].z);
      volumes += this.signedVolumeOfTriangle(P, Q, R);
    }
    return Math.abs(volumes);
  }

  signedVolumeOfTriangle(p1, p2, p3) {
    const v321 = p3.x * p2.y * p1.z;
    const v231 = p2.x * p3.y * p1.z;
    const v312 = p3.x * p1.y * p2.z;
    const v132 = p1.x * p3.y * p2.z;
    const v213 = p2.x * p1.y * p3.z;
    const v123 = p1.x * p2.y * p3.z;
    return (-v321 + v231 + v312 - v132 - v213 + v123) / 6;
  }

  render() {
    let mapTemp = null;
    // eslint-disable-next-line no-return-assign
    return (
      <div>
        {this.state.loadingVisible
          ? <Loading tip="加载中..." fullScreen />
          : (
            <div className="tool-bar">
              <div className="tool-main-button tool-button">
                <span>工具栏</span>
              </div>
              <div className="tool-button-group">
                <div className="tool-color">
                  <div
                    className="tool-button"
                    onClick={() => this.changeBackgroundColor()}
                  >
                    <span>设置背景颜色</span>
                  </div>
                  <div>
                    { this.state.myMap && (mapTemp = [...this.state.myMap]) && mapTemp.map((item, index) => {
                      // console.log('----v----', item[1].name, '--毫升---',this.calculateVolume(item[1]))
                      return (
                        <div
                          style={{ backgroundColor: this.transColor(item, index) }}
                          className="tool-button"
                          key={index}
                          onClick={() => this.changeOpacity(item)}
                        >
                          {item[1].name}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="tool-measure">
                  <div
                    className="tool-button"
                    onClick={() => this.measureLength()}
                  >
                    测量长度
                  </div>
                  <div
                    className="tool-button"
                    onClick={() => this.measureAngle()}
                  >
                    测量角度
                  </div>
                  <div
                    className="tool-button"
                    onClick={() => this.cancleMeasure()}
                  >
                    取消测量
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { data: state.data };
}
export default connect(mapStateToProps)(DetailInfoShow);

window.addEventListener('click', onClick, false); // 为啥没法用mousedown没法看
// window.addEventListener('mousemove', onMouseMove, false);


function onClick(e) {
  if (e.target.tagName != 'CANVAS') {
    return;
  }
  if (pointsLength === 0) {
    Message.show({
      type: 'warning',
      content: '请选择测量工具',
    });
    return;
  }
  if (pointsArray.length === pointsLength) {
    Message.show({
      type: 'warning',
      content: '请先取消测量',
    });
    return;
  }
  // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  // 通过摄像机和鼠标位置更新射线
  raycaster.setFromCamera(mouse, camera);
  // 计算物体和射线的焦点
  const intersects = raycaster.intersectObjects(scene.children);
  if (intersects) {
    pointsArray.push(intersects[0].point);
  }
  if (pointsLength == 2 && pointsArray.length == 2) {
    var points = [];
    points.push(new THREE.Vector3(pointsArray[0].x, pointsArray[0].y, pointsArray[0].z));
    points.push(new THREE.Vector3(pointsArray[1].x, pointsArray[1].y, pointsArray[1].z));
    var geometry = new THREE.BufferGeometry().setFromPoints(points);
    var line = new THREE.Line(geometry, lineMaterial);
    const L = points[0].manhattanDistanceTo(points[1]); // 用曼哈顿距离会准确一点
    lineArray.push(line);
    scene.add(line);
    renderer.render(scene, camera);
  }
  if (pointsLength == 3 && pointsArray.length == 3) {
    var points = [];
    points.push(new THREE.Vector3(pointsArray[0].x, pointsArray[0].y, pointsArray[0].z));
    points.push(new THREE.Vector3(pointsArray[1].x, pointsArray[1].y, pointsArray[1].z));
    points.push(new THREE.Vector3(pointsArray[2].x, pointsArray[2].y, pointsArray[2].z));

    var geometry = new THREE.BufferGeometry().setFromPoints(points);
    var line = new THREE.Line(geometry, lineMaterial);
    // var L = points[0].manhattanDistanceTo(points[1]); // 用曼哈顿距离会准确一点
    lineArray.push(line);
    scene.add(line);
    renderer.render(scene, camera);
  }
}
function onMouseMove(e) {

}
