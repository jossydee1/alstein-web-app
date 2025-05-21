import React from "react";
import style from "./style.module.scss";
import Link from "next/link";

const PrivacyPageContent = () => {
  return (
    <main className={`section-container ${style.wrapper}`}>
      <header>
        {/* Date */}
        <p className={style.date}>Current as of 20th Jan, 2022</p>

        {/* Title */}
        <h1 className={style.title}>Privacy Policy</h1>

        {/* Summary */}
        <p className={style.summary}>
          Your privacy is important to us at Untitled. We respect your privacy
          regarding any information we may collect from you across our website.
        </p>
      </header>

      <article className={style.article}>
        {/* Introduction */}
        <p className={style.pTags}>
          Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam
          suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis
          montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere
          vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien
          varius id.
        </p>
        <p className={style.pTags}>
          Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat
          mollis at volutpat lectus velit, sed auctor. Porttitor fames arcu quis
          fusce augue enim. Quis at habitant diam at. Suscipit tristique risus,
          at donec. In turpis vel et quam imperdiet. Ipsum molestie aliquet
          sodales id est ac volutpat.
        </p>

        {/* Sections */}
        <h2 className={style.h2Tags}>What information do we collect?</h2>
        <p className={style.pTags}>
          Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla
          odio nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis
          mi bibendum diam. Tempor integer aliquam in vitae malesuada fringilla.
          Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet
          commodo consectetur convallis risus. Sed condimentum enim dignissim
          adipiscing faucibus consequat, urna. Viverra purus et erat auctor
          aliquam. Risus, volutpat vulputate posuere purus sit congue convallis
          aliquet. Arcu id augue ut feugiat donec porttitor neque. Mauris, neque
          ultricies eu vestibulum, bibendum quam lorem id. Dolor lacus, eget
          nunc lectus in tellus, pharetra, porttitor. Ipsum sit mattis nulla
          quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque
          congue eget consectetur turpis. Sapien, dictum molestie sem tempor.
          Diam elit, orci, tincidunt aenean tempus. Quis velit eget ut tortor
          tellus. Sed vel, congue felis elit erat nam nibh orci.
        </p>

        <h2 className={style.h2Tags}>How do we use your information?</h2>
        <p className={style.pTags}>
          Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla
          odio nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis
          mi bibendum diam. Tempor integer aliquam in vitae malesuada fringilla.
          Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet
          commodo consectetur convallis risus. Sed condimentum enim dignissim
          adipiscing faucibus consequat, urna. Viverra purus et erat auctor
          aliquam. Risus, volutpat vulputate posuere purus sit congue convallis
          aliquet. Arcu id augue ut feugiat donec porttitor neque. Mauris, neque
          ultricies eu vestibulum, bibendum quam lorem id. Dolor lacus, eget
          nunc lectus in tellus, pharetra, porttitor. Ipsum sit mattis nulla
          quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque
          congue eget consectetur turpis. Sapien, dictum molestie sem tempor.
          Diam elit, orci, tincidunt aenean tempus. Quis velit eget ut tortor
          tellus. Sed vel, congue felis elit erat nam nibh orci.
        </p>

        {/* Sub-sections */}
        <h3 className={style.h3Tags}>
          Do we use cookies and other tracking technologies?
        </h3>
        <p className={style.pTags}>
          Pharetra morbi libero id aliquam elit massa integer tellus. Quis felis
          aliquam ullamcorper porttitor. Pulvinar ullamcorper sit dictumst ut
          eget a, elementum eu. Maecenas est morbi mattis id in ac pellentesque
          ac.
        </p>

        <h3 className={style.h3Tags}>How long do we keep your information?</h3>
        <p className={style.pTags}>
          Pharetra morbi libero id aliquam elit massa integer tellus. Quis felis
          aliquam ullamcorper porttitor. Pulvinar ullamcorper sit dictumst ut
          eget a, elementum eu. Maecenas est morbi mattis id in ac pellentesque
          ac.
        </p>

        <h3 className={style.h3Tags}>How do we keep your information safe?</h3>
        <p className={style.pTags}>
          Pharetra morbi libero id aliquam elit massa integer tellus. Quis felis
          aliquam ullamcorper porttitor. Pulvinar ullamcorper sit dictumst ut
          eget a, elementum eu. Maecenas est morbi mattis id in ac pellentesque
          ac.
        </p>

        {/* Another major section */}
        <h2 className={style.h2Tags}>What are your privacy rights?</h2>
        <p className={style.pTags}>
          Pharetra morbi libero id aliquam elit massa integer tellus. Quis felis
          aliquam ullamcorper porttitor. Pulvinar ullamcorper sit dictumst ut
          eget a, elementum eu. Maecenas est morbi mattis id in ac pellentesque
          ac.
        </p>

        {/* Contact section with ordered list */}
        <h3 className={style.h3Tags}>
          How can you contact us about this policy?
        </h3>
        <p className={style.pTags}>
          Sagittis et eu at elementum, quis in. Proin praesent volutpat egestas
          sociis sit lorem nunc nunc sit. Eget diam curabitur mi ac. Auctor
          rutrum lacus malesuada massa ornare et. Vulputate consectetur ac
          ultrices at diam dui eget fringilla tincidunt. Arcu sit dignissim
          massa erat cursus vulputate gravida id. Sed quis auctor vulputate hac
          elementum gravida cursus dis.
        </p>

        <ol className={style.olTags}>
          <li>
            Lectus id duis vitae porttitor enim{" "}
            <Link href="#" className={style.links}>
              gravida morbi.
            </Link>
          </li>
          <li>
            Eu turpis{" "}
            <Link href="#" className={style.links}>
              posuere semper feugiat
            </Link>{" "}
            volutpat elit, ultrices suspendisse. Auctor vel in vitae placerat.
          </li>
          <li>
            Suspendisse maecenas ac{" "}
            <Link href="#" className={style.links}>
              donec scelerisque
            </Link>{" "}
            diam sed est duis purus.
          </li>
        </ol>
      </article>
    </main>
  );
};

export default PrivacyPageContent;
