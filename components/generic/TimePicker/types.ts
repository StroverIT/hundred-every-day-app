import React from "react";

export type TimePickerProps = {
  showPicker: boolean;
  setShowPicker: React.Dispatch<React.SetStateAction<boolean>>;
  submitTimerHandler: (time: string) => void;
};
