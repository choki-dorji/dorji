(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,852,(e,i,a)=>{i.exports={citizenDetailsResponse:{citizenDetail:[{cid:"10102003151",country:null,dob:"22/04/2000",fatherName:"Karma Dukpa",firstIssuedDate:null,fatherCIDNo:"12008000096",firstName:"Choki",gender:"M",householdNo:"200800011",lastName:"Dorji",middleName:null,mobileNumber:"17554947",motherCIDNo:"11312001289",motherName:"Tshewang Dema",occupation:"Student",dzongkhagId:"20",dzongkhagName:"Zhemgang",gewogId:"228",gewogName:"Trong",houseNo:"Wa-8-194",thramNo:"17",villageSerialNo:"4674",villageName:"Berti",placeOfBirth:null,firstDzoName:" ཆོས་སྐྱིད་ རྡོ་རྗེ།",middleDzoName:null,lastDzoName:null,religion:"Buddhist",qualification:"High School",Cid_Expiry_Date:"2029-01-27+00:00"}]}}},86084,e=>{"use strict";var i=e.i(43476),a=e.i(71645);let t=e.i(852).default,r=[{title:"Personal Information",description:"Identity and biographical details.",fields:[["cid","CID Number"],["firstName","First Name"],["middleName","Middle Name"],["lastName","Last Name"],["firstDzoName","First Dzongkha Name"],["middleDzoName","Middle Dzongkha Name"],["lastDzoName","Last Dzongkha Name"],["gender","Gender"],["dob","Date of Birth"],["placeOfBirth","Place of Birth"],["religion","Religion"],["country","Country"]]},{title:"Family Information",description:"Parent and household information.",fields:[["fatherName","Father's Name"],["fatherCIDNo","Father's CID"],["motherName","Mother's Name"],["motherCIDNo","Mother's CID"],["householdNo","Household Number"]]},{title:"Registered Address",description:"Registered administrative location.",fields:[["dzongkhagName","Dzongkhag"],["dzongkhagId","Dzongkhag ID"],["gewogName","Gewog"],["gewogId","Gewog ID"],["villageName","Village"],["villageSerialNo","Village Serial Number"],["houseNo","House Number"],["thramNo","Thram Number"]]},{title:"Contact and Background",description:"Contact, education and occupational details.",fields:[["mobileNumber","Mobile Number"],["occupation","Occupation"],["qualification","Qualification"]]},{title:"Document Information",description:"Citizen-card issuance and validity.",fields:[["firstIssuedDate","First Issued Date"],["Cid_Expiry_Date","CID Expiry Date"]]}];function n(e){return e?.trim()||"Not available"}function o(){return(0,i.jsx)("style",{children:`
      :root {
        --me-bg: #07111f;
        --me-panel: #0e1b2a;
        --me-line: #26394d;
        --me-text: #edf6fc;
        --me-muted: #8ea2b6;
        --me-green: #00d68f;
        --me-orange: #ff8a24;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
      }

      .me-page {
        min-height: 100vh;
        color: var(--me-text);
        font-family: Inter, system-ui, sans-serif;
        background-color: var(--me-bg);
        background-image:
          linear-gradient(
            rgba(255, 255, 255, 0.025) 1px,
            transparent 1px
          ),
          linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.025) 1px,
            transparent 1px
          );
        background-size: 44px 44px;
      }

      .me-topbar {
        position: sticky;
        top: 0;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 58px;
        padding: 0 clamp(20px, 5vw, 72px);
        border-bottom: 1px solid var(--me-line);
        background: rgba(7, 17, 31, 0.92);
        backdrop-filter: blur(12px);
        font: 700 10px monospace;
        letter-spacing: 0.08em;
      }

      .me-topbar a,
      .me-footer a,
      .empty-state a {
        color: var(--me-text);
        text-decoration: none;
      }

      .me-topbar a:hover,
      .me-footer a:hover {
        color: var(--me-green);
      }

      .me-topbar span {
        color: var(--me-muted);
      }

      .me-hero {
        display: flex;
        align-items: end;
        justify-content: space-between;
        gap: 32px;
        max-width: 1180px;
        margin: auto;
        padding:
          clamp(70px, 10vw, 130px)
          24px
          58px;
        border-bottom: 1px solid var(--me-line);
      }

      .identity-copy {
        min-width: 0;
      }

      .eyebrow {
        color: var(--me-orange);
        font: 700 10px monospace;
        letter-spacing: 0.14em;
      }

      .me-hero h1 {
        margin: 18px 0 8px;
        font-size: clamp(3rem, 7vw, 6.8rem);
        line-height: 0.94;
        letter-spacing: -0.065em;
      }

      .dzongkha-typewriter {
        display: flex;
        align-items: center;
        min-height: 58px;
        width: fit-content;
        margin: 16px 0;
        color: var(--me-green);
        font-family:
          "Noto Sans Tibetan",
          "Jomolhari",
          sans-serif;
        font-size: clamp(1.5rem, 3vw, 2.4rem);
        line-height: 1.6;
        white-space: nowrap;
      }

      .dzongkha-typewriter i {
        display: inline-block;
        width: 3px;
        height: 1.3em;
        margin-left: 6px;
        background: var(--me-green);
        animation:
          blinkDzongkhaCursor
          0.75s
          step-end
          infinite;
      }

      @keyframes blinkDzongkhaCursor {
        0%,
        50% {
          opacity: 1;
        }

        51%,
        100% {
          opacity: 0;
        }
      }

      .summary {
        color: var(--me-muted);
        line-height: 1.6;
      }

      .identity-status {
        display: flex;
        align-items: center;
        gap: 11px;
        min-width: 220px;
        padding: 14px 16px;
        border:
          1px solid
          rgba(0, 214, 143, 0.42);
        background: rgba(0, 214, 143, 0.06);
      }

      .identity-status > i {
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: var(--me-green);
        box-shadow:
          0 0 0 5px
          rgba(0, 214, 143, 0.12);
      }

      .identity-status div {
        display: grid;
        gap: 4px;
      }

      .identity-status small {
        color: var(--me-muted);
        font: 700 8px monospace;
      }

      .identity-status b {
        color: var(--me-green);
        font: 700 10px monospace;
      }

      .privacy-notice {
        display: flex;
        gap: 18px;
        max-width: 1180px;
        margin: 25px auto 0;
        padding: 15px 18px;
        border:
          1px solid
          rgba(255, 138, 36, 0.4);
        background: rgba(255, 138, 36, 0.06);
        font-size: 0.78rem;
      }

      .privacy-notice strong {
        color: var(--me-orange);
        white-space: nowrap;
      }

      .privacy-notice span {
        color: var(--me-muted);
      }

      .profile-sections {
        max-width: 1180px;
        margin: auto;
        padding: 30px 24px 90px;
      }

      .detail-section {
        display: grid;
        grid-template-columns: 290px 1fr;
        padding: 42px 0;
        border-bottom: 1px solid var(--me-line);
      }

      .detail-section > header {
        display: flex;
        gap: 15px;
        padding-right: 30px;
      }

      .detail-section > header > span {
        display: grid;
        place-items: center;
        flex: 0 0 30px;
        width: 30px;
        height: 30px;
        border: 1px solid var(--me-line);
        border-radius: 50%;
        color: var(--me-orange);
        font: 700 9px monospace;
      }

      .detail-section h2 {
        margin: 1px 0 7px;
        font-size: 1.25rem;
      }

      .detail-section header p {
        margin: 0;
        color: var(--me-muted);
        font-size: 0.78rem;
        line-height: 1.5;
      }

      .detail-section dl {
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin: 0;
        border: 1px solid var(--me-line);
      }

      .detail-section dl div {
        min-width: 0;
        padding: 16px;
        border-right: 1px solid var(--me-line);
        border-bottom: 1px solid var(--me-line);
        background: rgba(14, 27, 42, 0.78);
      }

      .detail-section dl div:nth-child(2n) {
        border-right: 0;
      }

      .detail-section dt {
        margin-bottom: 8px;
        color: var(--me-muted);
        font: 700 9px monospace;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .detail-section dd {
        overflow-wrap: anywhere;
        margin: 0;
        font-size: 0.92rem;
      }

      .me-footer {
        display: flex;
        justify-content: space-between;
        max-width: 1180px;
        margin: auto;
        padding: 28px 24px 50px;
        color: var(--me-muted);
        font: 10px monospace;
      }

      .empty-state {
        display: grid;
        gap: 14px;
        max-width: 700px;
        margin: auto;
        padding: 18vh 24px;
      }

      .empty-state > span {
        color: var(--me-orange);
        font: 700 10px monospace;
      }

      .empty-state h1 {
        margin: 0;
        font-size: clamp(2.4rem, 6vw, 5rem);
      }

      .empty-state p {
        color: var(--me-muted);
      }

      @media (prefers-reduced-motion: reduce) {
        .dzongkha-typewriter i {
          animation: none;
        }
      }

      @media (max-width: 760px) {
        .me-topbar span {
          display: none;
        }

        .me-hero {
          align-items: flex-start;
          flex-direction: column;
        }

        .identity-status {
          width: 100%;
        }

        .dzongkha-typewriter {
          min-height: 48px;
          white-space: normal;
        }

        .privacy-notice {
          align-items: flex-start;
          flex-direction: column;
          margin-inline: 18px;
        }

        .detail-section {
          grid-template-columns: 1fr;
          gap: 22px;
        }

        .detail-section dl {
          grid-template-columns: 1fr;
        }

        .detail-section dl div {
          border-right: 0;
        }

        .me-footer {
          align-items: flex-start;
          flex-direction: column;
          gap: 18px;
        }
      }
    `})}e.s(["default",0,function(){let e=t.citizenDetailsResponse?.citizenDetail?.[0],s=e?[e.firstName,e.middleName,e.lastName].filter(Boolean).join(" "):"",l=e?[e.firstDzoName,e.middleDzoName,e.lastDzoName].filter(Boolean).join(" "):"",d=function(e){let[i,t]=(0,a.useState)(""),[r,n]=(0,a.useState)(!1),o=(0,a.useMemo)(()=>e?"u">typeof Intl&&"Segmenter"in Intl?Array.from(new Intl.Segmenter("bo",{granularity:"grapheme"}).segment(e),e=>e.segment):Array.from(e):[],[e]);return(0,a.useEffect)(()=>{if(!o.length)return;let e="u">typeof Intl&&"Segmenter"in Intl?Array.from(new Intl.Segmenter("bo",{granularity:"grapheme"}).segment(i),e=>e.segment):Array.from(i),a=e.length===o.length,s=0===e.length,l=r?90:150;!r&&a&&(l=1800),r&&s&&(l=600);let d=window.setTimeout(()=>{!r&&a?n(!0):r&&s?n(!1):r?t(e.slice(0,-1).join("")):t(o.slice(0,e.length+1).join(""))},l);return()=>window.clearTimeout(d)},[o,i,r]),i}(l);if(!e)return(0,i.jsxs)("main",{className:"me-page",children:[(0,i.jsxs)("section",{className:"empty-state",children:[(0,i.jsx)("span",{children:"PROFILE / ERROR"}),(0,i.jsx)("h1",{children:"No citizen information found."}),(0,i.jsx)("p",{children:"Make sure citizen.json contains a citizenDetail array with at least one record."}),(0,i.jsx)("a",{href:"/",children:"← Return to portfolio"})]}),(0,i.jsx)(o,{})]});let m=[e.villageName,e.gewogName,e.dzongkhagName].filter(Boolean).join(" · ");return(0,i.jsxs)("main",{className:"me-page",children:[(0,i.jsxs)("header",{className:"me-topbar",children:[(0,i.jsx)("a",{href:"/",children:"CD / DIGITAL SYSTEMS LAB"}),(0,i.jsx)("span",{children:"PERSONAL PROFILE · DO NOT INDEX"})]}),(0,i.jsxs)("section",{className:"me-hero",children:[(0,i.jsxs)("div",{className:"identity-copy",children:[(0,i.jsx)("p",{className:"eyebrow",children:"CITIZEN PROFILE / BHUTAN"}),(0,i.jsx)("h1",{children:s}),l&&(0,i.jsxs)("div",{className:"dzongkha-typewriter","aria-label":l,children:[(0,i.jsx)("span",{"aria-hidden":"true",children:d}),(0,i.jsx)("i",{"aria-hidden":"true"})]}),(0,i.jsxs)("p",{className:"summary",children:[n(e.occupation)," · ",m||"Location not available"]})]}),(0,i.jsxs)("div",{className:"identity-status",children:[(0,i.jsx)("i",{}),(0,i.jsxs)("div",{children:[(0,i.jsx)("small",{children:"RECORD STATUS"}),(0,i.jsx)("b",{children:"PROFILE AVAILABLE"})]})]})]}),(0,i.jsxs)("aside",{className:"privacy-notice",children:[(0,i.jsx)("strong",{children:"Private information"}),(0,i.jsx)("span",{children:"This page contains identification, family, contact and registered-address information."})]}),(0,i.jsx)("div",{className:"profile-sections",children:r.map((a,t)=>(0,i.jsxs)("section",{className:"detail-section",children:[(0,i.jsxs)("header",{children:[(0,i.jsx)("span",{children:String(t+1).padStart(2,"0")}),(0,i.jsxs)("div",{children:[(0,i.jsx)("h2",{children:a.title}),(0,i.jsx)("p",{children:a.description})]})]}),(0,i.jsx)("dl",{children:a.fields.map(([a,t])=>{let r="Cid_Expiry_Date"===a?function(e){if(!e)return"Not available";let i=new Date(e);return Number.isNaN(i.getTime())?e:new Intl.DateTimeFormat("en-GB",{day:"2-digit",month:"long",year:"numeric"}).format(i)}(e[a]):n(e[a]);return(0,i.jsxs)("div",{children:[(0,i.jsx)("dt",{children:t}),(0,i.jsx)("dd",{children:r})]},a)})})]},a.title))}),(0,i.jsxs)("footer",{className:"me-footer",children:[(0,i.jsx)("a",{href:"/",children:"← Return to portfolio"}),(0,i.jsx)("span",{children:"CHOKI DORJI / PERSONAL PROFILE"})]}),(0,i.jsx)(o,{})]})}])}]);