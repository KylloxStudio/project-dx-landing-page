import Image from 'next/image';
import styles from './viewport.module.css';
import { wait, select, fadeIn, fadeOut, inArray } from './functions';
import { YoutubePlayers } from '../pages';

export const openViewport = async () => {
  let viewport = select("#viewport");
  if (viewport) {
    select("#open-viewport").style.pointerEvents = 'none';
    viewport.style.display = "table";
    await wait(100);
    // select("#intro-background video").pause();
    let youtubes = select('#viewport .youtube', true);
    for (let i = 0; i < youtubes.length; i++) {
      if (YoutubePlayers[i].getPlayerState() == YT.PlayerState.PAUSED) {
        YoutubePlayers[i].playVideo();
      }
    }
    fadeIn(viewport, false, 500);
    await wait(250);
    fadeIn(select('.' + styles.contents, true)[0], false, 350);
    viewport.classList.add("active");
    viewport.style.removeProperty("pointer-events");
  }
};

export const closeViewport = async () => {
  let viewport = select("#viewport");
  if (viewport.classList.contains("active")) {
    viewport.style.pointerEvents = 'none';
    fadeOut(viewport, false, 500);
    await wait(250);
    let youtubes = select('#viewport .youtube', true);
    for (let i = 0; i < youtubes.length; i++) {
      if (YoutubePlayers[i].getPlayerState() == YT.PlayerState.PLAYING) {
        YoutubePlayers[i].pauseVideo();
      }
    }
    viewport.classList.remove("active");
    select('.' + styles.contents, true)[0].style.opacity = '0';
    select("#open-viewport").style.removeProperty("pointer-events");
    // select("#intro-background video").play();
  }
};

export let changingViewport = false;
export const onClickControl = async (event) => {
  event.preventDefault();
  event.stopPropagation();
  let articles = select("#viewport").querySelectorAll("article");
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].classList.contains("active")) {
      if (!changingViewport) {
        changingViewport = true;
        if (YoutubePlayers[i] != null) {
          if (YoutubePlayers[i].getPlayerState() == YT.PlayerState.PLAYING) {
            YoutubePlayers[i].pauseVideo();
          }
        }
        fadeOut(articles[i], false, 250);
        await wait(100);
        articles[i].classList.remove("active");
        if (event.target.getAttribute("alt") == "next") {
          if (i + 1 >= articles.length) {
            articles[0].style.opacity = '0';
            articles[0].classList.add("active");
            await wait(100);
            fadeIn(articles[0], false, 250);
          } else {
            articles[i + 1].style.opacity = '0';
            articles[i + 1].classList.add("active");
            await wait(100);
            fadeIn(articles[i + 1], false, 250);
          }
        } else {
          if (i - 1 < 0) {
            articles[articles.length - 1].style.opacity = '0';
            articles[articles.length - 1].classList.add("active");
            await wait(100);
            fadeIn(articles[articles.length - 1], false, 250);
          } else {
            articles[i - 1].style.opacity = '0';
            articles[i - 1].classList.add("active");
            await wait(100);
            fadeIn(articles[i - 1], false, 250);
          }
        }
      }
      break;
    }
  }
  changingViewport = false;
};

export const onKeyDownControl = async (event) => {
  let articles = select("#viewport").querySelectorAll("article");
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].classList.contains("active")) {
      if (!changingViewport) {
        changingViewport = true;
        if (YoutubePlayers[i].getPlayerState() == YT.PlayerState.PLAYING) {
          YoutubePlayers[i].pauseVideo();
        }
        fadeOut(articles[i], false, 250);
        await wait(100);
        articles[i].classList.remove("active");
        if (inArray(event.key, ["ArrowUp", "ArrowRight"])) {
          if (i + 1 >= articles.length) {
            articles[0].style.opacity = '0';
            articles[0].classList.add("active");
            await wait(100);
            fadeIn(articles[0], false, 250);
          } else {
            articles[i + 1].style.opacity = '0';
            articles[i + 1].classList.add("active");
            await wait(100);
            fadeIn(articles[i + 1], false, 250);
          }
        } else if (inArray(event.key, ["ArrowDown", "ArrowLeft"])) {
          if (i - 1 < 0) {
            articles[articles.length - 1].style.opacity = '0';
            articles[articles.length - 1].classList.add("active");
            await wait(100);
            fadeIn(articles[articles.length - 1], false, 250);
          } else {
            articles[i - 1].style.opacity = '0';
            articles[i - 1].classList.add("active");
            await wait(100);
            fadeIn(articles[i - 1], false, 250);
          }
        }
      }
      break;
    }
  }
  changingViewport = false;
};

export default function Viewport({ id, children }) {
  return (
    <div id={id} className={styles.viewport} onClick={closeViewport}>
      <div className={styles.controls}>
        <a id="viewport-prev" className={styles.prev} onClick={onClickControl}><Image width={38} height={132} src="/images/viewport-prev.png" alt="prev" /></a>
        <a id="viewport-next" className={styles.next} onClick={onClickControl}><Image width={38} height={132} src="/images/viewport-next.png" alt="next" /></a>
      </div>
      <div className={styles.contents}>
        {children}
      </div>
    </div>
  );
}
