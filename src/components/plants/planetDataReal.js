import sunImg from "./solarSystemImage/sun.jpg"; //太阳
import mercuryImg from "./solarSystemImage/mercury.jpg"; //水星
import venusImg from "./solarSystemImage/venus.jpg"; //金星
import earthImg from "./solarSystemImage/earth.jpg"; //地球
import moonImg from "./solarSystemImage/moon.jpg"; //月球
import marsImg from "./solarSystemImage/mars.jpg"; //火星
import jupiterImg from "./solarSystemImage/jupiter.jpg"; //木星
import saturnImg from "./solarSystemImage/saturn.jpg"; //土星
import uranusImg from "./solarSystemImage/uranus.jpg"; //天王星
import neptuneImg from "./solarSystemImage/neptune.jpg"; //海王星

const solarSyetemstatistics = {
  sun: [696000, 0],
  mercury: [2439.7, 57910000],
  venus: [6051.8, 108210000],
  earth: [6371, 149600000],
  moon: [1738, 384400000],
  mars: [3389.5, 227920000],
  jupiter: [69911, 778570000],
  saturn: [58232, 1433530000],
  uranus: [25362, 2872460000],
  neptune: [24622, 4495060000],
};

const sSModelSize = Object.fromEntries(
  Object.entries(solarSyetemstatistics).map(([planet, [radius, distance]]) => [
    planet,
    [radius / 5000000, distance / 5000000],
  ])
);
let sun = {
  name: "太阳", //球体名称
  mapImg: sunImg, //球体贴图
  size: sSModelSize.sun[0], //球体尺寸
  position: [0, 0, 0], //位置(x，y，z)
  rotation: 0.05, //自转速度
  revolution: 0, //公转速度
  data: {
    sunDistance: "0km",
    weight: "1.989e30kg",
    diameter: "1392000km",
    rotation: "36day",
    revolution: "",
    temp: "5500℃",
    atmosphere: "氮气、氧气、氩气",
    msg: "太阳是在大约45.7亿年前在一个坍缩的氢分子云内形成。太阳是太阳系里唯一的恒星，是太阳系的中心天体。",
  }, //描述
};
let mercury = {
  name: "水星",
  mapImg: mercuryImg,
  size: sSModelSize.mercury[0],
  position: [
    sSModelSize.sun[0] + sSModelSize.mercury[0] + sSModelSize.mercury[1],
    0,
    0,
  ],
  rotation: 0.001,
  revolution: 0.02,
  data: {
    sunDistance: "5791万km",
    weight: "3.30e23kg",
    diameter: "4880km",
    rotation: "58.646day",
    revolution: "87.7day",
    temp: "427℃昼",
    atmosphere: "氦气、氫气",
    msg: "水星的轨道偏离正圆程度很大，近日点距太阳仅四千六百万千米，远日点却有7千万千米，在轨道的近日点它以十分缓慢的速度按岁差围绕太阳向前运行（在十九世纪，天文学家们对水星的轨道半径进行了非常仔细的观察，但无法运用牛顿力学对此作出适当的解释。存在于实际观察到的值与预告值之间的细微差异是一个次要（每千年相差七分之一度）但困扰了天文学家们数十年的问题。有人认为在靠近水星的轨道上存在着另一颗行星（有时被称作Vulcan，“祝融星”），由此来解释这种差异，结果最终的答案颇有戏剧性：爱因斯坦的广义相对论。在人们接受认可此理论的早期，水星运行的正确预告是一个十分重要的因素。（水星因太阳的引力场而绕其公转，而太阳引力场极其巨大，据广义相对论观点，质量产生引力场，引力场又可看成质量，所以巨引力场可看作质量，产生小引力场，使其公转轨道偏离。类似于电磁波的发散，变化的磁场产生电场，变化的电场产生磁场，传向远方。",
  },
};
let venus = {
  name: "金星",
  mapImg: venusImg,
  size: sSModelSize.venus[0],
  position: [
    sSModelSize.sun[0] + sSModelSize.venus[0] + sSModelSize.venus[1],
    0,
    0,
  ],
  rotation: 0.00025,
  revolution: -0.016, //金星公转方向特殊
  data: {
    sunDistance: "1.08亿km",
    weight: "4.869e24kg",
    diameter: "12,103km",
    rotation: "243.018day",
    revolution: "224.7day",
    temp: "485℃",
    atmosphere: "二氧化碳、氮气",
    msg: "金星的大气压力为90个标准大气压（相当于地球海洋深1千米处的压力），大气大多由二氧化碳组成，也有几层由硫酸组成的厚数千米的云层。这些云层挡住了我们对金星表面的观察，使得它看来非常模糊。这稠密的大气也产生了温室效应，使金星表面温度上升400度，超过了740开（足以使铅条熔化）。金星表面自然比水星表面热，虽然金星比水星离太阳要远两倍。云层顶端有强风，大约每小时350千米，但表面风速却很慢，每小时连几千米都不到。",
  },
};
let earth = {
  name: "地球",
  mapImg: earthImg,
  size: sSModelSize.earth[0],
  position: [
    sSModelSize.sun[0] + sSModelSize.earth[0] + sSModelSize.earth[1],
    0,
    0,
  ],
  rotation: 0.05,
  revolution: 0.01,
  data: {
    sunDistance: "1.49亿km",
    weight: "5.9736e24kg",
    diameter: "12,756km",
    rotation: "1day",
    revolution: "365day",
    temp: "15℃",
    atmosphere: "氮气、氧气",
    msg: "地球是九大行星中唯一适宜生命生存和繁衍的地方。71%的地球表面为水所覆盖。地球是行星中唯一一颗能在表面存在有液态水（虽然在土卫六的表面存在有液态乙烷与甲烷，木卫二的地下有液态水）。地球的大气由77%的氮，21%氧，微量的氩、二氧化碳和水组成。地球初步形成时，大气中可能存在大量的二氧化碳，但是几乎都被组合成了碳酸盐岩石，少部分溶入了海洋或给活着的植物消耗了。",
  },
};
let moon = {
  name: "月球",
  mapImg: moonImg,
  size: sSModelSize.moon[0],
  position: [
    sSModelSize.earth[0] + sSModelSize.moon[0] + sSModelSize.moon[1],
    0,
    0,
  ],
  rotation: 0.001,
  revolution: 0.02,
  data: {},
};
let mars = {
  name: "火星",
  mapImg: marsImg,
  size: sSModelSize.mars[0],
  position: [
    sSModelSize.sun[0] + sSModelSize.mars[0] + sSModelSize.mars[1],
    0,
    0,
  ],
  rotation: 0.05,
  revolution: 0.005,
  data: {
    sunDistance: "2.27亿km",
    weight: "6.4219e23kg",
    diameter: "6,794km",
    rotation: "1.025day",
    revolution: "687day",
    temp: "-33℃",
    atmosphere: "二氧化碳",
    msg: "火星按照距太阳由近到远的次序为第四颗行星，又叫“红色星行”，它一出现在天上，就可以看到他那淡淡的红色。在火星的早期，它与地球十分相似。像地球一样，火星上几乎所有的二氧化碳都被转化为含碳的岩石。但由于缺少地球的板块运动，火星无法使二氧化碳再次循环到它的大气中，从而无法产生意义重大的温室效应。因此，即使把它拉到与地球距太阳同等距离的位置，火星表面的温度仍比地球上的冷得多。火星的那层薄薄的大气主要是由余留下的二氧化碳（95.3%）加上氮气（2.7%）、氩气（1.6%）和微量的氧气（0.15%）和水汽（0.03%）组成的。火星表面的平均大气压强仅为大约7毫巴（比地球上的1%还小），但它随着高度的变化而变化，在盆地的最深处可高达9毫巴，而在Olympus Mons的顶端却只有1毫巴。但是它也足以支持偶尔整月席卷整颗行星的飓风和大风暴。火星那层薄薄的大气层虽然也能制造温室效应，但那些仅能提高其表面5K的温度，比我们所知道的金星和地球的少得多。",
  },
};
let jupiter = {
  name: "木星",
  mapImg: jupiterImg,
  size: sSModelSize.jupiter[0],
  position: [
    sSModelSize.sun[0] + sSModelSize.jupiter[0] + sSModelSize.jupiter[1],
    0,
    0,
  ],
  rotation: 0.14,
  revolution: 0.003,
  data: {
    sunDistance: "7.78亿km",
    weight: "1.900e27kg",
    diameter: "142,984km",
    rotation: "0.413day",
    revolution: "11.86year",
    temp: "-140℃",
    atmosphere: "氢气、氦气",
    msg: "木星是太阳系中最大的一颗行星。木星表面的大红斑早在300年前就被地球上的观察所知晓（这个发现常归功于卡西尼，或是17世纪的Robert Hooke）。大红斑是个长25,000千米，跨度12,000千米的椭圆，总以容纳两个地球。其他较小一些的斑点也已被看到了数十年了。红外线的观察加上对它自转趋势的推导显示大红斑是一个高压区，那里的云层顶端比周围地区特别高，也特别冷。类似的情况在土星和海王星上也有。还不清楚为什么这类结构能持续那么长的一段时间。",
  },
};
let saturn = {
  name: "土星",
  mapImg: saturnImg,
  size: sSModelSize.saturn[0],
  position: [
    sSModelSize.sun[0] + sSModelSize.saturn[0] + sSModelSize.saturn[1],
    0,
    0,
  ],
  rotation: 0.13,
  revolution: 0.0015,
  data: {
    sunDistance: "14.29亿km",
    weight: "5.68e26kg",
    diameter: "120,536km",
    rotation: "0.444day",
    revolution: "29.5year",
    temp: "-140℃",
    atmosphere: "氢气、氦气",
    msg: "土星是太阳系里的第二大行星，它有七个美丽的光环，他的光环鲜艳夺目，因此有人把土星成为“星中美人”。土星在史前就被发现了。伽利略在1610年第一次通过望远镜观察到它，并记录下它的奇怪运行轨迹，但也被它给搞糊涂了。早期对于土星的观察十分复杂，这是由于当土星在它的轨道上时每过几年，地球就要穿过土星光环所在的平面。（低分辨率的土星图片所以经常有彻底性的变化。）直到1659年惠更斯正确地推断出光环的几何形状。在1977年以前，土星的光环一直被认为是太阳系中唯一存在的；但在1977年，在天王星周围发现了暗淡的光环，在这以后不久木星和海王星周围也发现了光环。",
  },
};
let uranus = {
  name: "天王星",
  mapImg: uranusImg,
  size: sSModelSize.uranus[0],
  position: [
    sSModelSize.sun[0] + sSModelSize.uranus[0] + sSModelSize.uranus[1],
    0,
    0,
  ],
  rotation: 0.11,
  revolution: 0.0012,
  data: {
    sunDistance: "28.70亿km",
    weight: "8.683e25kg",
    diameter: "51,118km",
    rotation: "0.718day",
    revolution: "84year",
    temp: "-214℃",
    atmosphere: "氢气、甲烷",
    msg: "天王星显蓝色是其外层大气层中的甲烷吸收了红光的结果。那儿或许有像木星那样的彩带，但它们被覆盖着的甲烷层遮住了。像其他所有气态行星一样，天王星有光环。它们像木星的光环一样暗，但又像土星的光环那样由相当大的直径达到10米的粒子和细小的尘土组成。天王星有11层已知的光环，但都非常暗淡；最亮的那个被称为Epsilon光环。天王星的光环是继土星的被发现后第一个被发现的，这一发现被认为是十分重要的，由此我们知道了光环是行星的一个普遍特征，而不是仅为土星所特有的。",
  },
};
let neptune = {
  name: "海王星",
  mapImg: neptuneImg,
  size: sSModelSize.neptune[0],
  position: [
    sSModelSize.sun[0] + sSModelSize.neptune[0] + sSModelSize.neptune[1],
    0,
    0,
  ],
  rotation: 0.12,
  revolution: 0.0011,
  data: {
    sunDistance: "45.04亿km",
    weight: "1.0247e26kg",
    diameter: "49,532km",
    rotation: "0.671day",
    revolution: "164.8year",
    temp: "-220℃",
    atmosphere: "氢气、甲烷",
    msg: "海王星的组成成份与天王星的很相似：各种各样的“冰”和含有15%的氢和少量氦的岩石。海王星相似于天王星但不同于土星和木星，它或许有明显的内部地质分层，但在组成成份上有着或多或少的一致性。但海王星很有可能拥有一个岩石质的小型地核（质量与地球相仿）。它的大气多半由氢气和氦气组成。还有少量的甲烷。海王星的蓝色是大气中甲烷吸收了日光中的红光造成的。",
  },
};

let planetList = [
  sun,
  mercury,
  venus,
  earth,
  moon,
  mars,
  jupiter,
  saturn,
  uranus,
  neptune,
];
export default planetList;
