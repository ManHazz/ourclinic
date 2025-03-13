import { useRef, useEffect, useState } from "react";

const allTabs = [
  { id: "doctors", name: "Doctors" },
  { id: "nurses", name: "Nurses" },
  { id: "receptionists", name: "Receptionists" },
];

const SlidingTabBar = ({ activeTab, setActiveTab }) => {
  const tabsRef = useRef([]);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  useEffect(() => {
    const activeIndex = allTabs.findIndex((tab) => tab.id === activeTab);
    if (activeIndex === -1) return;

    const setTabPosition = () => {
      const currentTab = tabsRef.current[activeIndex];
      if (currentTab) {
        setTabUnderlineLeft(currentTab.offsetLeft);
        setTabUnderlineWidth(currentTab.clientWidth);
      }
    };

    setTabPosition();
  }, [activeTab]);

  return (
    <div className="flew-row relative mx-auto flex h-12 rounded-3xl border border-black/40 bg-neutral-800 px-2 backdrop-blur-sm">
      <span
        className="absolute bottom-0 top-0 -z-10 flex overflow-hidden rounded-3xl py-2 transition-all duration-300"
        style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
      >
        <span className="h-full w-full rounded-3xl bg-gray-200/30" />
      </span>
      {allTabs.map((tab, index) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={index}
            ref={(el) => (tabsRef.current[index] = el)}
            className={`${
              isActive ? `` : `hover:text-neutral-300`
            } my-auto cursor-pointer select-none rounded-full px-4 text-center font-light text-white`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.name}
          </button>
        );
      })}
    </div>
  );
};

export default SlidingTabBar;
