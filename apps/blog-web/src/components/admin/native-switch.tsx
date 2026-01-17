"use client";

import { Switch } from "@/components/ui/switch";
import { useState } from "react";

interface NativeSwitchProps {
  id: string;
  name: string;
  defaultChecked?: boolean;
  onCheckedChange?: (val: boolean) => void;
}

export function NativeSwitch({
  name,
  id,
  defaultChecked = false,
  onCheckedChange,
}: NativeSwitchProps) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <>
      <Switch
        checked={checked}
        onCheckedChange={(val) => {
          setChecked(val);
          onCheckedChange?.(val);
        }}
      />

      {/* 核心：隐藏的 input 负责提交数据 */}
      <input type="hidden" id={id} name={name} value={checked ? "on" : "off"} />
    </>
  );
}
