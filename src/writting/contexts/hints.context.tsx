import { Hint } from "../models/writting.test.model";
import { createContext, useContext, useState } from "react";

export interface HintContextType {
  hints: Hint[];
  setHints: (hints: Hint[]) => void;
  currentHint: Hint | null;
  useHint: (index: number) => void;
  resetContext: () => void;
  resetCurrentHint: () => void;
}

const HintContext = createContext<HintContextType | undefined>(undefined);

export const HintProvider = ({ children }: { children: React.ReactNode }) => {
  const [hints, setHints] = useState<Hint[]>([]);
  const [currentHint, setCurrentHint] = useState<Hint | null>(null);

  const useHint = (index: number) => {
    if (index < 0 || index >= hints.length) {
      return;
    }
    console.log("Using hint at index:", index);
    const hint = hints[index];
    setCurrentHint(hint);
  };

  const resetContext = () => {
    setCurrentHint(null);
    setHints([]);
  };

  const resetCurrentHint = () => {
    setCurrentHint(null);
  };

  const value = {
    hints,
    setHints,
    currentHint,
    useHint,
    resetContext,
    resetCurrentHint,
  };

  return <HintContext.Provider value={value}>{children}</HintContext.Provider>;
};

export const useHintContext = () => {
  const context = useContext(HintContext);
  if (context === undefined) {
    throw new Error("useHintContext must be used within a HintProvider");
  }
  return context;
};
