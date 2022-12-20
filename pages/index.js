import Image from 'next/image';
import { useEffect } from 'react';
import Contents, { MobileContents } from '../components/contents';
import { wait, select, show, fadeIn, fadeOut, resizeYoutube, onStateChangeYoutube, hide, inArray, scrollToY, resizeMobileYoutube } from '../components/functions';
import Layout from '../components/layout';
import Viewport, { changingViewport, closeViewport, onKeyDownControl, openViewport } from '../components/viewport';
export let YoutubePlayers = [];

export default function Index() {
  useEffect(() => {
    let tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      select('#viewport article', true)[0].classList.add('active');
      let youtubes = select('#viewport .youtube', true);
      for (let i = 0; i < youtubes.length; i++) {
        YoutubePlayers[i] = new YT.Player(youtubes[i].querySelector('iframe').getAttribute('id'), {
          height: '560',
          width: '315',
          playerVars: {
            rel: 0,
            controls: 1,
            loop: 0,
            modestbranding: 1,
            showinfo: 0,
            enablejsapi: 1
          },
          events: {
            'onStateChange': onStateChangeYoutube
          }
        });
      }
    };

    const observer = new IntersectionObserver(() => {

    });

    // observer.observe()

    const intro = async () => {
      if (select('#intro-title')) {
        fadeIn(select('#intro-title'));
      }
      if (select('#intro-title')) {
        await wait(3500);
        if (select('#intro-title')) {
          fadeOut(select('#intro-title'), true);
        }
      }
      if (select("#intro") && select("#intro-overlay")) {
        await wait(2500);
        if (select("#intro") && select("#intro-overlay")) {
          select("#intro-overlay").style.removeProperty('background');
          select("#intro-fade").style.opacity = 0;
          select("#intro-fade").style.zIndex = 1;
          select("footer").style.zIndex = 0;
          select("#intro-background").style.zIndex = 0;
          select("#intro-background video").play();
        }
      }
      if (select("#intro-logo") && select("#open-viewport")) {
        await wait(500);
        select("#intro-fade").remove();
        select("#intro").style.removeProperty('background');

        if (select("#intro-logo") && select("#open-viewport")) {
          show(select("#intro-logo"));
          show(select("#open-viewport"), true);
        }
      }
      if (select("#intro-logo")) {
        await wait(500);
        if (select("#intro-logo")) {
          fadeIn(select("#intro-logo"), false);
        }
      }
      if (select("#open-viewport")) {
        await wait(1000);
        if (select("#open-viewport")) {
          fadeIn(select("#open-viewport"));
        }
      }
    };

    select("#open-viewport").addEventListener('click', () => {
      if (window.innerWidth >= 578) {
        openViewport();
        resizeYoutube();
      }
    });

    let introVideo = select("#intro-background video");
    introVideo.addEventListener('ended', () => {
      introVideo.style.opacity = '0';
    });

    window.addEventListener('resize', (event) => {
      if (event.target.innerWidth < 578) {
        if (select("#viewport").classList.contains("active")) {
          closeViewport();
        }
      }
      resizeYoutube();
    });

    window.addEventListener('keydown', (event) => {
      if (select("#viewport").classList.contains("active")) {
        if (event.key == "Escape") {
          closeViewport();
        } else {
          if (inArray(event.key, ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"])) {
            if (!changingViewport) {
              onKeyDownControl(event);
            }
          }
        }
      }
    });

    window.addEventListener('load', () => {
      resizeYoutube();
      let pagescrolls = select('a.page-scroll', true);
      pagescrolls.forEach((pagescroll) => {
        pagescroll.addEventListener('click', (event) => {
          event.preventDefault();
          let attr = pagescroll.getAttribute('href').replace('/', '');
          scrollToY(select(attr).offsetTop, 500, 'easeInOutQuint');
        });
      });

      let year = select('.copyright .year');
      let since = Number(year.innerText);
      let now = new Date().getFullYear();
      if (since != now) {
        year.innerHTML = since + '&ndash;' + now;
      }
    });

    setTimeout(() => {
      intro();
    }, 500);
  }, []);
  return (
    <Layout>
      <section id="intro" style={{ background: '#000000' }}>
        <div id="intro-fade"></div>
        <div id="intro-overlay" style={{ background: '#000000' }}></div>
        <div id="intro-background">
          <video muted>
            <source src="/images/background.mp4" type="video/mp4" />
            <strong>Your browser does not support the video tag.</strong>
          </video>
        </div>
        <div className="intro-content">
          <div className="row">
            <div id="intro-title" className='fade-in'>
              <h1>K and Charlie will return.</h1>
            </div>
            <Image id='intro-logo' width={500} height={223} src="/images/logo-ko.png" alt="야생의 땅: 듀랑고" style={{ display: 'none' }} />
            <a id="open-viewport" href="#about" className="page-scroll" style={{ display: 'none' }}><Image width={128} height={128} src="/images/view.png" alt="View" /></a>
          </div>
        </div>
        <Viewport id="viewport">
          <Contents></Contents>
        </Viewport>
      </section>

      <section id="about">
        <MobileContents></MobileContents>
      </section>

      <footer>
        <div className="footer-content">
          <p className="copyright">
            &copy; <span className="year">2022</span> <a href="https://www.nexongames.co.kr" target="_blank">Nexon Games.</a> & <a href="https://www.nexon.com" target="_blank">Nexon Corp.</a>
          </p>
          <p className="madeby">
            &copy; Made by <a href="https://kyllox.tech" target="_blank">Kyllox.</a>
          </p>
        </div>
      </footer>
    </Layout>
  );
}
