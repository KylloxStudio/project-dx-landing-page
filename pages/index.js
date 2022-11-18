import Image from 'next/image';
import { useEffect } from 'react';
import { wait, select, show, fadeIn, fadeOut } from '../components/functions';
import YouTube from 'react-youtube';
import Layout from '../components/layout';
import Viewport from '../components/viewport'

export default function Index() {
  useEffect(() => {
    const intro = async () => {
      if (select('#intro-title')) {
        fadeIn(select('#intro-title'));
      }
      if (select('#intro-title')) {
        await wait(5000);
        if (select('#intro-title')) {
          fadeOut(select('#intro-title'), true);
        }
      }
      if (select("#intro") && select("#intro-overlay")) {
        await wait(2500);
        if (select("#intro") && select("#intro-overlay")) {
          select("#intro-overlay").style.removeProperty('background');
          select("#intro-fade").style.opacity = 0;
          select("#intro").style.removeProperty('background');
        }
      }
      if (select("#intro-logo") && select("#open-viewport")) {
        await wait(500);
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

    select("#open-viewport").addEventListener('click', async () => {
      let youtubes = select('.youtube', true);
      youtubes.forEach(youtube => {
        if (youtube.querySelector('iframe')) {
          let iframe = youtube.querySelector('iframe');
          let responsiveWidth = window.innerWidth * (80 / 100);
          let responsiveHeight = responsiveWidth * 0.5625;
          iframe.setAttribute('width', responsiveWidth);
          iframe.setAttribute('height', responsiveHeight);
        }
      });
      if (select("#viewport")) {
        select("#open-viewport").style.pointerEvents = 'none';
        select("#viewport").style.display = "table";
        await wait(100);
        fadeIn(select("#viewport"), false, 500);
        await wait(500);
        fadeIn(select(".content", true)[0].parentElement, false, 350);
        await wait(350);
        select("#viewport").classList.add("active");
        select("#viewport").style.removeProperty("pointer-events");
      }
    });

    setTimeout(() => {
      intro();
    }, 500);
  });
  return (
    <Layout>
      <section id="intro" style={{ background: '#000000' }}>
        <div id="intro-fade"></div>
        <div id="intro-overlay" style={{ background: '#000000' }}></div>
        <div className="intro-content">
          <div className="row">
            <div id="intro-title" className='fade-in'>
              <h1>K and Charlie will return.</h1>
            </div>
            <Image id='intro-logo' width={500} height={223} src="/images/logo-ko.png" alt="야생의 땅: 듀랑고" style={{ display: 'none' }} />
            <a id="open-viewport" style={{ display: 'none' }}><Image width={128} height={128} src="/images/view.png" alt="View" /></a>
          </div>
        </div>
        <Viewport id="viewport">
          <article className="content">
            <YouTube id="Kabs_yafj8I"
              className="youtube"
              videoId="Kabs_yafj8I"
              opts={{
                width: "560",
                height: "315",
                playerVars: {
                  rel: 0,
                  controls: 1,
                  loop: 0,
                  modestbranding: 1,
                  showinfo: 0,
                  enablejsapi: 1
                },
              }}
              onEnd={(event) => {
                event.target.stopVideo(0);
                event.target.clearVideo();
              }}>
            </YouTube>
          </article>
        </Viewport>
      </section>
    </Layout>
  );
}
