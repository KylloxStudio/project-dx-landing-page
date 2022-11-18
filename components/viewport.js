import styles from './viewport.module.css';
import { useEffect } from 'react';
import { wait, select, fadeOut } from './functions';

export default function Viewport({ id, children }) {
  useEffect(() => {
    let youtubes = select('.youtube', true);
    window.addEventListener('resize', () => {
      youtubes.forEach(youtube => {
        if (youtube.querySelector('iframe')) {
          let iframe = youtube.querySelector('iframe');
          let responsiveWidth = window.innerWidth * (80 / 100);
          let responsiveHeight = responsiveWidth * 0.5625;
          iframe.setAttribute('width', responsiveWidth);
          iframe.setAttribute('height', responsiveHeight);
        }
      });
    });
  });
  const closeViewport = async () => {
    let viewport = select("#" + id);
    if (viewport.classList.contains("active")) {
      viewport.style.pointerEvents = 'none';
      fadeOut(viewport, false, 500);
      await wait(500);
      viewport.classList.remove("active");
      select(".content", true)[0].parentElement.style.opacity = '0';
      select("#open-viewport").style.removeProperty("pointer-events");
    }
  };
  return (
    <div id={id} className={styles.viewport} onClick={closeViewport}>
      <div className={styles.contents}>
        {children}
      </div>
    </div>
  );
}
