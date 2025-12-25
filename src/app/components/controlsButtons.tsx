import type React from "react";
import { CgCheckR, CgCloseR } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import Button from "./Button";

type ControlsButtonsProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export default function ControlsButtons({
  className = "",
  ...rest
}: ControlsButtonsProps) {
  return (
    <div
      className={`flex flex-col gap-3 border-t border-white/10 pt-3 ${className}`}
      {...rest}
    >
      <Button
        label="Sound Effects"
        icon={<CgCheckR className="text-3xl" />}
        variant="outlined"
        className="border-0"
      />
      <Button
        label="Music"
        icon={<CgCloseR className="text-3xl" />}
        variant="outlined"
        className="border-0"
      />
      <Button
        label="Visual Settings"
        icon={<IoSettingsOutline />}
        variant="outlined"
        className="border-white/10"
      />
    </div>
  );
}
