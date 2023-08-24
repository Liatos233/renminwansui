import { useEffect, useRef, useState } from 'react';
import style from './musicPlayer.module.less';
import lyricText from './lyric.js'

const MusicPlayer: React.FC = () => {

  const musicPath = require("@/views/musicPlayer/music.mp3")
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lyricListRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0); // 用于跟踪当前歌词的索引
  const initialLyricBoxHeightRef = useRef(0);

  // 从时间字符串转成毫秒数
  const getMSTime = (str: string) => {
    let m = Number(str.split(":")[0])
    let s = Number(str.split(":")[1])
    return m * 60 + s
  }

  // 处理歌词
  const parseLyric = function (lyricText: string) {
    return lyricText.split("\n").map(item => {
      let index = item.indexOf("]")
      let time = getMSTime(item.slice(1, index))
      let lyric = item.slice(index + 1)
      return { time, lyric }
    })
  }
  const lyricTextArr = parseLyric(lyricText)
  // console.log(lyricTextArr)

  // 根据当前播放的时间找到对应歌词的index
  const findLyricIndex = (currentTime: number): number => {
    let res = 0;
    lyricTextArr.forEach((item, index) => {
      if (currentTime >= item.time) {
        res = index
      }
    });
    return res
  }

  // 更新歌词盒子的偏移
  const updateLyricBoxTranslate = () => {
    const lyricList = lyricListRef.current as any;
    let newOffsetY = initialLyricBoxHeightRef.current / 2.5 - currentLyricIndex * 30; // 假设每行歌词高度为 30px
    // console.log('newOffsetY', newOffsetY);
    lyricList.style.transform = `translateY(${newOffsetY}px)`;
  }

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  // 播放时间变化时，对应的各自和偏移量变化
  const handleTimeUpdate = () => {
    const currentTime = (audioRef.current as any).currentTime;
    // 找到当前对应的歌词index
    const nextLyricIndex = findLyricIndex(currentTime);
    // 当前歌词变化了
    if (nextLyricIndex !== currentLyricIndex) {
      // console.log(nextLyricIndex)
      // console.log(lyricTextArr[nextLyricIndex])
      setCurrentLyricIndex(nextLyricIndex);
      updateLyricBoxTranslate()
    }
  };

  useEffect(() => {
    const lyricList = lyricListRef.current as any;
    initialLyricBoxHeightRef.current = lyricList.parentNode.clientHeight
    updateLyricBoxTranslate()

    if (isPlaying) {
      audioRef.current?.addEventListener('timeupdate', handleTimeUpdate);
    } else {
      audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
    };
  },)

  return (
    <div className={style.layout}>
      <div className={style.musicControl}>
        <audio
          ref={audioRef}
          src={musicPath}
          controls
          onPlay={handlePlay}
          onPause={handlePause}
        ></audio>
      </div>
      <div className={style.lyric}>
        <ul className={style.lyricList} ref={lyricListRef}>
          {
            lyricTextArr.map((item, index) => {
              if (index === currentLyricIndex) {
                return <li className={`${style.lyricListItem} ${style.lyricListItemHighlight}`} key={index}>{item.lyric}</li>
              } else {
                return <li className={style.lyricListItem} key={index}>{item.lyric}</li>
              }
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default MusicPlayer;