import React from 'react';
import Link from 'next/link';
import { useEffect } from "react";
import { useRouter } from 'next/router';
import { select, show, toggle, toggleClass, slideDown, slideUp, slideToggle, scrollToY, getAbsPosY, onscroll } from './functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faAngleRight, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
export let MovePageAndScroll = {
  move: false,
  to: ''
};

export default function Navigation() {
  const router = useRouter();
  useEffect(() => {
    window.requestAnimFrame = (function () {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60);
        };
    })();

    let dropLinks = select("#mainnav li li>a", true);
    onscroll(window, () => {
      if (getAbsPosY(select("#header")) > 50) {
        select(".fixed-top").classList.add("header-scrolled");
        select(".slide-menu-container").style.top = "60px";
        select(".drop-menu").style.paddingTop = "43px";
        dropLinks.forEach((dropLink) => {
          dropLink.style.background = "rgba(0, 0, 0, 0.85)";
        });
      } else {
        select(".fixed-top").classList.remove("header-scrolled");
        select(".slide-menu-container").style.top = "70px";
        select(".drop-menu").style.paddingTop = "33px";
        dropLinks.forEach((dropLink) => {
          dropLink.style.background = "transparent";
        });
      }
    });

    let pagescrolls = select('a.page-scroll', true);
    pagescrolls.forEach((pagescroll) => {
      pagescroll.addEventListener('click', (event) => {
        event.preventDefault();
        let attr = pagescroll.getAttribute('href').replace('/', '');
        if (router.route != '/') {
          MovePageAndScroll.move = true;
          MovePageAndScroll.to = attr;
          router.push('/');
          return;
        }
        scrollToY(select(attr).offsetTop, 350, 'easeInOutQuint');
      });
    });

    let navbarlinks = select('#mainnav .nav-link', true);
    const navbarlinksActive = () => {
      let position = window.scrollY + 150;
      navbarlinks.forEach((navbarlink) => {
        if (!navbarlink.innerText) return;
        let section = select('#' + navbarlink.innerText.toLowerCase());
        if (!section) return;
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active');
        } else {
          navbarlink.classList.remove('active');
        }
      });
    };
    navbarlinksActive();
    onscroll(document, navbarlinksActive);

    let slidelinks = select('#slide-menu .slide-link', true);
    const slidemenulinksActive = () => {
      let position = window.scrollY + 150;
      slidelinks.forEach((slidelink) => {
        if (!slidelink.innerText) return;
        let section = select('#' + slidelink.innerText.toLowerCase());
        if (!section) return;
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          slidelink.classList.add('active');
        } else {
          slidelink.classList.remove('active');
        }
      });
    };
    slidemenulinksActive();
    onscroll(document, slidemenulinksActive);

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        select('.slide-menu-container').style.display = 'none';
        select('.ham').classList.remove("active");
      }
    });

    select(".ham").addEventListener('click', () => {
      if (!select(".ham").classList.contains("active")) {
        select(".ham").classList.add("active");
        slideDown(select('.slide-menu-container'));
      } else {
        select(".ham").classList.remove("active");
        slideUp(select('.slide-menu-container'));
      }
    });

    let slidemenus = select('#slide-menu .page-scroll', true);
    slidemenus.forEach((slidemenu) => {
      slidemenu.addEventListener('click', () => {
        select('.ham').classList.remove("active");
        slideUp(select('.slide-menu-container'));
      });
    });

    let slidepagelinks = select('#slide-menu .page-link', true);
    slidepagelinks.forEach((slidepagelink) => {
      slidepagelink.addEventListener('click', () => {
        select('.ham').classList.remove("active");
        slideUp(select('.slide-menu-container'));
      });
    });

    select('#pages-down').addEventListener('click', () => {
      hide(select('#pages-down'));
      show(select('#pages-up'));
      slideDown(select('#slide-menu-pages'));
      toggleClass(select('#slide-pages-btn'), "active");
      toggleClass(select('#pages-up'), "active");
    });

    select('#pages-up').addEventListener('click', () => {
      show(select('#pages-down'));
      hide(select('#pages-up'));
      slideUp(select('#slide-menu-pages'));
      toggleClass(select("#slide-pages-btn"), "active");
      toggleClass(select("#pages-up"), "active");
    });

    select('#slide-pages-btn').addEventListener('click', () => {
      toggle(select('#pages-down'));
      toggle(select('#pages-up'));
      slideToggle(select('#slide-menu-pages'));
      toggleClass(select("#slide-pages-btn"), "active");
      toggleClass(select("#pages-up"), "active");
    });
  }, []);
  return (
    <header id="header" className="fixed-top">
      <div className="hoc clear">
        <h1 className="logo"><a href="/">Project DX</a></h1>
        <nav id="mainnav">
          <div className="ham">
            <span className="bar1"></span>
            <span className="bar2"></span>
            <span className="bar3"></span>
          </div>
          <ul className="nav-items clear">
            <li><a href="/#intro" className="nav-link page-scroll">Intro</a></li>
            {/* <li><a href="/#about" className="nav-link page-scroll">About</a></li> */}
            {/* <li><Link href="/waiting" passHref className="nav-link page-link">Waiting for Release</Link></li> */}
            <li><a className="nav-link drop"><FontAwesomeIcon icon={faSortDown} />Pages</a>
              <ul className="drop-menu">
                <li><a href="https://nexon.com">Nexon</a></li>
                <li><a href="https://what.kyllox.tech">What! Studio</a></li>
                <li><a href="https://gall.dcinside.com/mgallery/board/lists/?id=leeunseok">Community</a></li>
              </ul>
            </li>
          </ul>
        </nav>

        <nav id="slide-menu" className="slide-menu-container">
          <ul className="slide-menu">
            <li className="slide-item">
              <div className="slide-go-arrow">
                <a href="/#intro" className="slide-link page-scroll"><FontAwesomeIcon icon={faAngleRight} /></a>
              </div>
              <a href="/#intro" className="slide-link page-scroll">Intro</a>
            </li>
            {/* <li className="slide-item">
              <div className="slide-go-arrow">
                <a href="/#about" className="slide-link page-scroll"><FontAwesomeIcon icon={faAngleRight} /></a>
              </div>
              <a href="/#about" className="slide-link page-scroll">About</a>
            </li> */}
            {/* <li className="slide-item">
              <div className="slide-go-arrow">
                <Link href="/waiting" passHref className="slide-link page-link"><FontAwesomeIcon icon={faAngleRight} /></Link>
              </div>
              <Link href="/waiting" passHref className="slide-link page-link">Waiting for Release</Link>
            </li> */}
            <li className="slide-item">
              <div className="slide-drop-arrow">
                <a id="pages-down"><FontAwesomeIcon icon={faAngleDown} /></a>
                <a id="pages-up"><FontAwesomeIcon icon={faAngleUp} /></a>
              </div>
              <div className="slide-pages-wrapper">
                <a id="slide-pages-btn" className="slide-link">Pages</a>
              </div>
              <ul id="slide-menu-pages" className="slide-menu-sub">
                <li className="slide-item-sub"><a className="slide-link-sub" href="https://nexon.com">└ Nexon</a></li>
                <li className="slide-item-sub"><a className="slide-link-sub" href="https://what.kyllox.tech">└ What! Studio</a></li>
                <li className="slide-item-sub"><a className="slide-link-sub" href="https://gall.dcinside.com/mgallery/board/lists/?id=leeunseok">└ Community</a></li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
