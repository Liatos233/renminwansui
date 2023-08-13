import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import TWEEN from "@tweenjs/tween.js";
import style from './solarSystem.module.less';

import planetData from "./planetData.js"; //导入星球数据
import universeImg from "./solarSystemImage/universe.jpg"; //宇宙
import starImg from "./solarSystemImage/star.jpg"; //星辰
import venusAtmosphereImg from "./solarSystemImage/venusAtmosphere.jpg"; //金星大气
import moonImg from "./solarSystemImage/moon.jpg"; //月球
import earthNormalImg from "./solarSystemImage/earthNormal.jpg"; //法线贴图
import earthCloudsImg from "./solarSystemImage/earthClouds.jpg"; //地球云层

interface PlanetData {
  name: string;
  size: number;
  position: number[];
  mapImg: string;
  rotation: number;
  revolution: number;
  data: object;
}

const SolarSystem: React.FC = () => {

  const containerRef = useRef<HTMLDivElement | null>(null);

  let dom: HTMLDivElement | null; //需要使用canvas的dom
  let renderer: THREE.WebGLRenderer; //渲染器
  let anId: number; //动画id
  let planetList: PlanetData[] = planetData;// 星球数据
  let isRevolution = true; //公转状态
  let isRotation = true; //自转状态
  let raycaster: THREE.Raycaster = new THREE.Raycaster(); //光线投射器(用于鼠标点击时获取坐标)
  let mouse: THREE.Vector2 = new THREE.Vector2(); //鼠标点击的二维平面
  let clickPlanet: any; //当前点击的星球

  let scene: THREE.Scene; //场景(频繁变更的对象放置在vue的data中会导致卡顿)
  let camera: THREE.PerspectiveCamera; //相机
  let orbitControls: OrbitControls; //鼠标控件

  const init = () => {
    // 确认renderer是否已初始化
    console.log('renderer', renderer);

    if (renderer === undefined) {
      dom = containerRef.current!; //获取dom
      let width = dom.clientWidth;
      let height = dom.clientHeight;
      scene = new THREE.Scene(); //场景场景
      // scene.add(new THREE.AxesHelper(500));
      camera = new THREE.PerspectiveCamera(45, width / height, 1, 50000000); //创建透视相机(视场、长宽比、近面、远面)
      camera.position.set(0, 500, 2700); //设置相机位置
      camera.lookAt(0, 0, 0);
      //创建渲染器
      renderer = new THREE.WebGLRenderer({
        antialias: true, //抗锯齿
        alpha: true, //透明
      });
      renderer.setClearColor(0x000000, 0.1); //设置场景透明度
      renderer.setSize(width, height); //设置渲染区域尺寸
      dom.appendChild(renderer.domElement); //将渲染器添加到dom中形成canvas
      createUniverse(); //创建宇宙
      createStars(); //创建星辰
      createLight(); //创建光源
      //遍历行星数据生成星球及其轨道
      planetList.forEach((e) => {
        createSphere(e as PlanetData);
        createTrack(e as PlanetData);
      });
      createOrbitControls(); //创建鼠标控制器
      render(); //渲染
    }
  }

  //创建宇宙(球形宇宙)
  const createUniverse = () => {
    let universeGeometry = new THREE.SphereGeometry(7000, 100, 100);
    let universeMaterial = new THREE.MeshLambertMaterial({
      //高光材质
      map: new THREE.TextureLoader().load(universeImg),
      side: THREE.DoubleSide, //双面显示
    });
    //宇宙网格
    let universeMesh = new THREE.Mesh(universeGeometry, universeMaterial);
    universeMesh.name = "宇宙";
    scene.add(universeMesh);
  };

  //创建星辰
  const createStars = () => {
    const positions = [];
    const colors = [];
    //星辰几何体
    const starsGeometry = new THREE.BufferGeometry();
    //添加星辰的颜色与位置
    for (let i = 0; i < 10000; i++) {
      let vertex = new THREE.Vector3();
      vertex.x = Math.random() * 2 - 1;
      vertex.y = Math.random() * 2 - 1;
      vertex.z = Math.random() * 2 - 1;
      positions.push(vertex.x, vertex.y, vertex.z);
      let color = new THREE.Color();
      color.setRGB(255, 255, 255);
      colors.push(color.r, color.g, color.b);
    }
    starsGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    starsGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3)
    );
    //星辰材质
    let starsMaterial = new THREE.PointsMaterial({
      map: new THREE.TextureLoader().load(starImg),
      size: 5,
      blending: THREE.AdditiveBlending,
      fog: true,
      depthTest: false, //(不能与blending一起使用)
      // depthWrite: false, //(深度写入)防止星辰在球体前面出现黑块
    });
    //星辰的集合
    let starsMesh = new THREE.Points(starsGeometry, starsMaterial);
    starsMesh.scale.set(7000, 7000, 7000); //设置集合体范围
    scene.add(starsMesh);
  };

  //创建光源
  const createLight = () => {
    let ambient = new THREE.AmbientLight(new THREE.Color(0xffffff)); //环境光
    scene.add(ambient);
    let pointLight = new THREE.PointLight(new THREE.Color(0xffffff), 2, 1, 0); //点光源
    pointLight.visible = true;
    pointLight.position.set(0, 0, 0); //点光源在原点充当太阳
    scene.add(pointLight); //点光源添加到场景中
  };

  //创建球体
  const createSphere = (data: PlanetData) => {
    //处理特殊球体
    if (data.name === "太阳") {
      createSun(data);
    } else if (data.name === "地球") {
      createEarth(data);
    } else if (data.name === "金星") {
      createVenus(data);
    } else if (data.name === "土星") {
      createSaturn(data);
    } else {
      //其他球体
      let sphereGeometry = new THREE.SphereGeometry(data.size, 100, 100); //球体几何体
      //球体材质
      let sphereMaterial = new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load(data.mapImg),
      });
      let sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial) as any; //生成球体网格
      sphereMesh.name = data.name; //网格名字
      sphereMesh.planetMsg = data;
      sphereMesh.isPlanet = true; //标识为星球
      sphereMesh.angle = 0; //添加初始角度
      //球体位置
      sphereMesh.position.set(
        data.position[0],
        data.position[1],
        data.position[2]
      );
      scene.add(sphereMesh); //球体添加到场景中
    }
  };

  //创建太阳
  const createSun = (data: PlanetData) => {
    let sunGroup = new THREE.Group() as any; //太阳的组
    let sunGeometry = new THREE.SphereGeometry(data.size, 100, 100); //太阳几何体
    let sunMaterial = new THREE.MeshLambertMaterial({
      //太阳材质
      color: new THREE.Color(0xffffff),
      map: new THREE.TextureLoader().load(data.mapImg),
    });
    let sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
    sunGroup.add(sunMesh);
    //太阳大气几何体
    let sunAtmosphereGeometry = new THREE.SphereGeometry(
      data.size + 8,
      100,
      100
    );
    let sunAtmosphereMaterial = new THREE.MeshLambertMaterial({
      color: new THREE.Color(0xffffff),
      transparent: true,
      opacity: 0.2,
    });
    let sunAtmosphereMesh = new THREE.Mesh(
      sunAtmosphereGeometry,
      sunAtmosphereMaterial
    );
    sunGroup.add(sunAtmosphereMesh);
    sunGroup.name = data.name; //网格名字
    sunGroup.planetMsg = data;
    sunGroup.isPlanet = true; //标识为星球
    sunGroup.angle = 0; //添加初始角度
    //球体位置
    sunGroup.position.set(
      data.position[0],
      data.position[1],
      data.position[2]
    );
    scene.add(sunGroup);
  };

  //创建金星
  const createVenus = (data: PlanetData) => {
    let venusGroup = new THREE.Group() as any; //金星的组
    let venusGeometry = new THREE.SphereGeometry(data.size, 100, 100); //金星几何体
    //金星材质
    let venusMaterial = new THREE.MeshLambertMaterial({
      color: new THREE.Color(0xffffff),
      map: new THREE.TextureLoader().load(data.mapImg),
    });
    let venusMesh = new THREE.Mesh(venusGeometry, venusMaterial);
    venusGroup.add(venusMesh);
    //金星大气几何体
    let venusAtmosphereGeometry = new THREE.SphereGeometry(
      data.size + 2,
      100,
      100
    );
    //金星大气材质
    let venusAtmosphereMaterial = new THREE.MeshLambertMaterial({
      color: new THREE.Color(0xffffff),
      transparent: true,
      opacity: 0.5,
      map: new THREE.TextureLoader().load(venusAtmosphereImg),
    });
    let venusAtmosphereMesh = new THREE.Mesh(
      venusAtmosphereGeometry,
      venusAtmosphereMaterial
    );
    venusGroup.add(venusAtmosphereMesh); //将大气添加到组中
    venusGroup.name = data.name; //网格名字
    venusGroup.planetMsg = data;
    venusGroup.isPlanet = true; //标识为星球
    venusGroup.angle = 0; //添加初始角度
    //球体位置
    venusGroup.position.set(
      data.position[0],
      data.position[1],
      data.position[2]
    );
    scene.add(venusGroup);
  };

  //创建地球
  const createEarth = (data: PlanetData) => {
    let earthGroup = new THREE.Group() as any; //地球的组
    let earthGeometry = new THREE.SphereGeometry(data.size, 100, 100); //地球几何体
    //地球材质
    let earthMaterial = new THREE.MeshPhysicalMaterial({
      map: new THREE.TextureLoader().load(data.mapImg),
      normalScale: new THREE.Vector2(10, 10), //凹凸深度
      normalMap: new THREE.TextureLoader().load(earthNormalImg), //法线贴图
    });
    let earthMesh = new THREE.Mesh(earthGeometry, earthMaterial); //地球网格
    earthGroup.add(earthMesh); //将地球网格添加到地球组中
    //地球云层几何体
    let earthCloudsGeometry = new THREE.SphereGeometry(
      data.size + 2,
      100,
      100
    );
    //地球云层材质
    let earthCloudsMaterial = new THREE.MeshLambertMaterial({
      color: new THREE.Color(0xffffff),
      transparent: true,
      opacity: 0.4,
      map: new THREE.TextureLoader().load(earthCloudsImg),
    });
    //地球云层网格
    let earthCloudsMesh = new THREE.Mesh(
      earthCloudsGeometry,
      earthCloudsMaterial
    );
    earthGroup.add(earthCloudsMesh); //将地球云层网格添加到地球组中

    //创建月球轨道
    let moonTrackGeometry = new THREE.RingGeometry( //圆环几何体
      data.size + 4,
      data.size + 4,
      100
    );
    let moonTrackMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    let moonTrackMesh = new THREE.Mesh(moonTrackGeometry, moonTrackMaterial);
    moonTrackMesh.rotation.set(0.5 * Math.PI, 0, 0);
    earthGroup.add(moonTrackMesh);

    //创建月球
    const moonSize = planetData.find((item) => item.name === "月球")?.size;
    console.log('', moonSize);
    let moonGeometry = new THREE.SphereGeometry(moonSize, 100, 100);
    let moonMaterial = new THREE.MeshPhysicalMaterial({
      map: new THREE.TextureLoader().load(moonImg),
      normalScale: new THREE.Vector2(10, 10), //凹凸深度
    });
    let moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    moonMesh.position.set(data.size + 40, 0, 0);
    earthGroup.add(moonMesh);

    earthGroup.name = data.name; //网格名字
    earthGroup.planetMsg = data;
    earthGroup.isPlanet = true; //标识为星球
    earthGroup.angle = 0; //添加初始角度
    //球体位置
    earthGroup.position.set(
      data.position[0],
      data.position[1],
      data.position[2]
    );
    scene.add(earthGroup);
  };

  //创建土星
  const createSaturn = (data: PlanetData) => {
    let saturnGroup = new THREE.Group() as any; //土星的组
    let saturnGeometry = new THREE.SphereGeometry(data.size, 100, 100); //土星几何体
    let saturnMaterial = new THREE.MeshLambertMaterial({
      map: new THREE.TextureLoader().load(data.mapImg), //土星材质
    });
    let saturnMesh = new THREE.Mesh(saturnGeometry, saturnMaterial); //土星网格
    saturnGroup.add(saturnMesh); //将土星网格添加到地球组中
    //创建土星环1
    let saturnTrackGeometry1 = new THREE.RingGeometry( //圆环几何体
      data.size + 10,
      data.size + 25,
      100
    );
    let saturnTrackMaterial1 = new THREE.MeshLambertMaterial({
      transparent: true,
      opacity: 0.8,
      color: 0xc0ad87,
      side: THREE.DoubleSide,
    });
    let saturnTrackMesh1 = new THREE.Mesh(
      saturnTrackGeometry1,
      saturnTrackMaterial1
    );
    saturnTrackMesh1.rotation.set(0.5 * Math.PI, 0, 0);
    //创建土星环2
    let saturnTrackGeometry2 = new THREE.RingGeometry( //圆环几何体
      data.size + 26,
      data.size + 30,
      100
    );
    let saturnTrackMaterial2 = new THREE.MeshLambertMaterial({
      transparent: true,
      opacity: 0.5,
      color: 0xc0ad87,
      side: THREE.DoubleSide,
    });
    let saturnTrackMesh2 = new THREE.Mesh(
      saturnTrackGeometry2,
      saturnTrackMaterial2
    );
    saturnTrackMesh2.rotation.set(0.5 * Math.PI, 0, 0);
    //创建土星环3
    let saturnTrackGeometry3 = new THREE.RingGeometry( //圆环几何体
      data.size + 30.1,
      data.size + 32,
      100
    );
    let saturnTrackMaterial3 = new THREE.MeshLambertMaterial({
      transparent: true,
      opacity: 0.3,
      color: 0xc0ad87,
      side: THREE.DoubleSide,
    });
    let saturnTrackMesh3 = new THREE.Mesh(
      saturnTrackGeometry3,
      saturnTrackMaterial3
    );
    saturnTrackMesh3.rotation.set(0.5 * Math.PI, 0, 0);
    saturnGroup.add(saturnTrackMesh1); //将网格添加到组中
    saturnGroup.add(saturnTrackMesh2);
    saturnGroup.add(saturnTrackMesh3);
    saturnGroup.name = data.name; //网格名字
    saturnGroup.planetMsg = data;
    saturnGroup.isPlanet = true; //标识为星球
    saturnGroup.angle = 0; //添加初始角度
    //球体位置
    saturnGroup.position.set(
      data.position[0],
      data.position[1],
      data.position[2]
    );
    scene.add(saturnGroup);
  };

  //创建球体轨迹
  const createTrack = (data: PlanetData) => {
    if (data.name === "太阳") {
      //去除太阳中心由圆环形成的圆形
      return;
    }
    //创建轨迹
    let trackGeometry = new THREE.RingGeometry( //圆环几何体
      data.position[0],
      data.position[0] + 2,
      1000
    );
    //圆环材质
    let trackMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    let trackMesh = new THREE.Mesh(trackGeometry, trackMaterial);
    trackMesh.position.set(0, 0, 0); //轨道位置
    trackMesh.rotation.set(0.5 * Math.PI, 0, 0); //旋转轨道至水平
    scene.add(trackMesh);
  };

  //创建鼠标控件
  const createOrbitControls = () => {
    orbitControls = new OrbitControls(camera, renderer?.domElement);
    orbitControls.enablePan = false; //右键平移拖拽
    orbitControls.enableZoom = true; //鼠标缩放
    orbitControls.enableDamping = true; //滑动阻尼
    orbitControls.dampingFactor = 0.05; //(默认.25)
    orbitControls.minDistance = 100; //相机距离目标最小距离
    orbitControls.maxDistance = 2700; //相机距离目标最大距离
    // orbitControls.maxPolarAngle = (Math.PI / 4) * 3; //y旋转角度范围
    // orbitControls.minPolarAngle = Math.PI / 4;
    orbitControls.autoRotate = true; //自转(相机)
    orbitControls.autoRotateSpeed = 0; //自转速度
  };

  //渲染
  const render = () => {
    //请求动画帧，屏幕每刷新一次调用一次，绑定屏幕刷新频率
    anId = requestAnimationFrame(render); //记录下动画id可用于销毁场景
    orbitControls.update(); //鼠标控件实时更新
    renderer?.render(scene, camera);
    //控制公转
    if (isRevolution) {
      sphereRevolution(planetList); //球体公转
    }
    if (isRotation) {
      sphereRotation(planetList); //球体自转
    }
    //监听画布双击事件
    containerRef.current?.addEventListener("dblclick", handleDblclick, false);
    TWEEN.update(); //更新动画
  };

  //双击事件
  const handleDblclick = (e: MouseEvent) => {
    let dom = containerRef.current!;
    let width = dom.clientWidth; //窗口宽度
    let height = dom.clientHeight; //窗口高度
    //将鼠标点击位置的屏幕坐标转换成threejs中的标准坐标
    mouse.x = (e.offsetX / width) * 2 - 1;
    mouse.y = -(e.offsetY / height) * 2 + 1;
    // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
    raycaster.setFromCamera(mouse, camera);
    //生成星球网格列表
    let palnetMeshList: any = [];
    scene.children.forEach((p) => {
      if (p.name !== "") {
        palnetMeshList.push(p);
      }
    });
    // 获取raycaster直线和星球网格列表相交的集合
    let intersects = raycaster.intersectObjects(palnetMeshList);
    //判断是否点击到虚无的太空
    if (intersects.length === 0) {
      return;
    }
    //判断是否是行星
    if ((intersects[0].object as any).isPlanet) {
      clickPlanet = intersects[0].object;
    } else {
      clickPlanet = intersects[0].object.parent;
    }
    // console.log(clickPlanet);
    //获取球体半径
    let planetR: number = 0;
    planetList.forEach((e) => {
      if (e.name === clickPlanet.name) {
        planetR = e.size;
      }
    });
    //相机新位置
    let newP = {
      x: clickPlanet.position.x,
      y: clickPlanet.position.y + planetR,
      z: clickPlanet.position.z + 2.5 * planetR,
    };
    //双击到星球需要停止公转（双击虚空需反转公转状态）
    if (clickPlanet.type !== "Scene") {
      isRevolution = false;
      isRotation = false;

      //点击后传入参数飞向星球
      flyTo(
        camera.position,
        orbitControls.target,
        newP as THREE.Vector3,
        clickPlanet.position,
        2000
      );
    } else {
      isRevolution = !isRevolution;
      isRotation = !isRotation;
    }
  };

  //飞向对象(旧相机位置，旧对象位置，新相机位置，新对象位置，动画时间，回调)
  const flyTo = (oldP: THREE.Vector3, oldT: THREE.Vector3, newP: THREE.Vector3, newT: THREE.Vector3, time: number, callBack?: () => void) => {
    if (TWEEN) {
      let tween = new TWEEN.Tween({
        x1: oldP.x, // 相机x
        y1: oldP.y, // 相机y
        z1: oldP.z, // 相机z
        x2: oldT.x, // 控制点的中心点x
        y2: oldT.y, // 控制点的中心点y
        z2: oldT.z, // 控制点的中心点z
      });
      tween.to(
        {
          x1: newP.x,
          y1: newP.y,
          z1: newP.z,
          x2: newT.x,
          y2: newT.y,
          z2: newT.z,
        },
        time
      );
      tween.onUpdate(function (object) {
        camera.position.set(object.x1, object.y1, object.z1);
        orbitControls.target.x = object.x2;
        orbitControls.target.y = object.y2;
        orbitControls.target.z = object.z2;
        orbitControls.update();
      });
      tween.onComplete(function () {
        callBack && callBack();
      });
      tween.easing(TWEEN.Easing.Cubic.InOut);
      tween.start();
    }
  };

  //球体自转
  const sphereRotation = (data: PlanetData[]) => {
    scene.children.forEach((e) => {
      //过滤出星球
      if ((e as any).isPlanet) {
        let planetData = data.filter((d) =>
          d.name === e.name)[0];
        if (e.name === "土星") {
          e.rotation.x = 0.05 * 2 * Math.PI;
          // return;
        }
        //天王星自转轴特殊
        if (e.name === "天王星") {
          e.rotation.z =
            e.rotation.z + planetData.rotation >= 2 * Math.PI
              ? 0
              : e.rotation.z + planetData.rotation;
          return;
        }
        e.rotation.y =
          e.rotation.y + planetData.rotation >= 2 * Math.PI
            ? 0
            : e.rotation.y + planetData.rotation;
      }
    });
  };

  //球体公转
  const sphereRevolution = (data: PlanetData[]) => {
    scene.children.forEach((el) => {
      //过滤出星球
      let e = el as any;
      if (e.isPlanet) {
        let planetData = data.filter((d) => d.name === e.name)[0]; //获取球体数据
        e.angle =
          e.angle + planetData.revolution >= 2 * Math.PI
            ? 0
            : e.angle + planetData.revolution;
        e.position.set(
          planetData.position[0] * Math.sin(e.angle),
          0,
          planetData.position[0] * Math.cos(e.angle)
        );
      }
    });
  };

  //销毁场景
  const destroyScene = () => {
    // 清除动画帧，停止渲染循环
    // cancelAnimationFrame(anId);

    // // 清除场景中的所有对象
    // scene.children.length = 0;

    // // 清除渲染器
    // renderer.dispose();
  };

  useEffect(() => {

    // 初始化
    init();

    return () => {
      destroyScene();
    }
  });

  return (
    <div className={style.layout}>
      <div className={style.container} ref={containerRef}>
        {/* 绘制canvas的盒子 */}
      </div>
    </div>
  );
};

export default SolarSystem;
