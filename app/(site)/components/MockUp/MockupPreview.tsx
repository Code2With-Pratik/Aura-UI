"use client";

import { useState } from "react";

const tabs = ["Overview", "Activity", "Insights"];

export default function MockupPreview() {
  const [active, setActive] = useState("Overview");
  return (
    <div className="mockup-preview">
      <div className="mockup-preview__bar">
        <span />
        <span />
        <span />
        <b>Aura workspace</b>
      </div>
      <div className="mockup-preview__body">
        <aside>
          <strong>AURA</strong>
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab}
              className={active === tab ? "active" : ""}
              onClick={() => setActive(tab)}
            >
              {tab}
            </button>
          ))}
        </aside>
        <section>
          <p className="mockup-preview__eyebrow">LIVE WORKSPACE</p>
          <h3>{active}</h3>
          <div className="mockup-preview__cards">
            <i />
            <i />
            <i />
          </div>
          <div className="mockup-preview__chart" />
        </section>
      </div>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </div>
  );
}

const styles = `.mockup-preview{width:min(100%,520px);overflow:hidden;border:1px solid rgba(255,255,255,.16);border-radius:16px;background:#111722;color:#e5edf8;box-shadow:0 24px 60px rgba(0,0,0,.25);font:12px/1.4 Inter,system-ui,sans-serif}.mockup-preview__bar{height:34px;display:flex;align-items:center;gap:6px;padding:0 12px;border-bottom:1px solid rgba(255,255,255,.1);background:#1b2432}.mockup-preview__bar span{width:7px;height:7px;border-radius:50%;background:#ff6868}.mockup-preview__bar span:nth-child(2){background:#ffc35d}.mockup-preview__bar span:nth-child(3){background:#6de08a}.mockup-preview__bar b{margin-left:auto;font-size:10px;font-weight:500;color:#8795aa}.mockup-preview__body{display:grid;grid-template-columns:112px 1fr;min-height:218px}.mockup-preview aside{display:flex;flex-direction:column;gap:5px;padding:18px 10px;border-right:1px solid rgba(255,255,255,.08)}.mockup-preview aside strong{padding:0 8px 14px;color:#a5ff75;letter-spacing:.18em;font-size:11px}.mockup-preview aside button{border:0;border-radius:7px;padding:8px;text-align:left;color:#8390a2;background:transparent;cursor:pointer;font:inherit}.mockup-preview aside button:hover,.mockup-preview aside button.active{color:#fff;background:rgba(165,255,117,.13)}.mockup-preview__body section{padding:22px}.mockup-preview__eyebrow{margin:0;color:#7f8da1;font-size:9px;letter-spacing:.15em}.mockup-preview h3{margin:8px 0 18px;font-size:20px}.mockup-preview__cards{display:flex;gap:8px}.mockup-preview__cards i{height:42px;flex:1;border:1px solid rgba(255,255,255,.1);border-radius:8px;background:linear-gradient(135deg,rgba(165,255,117,.24),rgba(255,255,255,.04))}.mockup-preview__chart{height:54px;margin-top:14px;border-radius:9px;background:linear-gradient(145deg,rgba(111,185,255,.24),rgba(165,255,117,.06));}`;
