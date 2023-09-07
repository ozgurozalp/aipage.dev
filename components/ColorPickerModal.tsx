import React, { useState } from "react";
import {
  fonts,
  predefinedColors,
  predefinedColorsSecondary,
} from "@/constants";
import { cn } from "@/utils/helpers";
import * as Dialog from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

interface ColorPickerModalProps {
  primaryColor: (typeof predefinedColors)[number] | null;
  secondaryColor: (typeof predefinedColorsSecondary)[number] | null;
  font: string | null;
  layout: string | null;
  onPrimaryColorChange: (color: (typeof predefinedColors)[number]) => void;
  onSecondaryColorChange: (
    color: (typeof predefinedColorsSecondary)[number],
  ) => void;
  onFontChange: (font: string) => void;
  onLayoutChange: (layout: string) => void;
  className?: string;
  children: React.ReactNode;
}

const ColorPickerModal = ({
  onPrimaryColorChange,
  onSecondaryColorChange,
  onFontChange,
  onLayoutChange,
  children,
  className,
}: ColorPickerModalProps) => {
  const [selectedPrimaryColor, setSelectedPrimaryColor] = useState<
    (typeof predefinedColors)[number] | null
  >(null);
  const [selectedSecondaryColor, setSelectedSecondaryColor] = useState<
    (typeof predefinedColorsSecondary)[number] | null
  >(null);
  const [selectedCustomPrimaryColor, setSelectedCustomPrimaryColor] = useState<
    string | null
  >(null);
  const [selectedCustomSecondaryColor, setSelectedCustomSecondaryColor] =
    useState<string | null>(null);
  const [selectedFont, setSelectedFont] = useState<string | null>(null);
  const [selectedLayout, setSelectedLayout] = useState<string | null>(null);

  const layouts = [
    {
      name: "Single Column",
      svg: (
        <svg
          width="48"
          height="48"
          fill="none"
          aria-hidden="true"
          className="text-gray-500"
        >
          <rect
            x="14"
            y="6"
            width="20"
            height="36"
            stroke="currentColor"
            strokeWidth="2"
          ></rect>
        </svg>
      ),
    },
    {
      name: "Zig-Zag",
      svg: (
        <svg
          width="48"
          height="48"
          fill="none"
          aria-hidden="true"
          className="text-gray-500"
        >
          <path
            d="M4,8 L44,8 L4,24 L44,24 L4,40"
            stroke="currentColor"
            strokeWidth="2"
          ></path>
        </svg>
      ),
    },
    {
      name: "F-Layout",
      svg: (
        <svg
          width="48"
          height="48"
          fill="none"
          aria-hidden="true"
          className="text-gray-500"
        >
          <line
            x1="4"
            y1="8"
            x2="44"
            y2="8"
            stroke="currentColor"
            strokeWidth="2"
          ></line>
          <line
            x1="4"
            y1="8"
            x2="4"
            y2="40"
            stroke="currentColor"
            strokeWidth="2"
          ></line>
        </svg>
      ),
    },
    {
      name: "Grid",
      svg: (
        <svg
          width="48"
          height="48"
          fill="none"
          aria-hidden="true"
          className="text-gray-500"
        >
          <rect
            x="4"
            y="4"
            width="20"
            height="20"
            stroke="currentColor"
            strokeWidth="2"
          ></rect>
          <rect
            x="24"
            y="4"
            width="20"
            height="20"
            stroke="currentColor"
            strokeWidth="2"
          ></rect>
          <rect
            x="4"
            y="24"
            width="20"
            height="20"
            stroke="currentColor"
            strokeWidth="2"
          ></rect>
          <rect
            x="24"
            y="24"
            width="20"
            height="20"
            stroke="currentColor"
            strokeWidth="2"
          ></rect>
        </svg>
      ),
    },
    {
      name: "Split Screen",
      svg: (
        <svg
          width="48"
          height="48"
          fill="none"
          aria-hidden="true"
          className="text-gray-500"
        >
          <line
            x1="24"
            y1="4"
            x2="24"
            y2="44"
            stroke="currentColor"
            strokeWidth="2"
          ></line>
        </svg>
      ),
    },
    {
      name: "Magazine",
      svg: (
        <svg
          width="48"
          height="48"
          fill="none"
          aria-hidden="true"
          className="text-gray-500"
        >
          <line
            x1="12"
            y1="4"
            x2="12"
            y2="44"
            stroke="currentColor"
            strokeWidth="2"
          ></line>
          <line
            x1="36"
            y1="4"
            x2="36"
            y2="44"
            stroke="currentColor"
            strokeWidth="2"
          ></line>
        </svg>
      ),
    },
    {
      name: "Fullscreen Photo",
      svg: (
        <svg
          width="48"
          height="48"
          fill="none"
          aria-hidden="true"
          className="text-gray-500"
        >
          <rect
            x="4"
            y="4"
            width="40"
            height="40"
            stroke="currentColor"
            strokeWidth="2"
          ></rect>
        </svg>
      ),
    },
    {
      name: "Asymmetrical",
      svg: (
        <svg
          width="48"
          height="48"
          fill="none"
          aria-hidden="true"
          className="text-gray-500"
        >
          <polygon
            points="4,4 44,12 44,44 4,36"
            stroke="currentColor"
            strokeWidth="2"
          ></polygon>
        </svg>
      ),
    },
  ];

  // handleCustomColorChange will get color and primaryColor or secondaryColor as arguments
  const handleCustomColorChange = (color: string, primaryColor?: string) => {
    if (primaryColor) {
      //setSelectedPrimaryColor(color);
      //onPrimaryColorChange(color);
      setSelectedCustomPrimaryColor(color);
    } else {
      //setSelectedSecondaryColor(color);
      // onSecondaryColorChange(color);
      setSelectedCustomSecondaryColor(color);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0" />
        <Dialog.Content className="fixed bottom-1 left-[50%] max-h-[85vh] w-full md:w-[800px] translate-x-[-50%] bg-white focus:outline-none bg-gradient-to-b shadow-md from-white via-white to-slate-300 py-4 px-6 rounded-lg">
          <div>
            <div className="flex justify-between mb-2">
              <h2 className="text-sm font-semibold">Configuration</h2>
            </div>
            <div className="flex flex-col sm:flex-row">
              <div className="w-full sm:w-1/2 mb-4 sm:mb-0 sm:pr-2">
                <h3 className="font-semibold text-xs mb-2">Primary Color</h3>
                <div className="grid grid-cols-8 gap-2">
                  {predefinedColors.map((color, index) => (
                    <div
                      key={index}
                      className={cn(
                        "h-10 w-10 rounded-lg cursor-pointer",
                        color.code === selectedPrimaryColor?.code
                          ? `shadow-lg transition-transform transform scale-95`
                          : "shadow-md border-b-[1px] border-slate-300 transition-transform transform scale-100 hover:shadow-lg hover:scale-105",
                      )}
                      style={{ backgroundColor: color.code }}
                      onClick={() => {
                        setSelectedPrimaryColor(color);
                        setSelectedCustomPrimaryColor(null);
                        onPrimaryColorChange(color);
                      }}
                    >
                      {color.code === selectedPrimaryColor?.code && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 absolute top-0 right-0 m-1 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M20.25 6.75049L9.75 17.25L4.5 12.0005"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  ))}
                  {/* Custom color input
              <input
                id="style1"
                type="color"
                className={`h-10 w-10 rounded-lg cursor-pointer border-2 border-dashed border-gray-300 border-blue-500 style1
                `}
                value={selectedCustomPrimaryColor || "#ffffff"}
                onChange={(e) => {
                  handleCustomColorChange(e.target.value, "primary");
                }}
              />
              */}
                </div>
              </div>
              <div className="w-full sm:w-1/2 sm:pl-2">
                <h3 className="font-semibold text-xs mb-2">Secondary Color</h3>
                <div className="grid grid-cols-8 gap-2">
                  {predefinedColorsSecondary.map((color, index) => (
                    <div
                      key={index}
                      style={{ backgroundColor: color.code }}
                      className={cn(
                        "h-10 w-10 rounded-lg cursor-pointer",
                        color.className === selectedSecondaryColor?.className
                          ? `shadow-lg transition-transform transform scale-95`
                          : "shadow-md border-b-[1px] border-slate-300 transition-transform transform scale-100 hover:shadow-lg hover:scale-105",
                      )}
                      onClick={() => {
                        setSelectedSecondaryColor(color);
                        setSelectedCustomSecondaryColor(null);
                        onSecondaryColorChange(color);
                      }}
                    >
                      {color.className ===
                        selectedSecondaryColor?.className && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 absolute top-0 right-0 m-1 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M20.25 6.75049L9.75 17.25L4.5 12.0005"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  ))}
                  {/* Custom color input
              <input
                type="color"
                id="style1"
                className={`h-10 w-10 rounded-lg cursor-pointer border-2 border-dashed border-gray-300 ${
                  selectedCustomSecondaryColor ? "border-blue-500" : ""
                } appearance-none`}
                value={selectedCustomSecondaryColor || "#ffffff"}
                onChange={(e) => {
                  handleCustomColorChange(e.target.value);
                }}
              />
              */}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row mt-4">
              <div className="w-full sm:w-1/2 mb-4 sm:mb-0 sm:pr-2">
                <h3 className="font-semibold text-xs mb-2 mt-4">
                  Font Selection
                </h3>
                <div className="flex flex-wrap gap-y-1 gap-x-1 -m-1">
                  {fonts.map((font, index) => (
                    <div
                      key={index}
                      className={cn(
                        "h-6 w-auto rounded-md px-1 py-2 cursor-pointer flex items-center justify-between",
                        font === selectedFont
                          ? "shadow-lg border-inner border-t-[1px] border-l-[1px] border-slate-400"
                          : "shadow-md border-inner border-b-[1px] border-r-[1px] border-slate-300",
                      )}
                      style={{
                        fontFamily: font,
                      }}
                      onClick={() => {
                        setSelectedFont(font);
                        onFontChange(font);
                      }}
                    >
                      <span className="text-xs font-medium">{font}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full sm:w-1/2 sm:pl-2">
                <h3 className="font-semibold text-xs mb-2 mt-2">
                  Layout Selection
                </h3>
                <div className="grid grid-cols-3 lg:grid-cols-4 gap-2">
                  {layouts.map((layout, index) => (
                    <div
                      key={index}
                      className={cn(
                        "h-24 w-full rounded flex items-center justify-center",
                        layout.name === selectedLayout
                          ? "shadow-inner border border-b-0 border-slate-300"
                          : "shadow-md border-b border-slate-300",
                      )}
                      onClick={() => {
                        setSelectedLayout(layout.name);
                        onLayoutChange(layout.name);
                      }}
                    >
                      {layout.svg}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Dialog.Close asChild>
            <button
              className="absolute top-2 right-2 inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none"
              aria-label="Close"
            >
              <XIcon className="text-slate-400 hover:text-slate-600" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ColorPickerModal;
