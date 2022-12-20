import Image from "next/image";

export default function Contents() {
  return (
    <div className="contents">
      <article>
        <div className="content youtube">
          <iframe id="Kabs_yafj8I" frameBorder="0" allowFullScreen="1" sandbox="allow-forms allow-scripts allow-pointer-lock allow-popups allow-same-origin allow-top-navigation allow-presentation" src="https://www.youtube-nocookie.com/embed/Kabs_yafj8I?rel=0&amp;controls=1&amp;loop=0&amp;modestbranding=1&amp;showinfo=0&amp;enablejsapi=1"></iframe>
        </div>
      </article>
      <article>
        <div className="content youtube">
          <iframe id="Qt-yiDvSB7g" frameBorder="0" allowFullScreen="1" sandbox="allow-forms allow-scripts allow-pointer-lock allow-popups allow-same-origin allow-top-navigation allow-presentation" src="https://www.youtube-nocookie.com/embed/Qt-yiDvSB7g?rel=0&amp;controls=1&amp;loop=0&amp;modestbranding=1&amp;showinfo=0&amp;enablejsapi=1"></iframe>
        </div>
      </article>
      <article>
        <div className="content youtube">
          <iframe id="tvxmnqTxovg" frameBorder="0" allowFullScreen="1" sandbox="allow-forms allow-scripts allow-pointer-lock allow-popups allow-same-origin allow-top-navigation allow-presentation" src="https://www.youtube-nocookie.com/embed/tvxmnqTxovg?rel=0&amp;controls=1&amp;loop=0&amp;modestbranding=1&amp;showinfo=0&amp;enablejsapi=1"></iframe>
        </div>
      </article>
      <article>
        <div className="content youtube">
          <iframe id="xQSAbBx2bnE" frameBorder="0" allowFullScreen="1" sandbox="allow-forms allow-scripts allow-pointer-lock allow-popups allow-same-origin allow-top-navigation allow-presentation" src="https://www.youtube-nocookie.com/embed/xQSAbBx2bnE?rel=0&amp;controls=1&amp;loop=0&amp;modestbranding=1&amp;showinfo=0&amp;enablejsapi=1"></iframe>
        </div>
      </article>
      <article>
        <div className="content">
          <Image id="conceptart01" width={960} height={540} src="/images/concept_art_01.jpg" alt="Concept Art 01" />
        </div>
      </article>
    </div>
  );
}

export function MobileContents() {
  return (
    <div className="contents">
      <article>
        <div className="content youtube">
          <iframe id="Kabs_yafj8I" frameBorder="0" allowFullScreen="1" sandbox="allow-forms allow-scripts allow-pointer-lock allow-popups allow-same-origin allow-top-navigation allow-presentation" src="https://www.youtube-nocookie.com/embed/Kabs_yafj8I?rel=0&amp;controls=1&amp;loop=0&amp;modestbranding=1&amp;showinfo=0&amp;enablejsapi=1"></iframe>
        </div>
      </article>
      <article>
        <div className="content youtube">
          <iframe id="Qt-yiDvSB7g" frameBorder="0" allowFullScreen="1" sandbox="allow-forms allow-scripts allow-pointer-lock allow-popups allow-same-origin allow-top-navigation allow-presentation" src="https://www.youtube-nocookie.com/embed/Qt-yiDvSB7g?rel=0&amp;controls=1&amp;loop=0&amp;modestbranding=1&amp;showinfo=0&amp;enablejsapi=1"></iframe>
        </div>
      </article>
      <article>
        <div className="content youtube">
          <iframe id="tvxmnqTxovg" frameBorder="0" allowFullScreen="1" sandbox="allow-forms allow-scripts allow-pointer-lock allow-popups allow-same-origin allow-top-navigation allow-presentation" src="https://www.youtube-nocookie.com/embed/tvxmnqTxovg?rel=0&amp;controls=1&amp;loop=0&amp;modestbranding=1&amp;showinfo=0&amp;enablejsapi=1"></iframe>
        </div>
      </article>
      <article>
        <div className="content youtube">
          <iframe id="xQSAbBx2bnE" frameBorder="0" allowFullScreen="1" sandbox="allow-forms allow-scripts allow-pointer-lock allow-popups allow-same-origin allow-top-navigation allow-presentation" src="https://www.youtube-nocookie.com/embed/xQSAbBx2bnE?rel=0&amp;controls=1&amp;loop=0&amp;modestbranding=1&amp;showinfo=0&amp;enablejsapi=1"></iframe>
        </div>
      </article>
    </div>
  );
}