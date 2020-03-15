import React from 'react';
import { connect } from 'dva';
import { Loading, Drawer } from '@alifd/next';
// import * as THREE from 'three';
const THREE = require('three');
const STLLoader = require('three-stl-loader')(THREE);
const TrackballControls = require('three-trackballcontrols');
import './index.scss';

var camera, scene, renderer;
var controls;
const myMap = new Map();
var bcs=0;
var bcarr=[0xFFFFFF,0xFFE4B5,0x696969];
class DetailInfoShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingVisible: true,
      myMap: null,
    };
  }

  componentDidMount() {
    // const { data } = this.props;
    // const { appData: { stlData }  } = data;
    const stlData = [
      {
        name: '动脉', filePath: 'stl/al5/0.stl', color: 0xff0000, opacity: 1, visible: true,
      },
      {
        name: '骨骼', filePath: 'stl/al5/1.stl', color: 0xe9e9ff, opacity: 0.5, visible: true,
      },
      {
        name: '静脉', filePath: 'stl/al5/2.stl', color: 0x0000ff, opacity: 1, visible: true,
      },
      {
        name: '脑', filePath: 'stl/al5/3.stl', color: 0xd2691e, opacity: 0.5, visible: true,
      },
      {
        name: '皮肤', filePath: 'stl/al5/4.stl', color: 0xeee8aa, opacity: 0, visible: true,
      },
      {
        name: '占位', filePath: 'stl/al5/5.stl', color: 0xffff00, opacity: 1, visible: true,
      },
    ];
    this.draw(stlData);
  }

  draw(stlData) {
    let i = 0
    const initCamera = () => {
      camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
      camera.position.set(0,0,35);
      camera.add(new THREE.PointLight(0xffffff));
      scene.add(camera);
    };
    const initScene = () => {
      scene = new THREE.Scene();
    };
    const initRender = () =>  {
      renderer = new THREE.WebGLRenderer({antialias:true});
      renderer.setSize(window.innerWidth,window.innerHeight);
      renderer.setClearColor(0xffffff);
      let element=document.getElementById('wrapper');//获取父节点
      element.appendChild(renderer.domElement);//添加至父节点内
    };
    const initLight = () => {
      scene.add(new THREE.AmbientLight(0x444444));//环境光  
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
      var loader = new STLLoader();

      while(i < stlData.length) {
        (function(i) {
          loader.load(`public/${stlData[i].filePath}`, (geometry, index) => {
            var mat = new THREE.MeshLambertMaterial({color: stlData[i].color,side: THREE.DoubleSide,opacity:stlData[i].opacity, visible:stlData[i].visible });
            var mesh = new THREE.Mesh(geometry, mat);
            mesh.rotation.x -=0.5*Math.PI;
            mesh.scale.set(0.1, 0.1, 0.1); 
            // scene.add(mesh);
            mesh.name = stlData[i].name;
            myMap.set(i, mesh);
          });
        })(i);
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

    var cp=0;
    var x=0;var y=0;var z=0;
    var fp=new THREE.Vector3();
    const renderSTL = () => {
      
      let length = stlData.length;
      if(myMap.size==length){
  			for(var i=0;i<length;i++){
  				if(myMap.get(i).material.opacity==1){
  					myMap.get(i).material.transparent=false;
  					myMap.get(i).material.depthWrite=true;
  				}else{
  					myMap.get(i).material.transparent=true;
  					myMap.get(i).material.depthWrite=false;
  				}
  			}
  		}
    	// if(myMap.size!=6){
    	// 	// loading();
    	// }
      if(myMap.size==length && cp==0){
      	renderer.setClearColor(0xFFFFFF);
        for(i=0;i<length;i++){
          var geo=myMap.get(i).geometry;
          var po=new THREE.Vector3();
          geo.computeBoundingBox();
          po.addVectors(geo.boundingBox.min,geo.boundingBox.max);
          po.multiplyScalar(0.05);
          fp.x+=po.x;
          fp.y+=po.y;
          fp.z+=po.z;
        }    
        for(var i=0;i<length;i++){
          myMap.get(i).translateX(-fp.x/10-4);
          myMap.get(i).translateY(-fp.y/10-3);
          myMap.get(i).translateZ(-fp.z/10-2); 
          scene.add(myMap.get(i));
        } 
        cp=1;
      } 
      renderer.render( scene, camera );
    };

    const  animate = () => {
      renderSTL();
      // renderer.render( scene, camera );
      if (myMap.size === stlData.length && this.state.loadingVisible === true) {
        this.setState({
          loadingVisible: false,
        });
        this.showButton(myMap);
      }
      controls.update();
      requestAnimationFrame( animate );
    };

    const  onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderSTL();
      renderer.setSize( window.innerWidth, window.innerHeight );
    };

    init();
    animate();
    window.onresize = onWindowResize;
  }


  changeBackgroundColor(){
    if(bcs==2){
      bcs=0;
      renderer.setClearColor(bcarr[bcs]);
    }else{
      bcs+=1;
      renderer.setClearColor(bcarr[bcs]);
    }
  }

  changeOpacity(item) {
    let  index = item[0];
    const mesh = this.state.myMap.get(index);
    let opacity = mesh.material.opacity;
    mesh.material.transparent = true;
    if (opacity == 1) {
      opacity = 0;
    } else {
      opacity  += 0.25;
    }
    mesh.material.opacity = opacity;
    controls.update();
    renderer.render(scene, camera);
  }

  showButton(myMap) {
    this.setState({
      myMap: myMap,
    });
    // console.log('test here---------', this.state.myMap[0][1] == myMap.get(this.state.myMap[0][0]));
  }

  transColor(item, index) {
    const { data } = this.props;
    const { appData: { stlData }  } = data;
    let { r, g, b } = item[1].material.color;
    r = r * 255;
    g = g * 255;
    b = b * 255;

    console.log(r,g,b)
    console.log( `rgb(${r},${g},${b})`)
    return `rgb(${r},${g},${b})`;
  }

  render() {
    let mapTemp = null;
    return (
      <div>
        {this.state.loadingVisible ? 
          <Loading tip="加载中..." fullScreen/> : 
          <div className="tool-bar">
            <div className="tool-main-button tool-button"  >
              <span>工具栏</span>
            </div>
            <div 
              className="tool-main-button tool-button" 
              onClick={() => this.changeBackgroundColor()}
            >
              <span>设置背景颜色</span>
            </div>
            <div className="tool-button-group">
            { this.state.myMap && (mapTemp = [...this.state.myMap]) && mapTemp.map((item, index) => {
                  return (
                    <div 
                      style={{backgroundColor: this.transColor(item, index)}}
                      className="tool-button"
                      key={index}
                      onClick={() => this.changeOpacity(item)}
                    >{item[1].name}</div>
                  );
                })}
            </div>
        </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { data: state.data };
}
export default connect(mapStateToProps)(DetailInfoShow);
