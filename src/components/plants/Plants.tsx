import React, { useEffect, useRef } from 'react'
import * as THREE from 'three';
import { OrbitControls } from '@three-ts/orbit-controls';
// import Stats from 'stats.js';
import style from './plants.module.less'
import { useNavigate } from 'react-router-dom';

type Props = {};

const Earth: React.FC<Props> = () => {

  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  // let stats: Stats;
  // 摄像机
  let camera: THREE.PerspectiveCamera;
  // 场景
  let scene: THREE.Scene;
  // 渲染器
  let renderer: THREE.WebGLRenderer;
  // Group
  let group: THREE.Group;
  // 动画id
  let animationFrameId: number;

  const initThree = () => {
    // 获取容器
    const container = containerRef.current;
    const width = container?.clientWidth || 0;
    const height = container?.clientHeight || 0;
    // console.log('width', width, 'height', height);

    // 创建场景
    scene = new THREE.Scene();
    group = new THREE.Group();
    scene.add(group);

    // 创建相机
    camera = new THREE.PerspectiveCamera(60, width / height, 1, 2000); // 视野角度 视窗宽高比 近裁切面 远裁切面
    camera.position.x = -10;
    camera.position.y = 15;
    camera.position.z = 500;
    camera.lookAt(scene.position);

    // 相机作为Orbitcontrols的参数，支持鼠标交互
    const orbitControls = new OrbitControls(camera, container!);
    orbitControls.autoRotate = false;

    // 添加光源 环境光和点光源
    const ambi = new THREE.AmbientLight(0x686868);
    scene.add(ambi);
    const spotLight = new THREE.DirectionalLight(0xffffff);
    spotLight.position.set(550, 100, 550);
    spotLight.intensity = 0.6;
    scene.add(spotLight);

    // 创建模型和材质E
    const loader = new THREE.TextureLoader();
    const planetTexture = require('./plantsImage/solarSystem/8k_earth_daymap.jpg');
    loader.load(planetTexture, function (texture) {
      const geometry = new THREE.SphereGeometry(200, 20, 20);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const mesh = new THREE.Mesh(geometry, material);
      group.add(mesh);
    });

    // 渲染
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xfafafa);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    container?.appendChild(renderer.domElement);


    // 添加双击事件
    const handleDblclick = (e: MouseEvent) => {
      navigate('/vision');
    }
    containerRef.current?.addEventListener("dblclick", handleDblclick, false);

    // 增加监控的信息状态
    // stats = new Stats();
    // container?.appendChild(stats.dom);
  };


  // 动态渲染 自转
  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);
    render();
    // stats?.update();
  };

  const render = () => {
    group.rotation.y += 0.005;
    renderer.render(scene, camera);
  };

  useEffect(() => {
    let container = containerRef.current;
    // 组件还没有挂载
    if (!container) return;
    // 清理上一次渲染
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    initThree();
    animate();

    return () => {
      // 停止动画循环
      cancelAnimationFrame(animationFrameId);

      // 释放 Three.js 渲染器的资源
      renderer?.dispose();
    };
  });

  return <div ref={containerRef} className={style.webGLContainer}></div>;
};

export default Earth;
