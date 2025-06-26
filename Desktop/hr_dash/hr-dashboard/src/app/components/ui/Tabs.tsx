// src/components/ui/Tabs.tsx
"use client";
import { useState } from "react";
import clsx from "clsx";

type Tab = {
  title: string;
  content: React.ReactNode;
};

interface TabsProps {
  tabs: Tab[];
}

export default function Tabs({ tabs }: TabsProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="w-full">
      <div className="flex border-b mb-4">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={clsx(
              "px-4 py-2 text-sm font-medium",
              i === active
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-blue-500"
            )}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div>{tabs[active].content}</div>
    </div>
  );
}
