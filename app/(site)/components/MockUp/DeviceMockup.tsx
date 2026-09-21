"use client";

type DeviceType = "ios" | "macos" | "ipad" | "macbook";

export default function DeviceMockup({
  type,
  wallpaper,
}: {
  type: DeviceType;
  wallpaper: string;
}) {
  const labels = {
    ios: "iOS Mobile",
    macos: "macOS Laptop",
    ipad: "iPad",
    macbook: "MacBook Pro",
  };
  return (
    <div className={`device-mockup device-mockup--${type}`}>
      <div className="device-mockup__screen">
        <img src={wallpaper} alt={`${labels[type]} wallpaper`} />
        <div className="device-mockup__ui">
          <span>{labels[type]}</span>
          <b>09:41</b>
        </div>
      </div>
      {type === "macos" || type === "macbook" ? (
        <div className="device-mockup__base" />
      ) : null}
      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </div>
  );
}

const styles = `.device-mockup{position:relative;display:flex;align-items:center;justify-content:center}.device-mockup__screen{position:relative;overflow:hidden;background:#111;box-shadow:0 24px 45px rgba(0,0,0,.28)}.device-mockup__screen img{width:100%;height:100%;display:block;object-fit:cover}.device-mockup__ui{position:absolute;inset:0;display:flex;justify-content:space-between;align-items:flex-start;padding:12px 14px;color:#fff;font:600 9px/1 system-ui;text-shadow:0 1px 4px rgba(0,0,0,.7)}.device-mockup--ios{padding:6px;border:3px solid #151922;border-radius:32px;background:#252a35}.device-mockup--ios .device-mockup__screen{width:156px;height:318px;border-radius:26px}.device-mockup--ios:before{content:"";position:absolute;z-index:2;top:10px;width:58px;height:15px;border-radius:0 0 12px 12px;background:#111}.device-mockup--macos,.device-mockup--macbook{flex-direction:column}.device-mockup--macos .device-mockup__screen{width:430px;height:252px;border:5px solid #252b36;border-radius:12px}.device-mockup--macbook .device-mockup__screen{width:460px;height:274px;border:5px solid #c6ccd4;border-radius:10px}.device-mockup__base{width:495px;height:12px;border-radius:0 0 18px 18px;background:linear-gradient(#cfd5dc,#7d8792);box-shadow:0 7px 14px rgba(0,0,0,.22)}.device-mockup--ipad{padding:5px;border:3px solid #252b36;border-radius:22px;background:#3a414d}.device-mockup--ipad .device-mockup__screen{width:360px;height:250px;border-radius:13px}@media(max-width:520px){.device-mockup--macos .device-mockup__screen,.device-mockup--macbook .device-mockup__screen{width:calc(100vw - 70px);height:190px}.device-mockup__base{width:calc(100vw - 50px)}.device-mockup--ipad .device-mockup__screen{width:290px;height:200px}}`;
