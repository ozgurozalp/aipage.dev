"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import html2canvas from "html2canvas";
import TweetButton from "@/components/tweetButton";
import { useAuth } from "@/context/AuthContext";
import useSearchParams from "@/hooks/useSearchParams";
import RateModal from "@/components/RateModal";
import { cn, updateProject } from "@/utils/helpers";
import {
  html,
  predefinedColors,
  predefinedColorsSecondary,
  promptKeys,
  functionMap,
} from "@/constants";
import LoadingSpinner from "@/components/loadingSpinner";

enum DeviceSize {
  Mobile = "w-1/2",
  Tablet = "w-3/4",
  Desktop = "w-full",
}

export default function Chat() {
  const [show, setShow] = useState(false);
  const [results, setResults] = useState<object>({});
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [htmlContent, setHtmlContent] = useState(html);
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [primaryColor, setPrimaryColor] = useState(predefinedColors[0]);
  const [secondaryColor, setSecondaryColor] = useState(
    predefinedColorsSecondary[0],
  );
  const [font, setFont] = useState("Inter");
  const [layout, setLayout] = useState("Single Column");
  const { user, setUser } = useAuth();
  const [lastMessageId, setLastMessageId] = useState<string | null>(null);
  const [hasNoCreditsError, setHasNoCreditsError] = useState(false);
  const { set } = useSearchParams();

  const [iframeContent, setIframeContent] = useState("");
  const [imageSrc, setImageSrc] = useState<string>("");

  const [deviceSize, setDeviceSize] = useState(DeviceSize.Desktop);
  const iframeRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");
  const [editingMode, setEditingMode] = useState(false);
  const [codeViewActive, setCodeViewActive] = useState(false);
  const [isStopped, setIsStopped] = useState(false);

  const handleColorModalToggle = () => {
    setIsColorModalOpen((prevState) => !prevState);
  };

  const handlePrimaryColorChange = (color: any) => {
    setPrimaryColor(color);
  };

  const handleSecondaryColorChange = (color: any) => {
    setSecondaryColor(color);
  };

  const handleFontChange = (font: any) => {
    setFont(font);
  };

  const handleLayoutChange = (layout: any) => {
    setLayout(layout);
  };

  function decreaseCredit(by: number = 1) {
    if (user) {
      setUser({ ...user, credits: user.credits - by });
    }
  }

  function setCredits(credits: number) {
    if (user) {
      setUser({ ...user, credits });
    }
  }

  async function saveResult(result: string) {
    const { _id } = await updateProject({
      result,
    });
    setLastMessageId(_id);
    set("rateModal", "true");
  }

  async function sendRequest() {
    setIsLoading(true);
    setShow(false);
    setHtmlContent(html);
    setResults({});

    for (let promptKey of promptKeys) {
      fetch(`/api/generate/${promptKey}`, {
        method: "POST",
        body: JSON.stringify({
          content: input,
        }),
      })
        .then((res) => {
          if (!res.ok) return Promise.reject(res);
          return res.json();
        })
        .then((result) => {
          if (!result[promptKey]) {
            result = {
              [promptKey]: result,
            };
          }

          setResults((prevState) => ({
            ...prevState,
            ...result,
          }));

          const func = functionMap[promptKey];
          if (func && result) {
            setHtmlContent((prev) => func(prev, result));
            setShow(true);
          }
        })
        .catch(console.error);
    }
  }

  useEffect(() => {
    if (!show) return;
    console.log({ results });
  }, [show]);

  useEffect(() => {
    if (!show) return;

    //setHtmlContent(replacedHTML(htmlContent, results as JSONResponse));
  }, [show]);

  const appendToIframe = (content: any) => {
    if (iframeRef.current) {
      const iframeDocument = (iframeRef.current as HTMLIFrameElement)
        .contentDocument;
      if (iframeDocument) {
        const newNode = iframeDocument.createElement("div");
        newNode.innerHTML = content;
        newNode.querySelectorAll<HTMLElement>("*").forEach((element) => {
          element.addEventListener("mouseover", () => {
            element.classList.add("outline-blue"); // Blue border
          });
          element.addEventListener("mouseout", () => {
            element.style.outline = "none";
          });
          element.addEventListener("click", () => {
            setSelectedElement(element);
            setEditedContent(element.innerHTML);
          });
        });
        requestAnimationFrame(() => {
          iframeDocument.body.appendChild(newNode);
        });
      }
    }
  };

  const captureIframeContent = async () => {
    if (iframeRef.current) {
      const iframeDocument = (iframeRef.current as HTMLIFrameElement)
        .contentDocument;
      if (iframeDocument) {
        const canvas = await html2canvas(iframeDocument.body);
        const imgURL = canvas.toDataURL();
        // You can use imgURL as the src for an image tag to display the image representation of the iframe content
        // For simplicity, let's just set it to a state variable
        setImageSrc(imgURL);
      }
    }
  };

  /*
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role !== "user") {
      setIframeContent(lastMessage.content);
    }
  }, [messages]);

   */

  const handleSave = () => {
    const element = document.createElement("a");
    const file = new Blob([iframeContent], { type: "text/html" });
    element.href = URL.createObjectURL(file);
    element.download = fileName || "index.html";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    const completionInput = iframeContent;
  };

  const listenersMap = useRef<
    Map<HTMLElement, { mouseover: () => void; mouseout: () => void }>
  >(new Map());

  // Create a map to store the listeners for each element

  const handleEdit = () => {
    if (editingMode) {
      // Save the updated iframe content
      if (iframeRef.current) {
        const iframeDocument = (iframeRef.current as HTMLIFrameElement)
          .contentDocument;
        if (iframeDocument) {
          setIframeContent(iframeDocument.documentElement.innerHTML);
        }
      }

      // Disable editing mode by setting the contentEditable property of all elements to false and remove the event listeners
      if (iframeRef.current) {
        const iframeDocument = (iframeRef.current as HTMLIFrameElement)
          .contentDocument;
        if (iframeDocument) {
          iframeDocument
            .querySelectorAll<HTMLElement>("*")
            .forEach((element) => {
              element.contentEditable = "false";

              // Get the listeners for the element from the map
              const listeners = listenersMap.current.get(element);
              if (listeners) {
                // Remove the listeners
                element.removeEventListener("mouseover", listeners.mouseover);
                element.removeEventListener("mouseout", listeners.mouseout);
                // Remove the element from the map
                listenersMap.current.delete(element);
              }
            });
        }
      }
    } else {
      // Enable editing mode by setting the contentEditable property of all elements to true and add event listeners
      if (iframeRef.current) {
        const iframeDocument = (iframeRef.current as HTMLIFrameElement)
          .contentDocument;
        if (iframeDocument) {
          iframeDocument
            .querySelectorAll<HTMLElement>("*")
            .forEach((element) => {
              element.contentEditable = "true";

              // Create the event listeners
              const mouseoverListener = () => {
                element.classList.add("outline-blue");
                console.log("Mouseover event fired");
              };
              const mouseoutListener = () => {
                console.log("Mouseout event fired");
                element.classList.remove("outline-blue");
              };

              // Add the listeners to the element
              element.addEventListener("mouseover", mouseoverListener);
              element.addEventListener("mouseout", mouseoutListener);

              // Store the listeners in the map
              listenersMap.current.set(element, {
                mouseover: mouseoverListener,
                mouseout: mouseoutListener,
              });
            });
        }
      }
    }

    setEditingMode(!editingMode);
  };

  const handleUpdate = () => {
    if (selectedElement) {
      selectedElement.innerHTML = editedContent;
      setSelectedElement(null);
      setEditedContent("");
      if (iframeRef.current) {
        const iframeDocument = (iframeRef.current as HTMLIFrameElement)
          .contentDocument;
        if (iframeDocument) {
          setIframeContent(iframeDocument.documentElement.innerHTML);
        }
      }
    }
  };

  function onFocusHandler() {
    if (!user) {
      set("authModal", "true");
    }
  }

  const handleStop = async () => {
    stop();
    setIsStopped(true);
    await saveResult(iframeContent);
  };

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    sendRequest();
  }

  return (
    <>
      <div className="flex flex-col w-full min-h-screen bg-gradient-to-b from-white via-white to-slate-300 mx-auto px-4 md:px-16 lg:px-24 overflow-hidden items-center pt-24 md:pt-36">
        <section>
          <div className="fixed bottom-16 right-6 cursor-pointer transition-colors group">
            <div className="tooltip opacity-0 group-hover:opacity-100 bg-gray-700 text-white text-xs rounded py-1 px-2 absolute right-8 bottom-4 transform translate-y-2 w-64">
              Help spread the word! 📢 Post a tweet of your creation on Twitter
              and tag @aipagedev for early access to our exclusive beta—packed
              with stunning features. 🚀
            </div>
            <TweetButton />
          </div>
        </section>

        {/* Display the image if imageSrc is set */}

        <section>
          <div className="fixed bottom-6 right-6 cursor-pointer transition-colors group">
            <div className="tooltip opacity-0 group-hover:opacity-100 bg-gray-700 text-white text-xs rounded py-1 px-2 absolute  right-8 bottom-4 transform translate-y-2 w-48">
              Star us on Github to show your support
            </div>
            <a
              href="https://github.com/zinedkaloc/aipage.dev"
              target="_blank"
              rel="noreferrer"
              className="text-2xl"
            >
              ⭐️
            </a>
          </div>
        </section>

        {isLoading ? null : (
          <div className="relative py-6 flex flex-col justify-center">
            <Image
              src="/logoa.png"
              alt="AIPage.dev logo"
              width={200}
              height={200}
              className="mx-auto h-32 w-32"
            />
            <div className="text-center sm:w-11/12 md:w-[800px]">
              <h1 className="text-5xl font-bold text-ellipsis tracking-tight">
                Create landing page easily{" "}
                <span className="font-normal">with ai</span>
              </h1>
              <p className="text-lg text-gray-700 mt-4 tracking-tight">
                Experience the future of web design. With ai, creating a landing
                page is not only easy but also efficient, precise, and tailored
                to your needs.
              </p>
            </div>
          </div>
        )}
        <div className="flex flex-col w-full justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="mb-4 w-full sm:w-11/12 md:w-[800px] mx-auto"
          >
            <input
              className={`w-full p-2 mb-3  focus:outline-0 focus:shadow-lg focus:border-gray-400 transition-shadow border rounded-full text-ellipsis border-gray-300 px-4 ${
                isLoading ? "rounded-xl" : "shadow-sm"
              }`}
              value={input}
              // update placeholder when the GPT is typing
              placeholder={isLoading ? "Generating... " : "Say something..."}
              onChange={user ? (e) => setInput(e.target.value) : undefined}
              onFocus={onFocusHandler}
              readOnly={!user}
              disabled={isLoading}
            />
            <div className="flex justify-between">
              {isLoading ? null : (
                <p className="text-xs ml-4 font-medium text-gray-500">
                  <b>Tip:</b> A landing page for Medical website
                </p>
              )}
            </div>
          </form>
        </div>

        {editingMode && selectedElement && (
          <div className="absolute z-50">
            <p>Edit the selected element:</p>
            <input
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <button onClick={handleUpdate}>Update</button>
          </div>
        )}

        {hasNoCreditsError ? (
          <div className="flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 100 100"
            >
              <polygon points="50,15 85,85 15,85" fill="#FF6B6B" />
              <text
                x="50"
                y="75"
                fontSize="40"
                fontWeight="bold"
                textAnchor="middle"
                fill="#FFFFFF"
              >
                !
              </text>
            </svg>
            <h1 className="text-3xl text-gray-800 mb-2">No Credits</h1>
            <p className="text-gray-600 mb-6">
              You do not have enough credits to proceed with this request today.
              Please try again tomorrow.
            </p>
          </div>
        ) : (
          <>
            {isLoading && !show && <LoadingSpinner />}
            {show && (
              <div className="flex flex-col items-center py-4 w-full">
                <div className={cn(deviceSize)}>
                  <div className="border flex items-center bg-white rounded-t-xl justify-between p-3 border-b lg:px-12 sticky top-4 z-10">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex-1 text-center">
                      <div className="flex items-center justify-between space-x-2 bg-gray-200 rounded-xl mx-8 py-1 px-2">
                        <div className="flex items-center w-3 h-3"></div>
                        <div className="flex items-center space-x-2">
                          acme.co
                          {isLoading && (
                            <span className="ml-4 animate-spin">🟠</span>
                          )}
                          <button
                            className="ml-4 hidden md:flex"
                            onClick={() => setDeviceSize(DeviceSize.Mobile)}
                          >
                            📱
                          </button>
                          <button
                            className=" hidden md:flex"
                            onClick={() => setDeviceSize(DeviceSize.Tablet)}
                          >
                            💻
                          </button>
                          <button
                            className=" hidden md:flex"
                            onClick={() => setDeviceSize(DeviceSize.Desktop)}
                          >
                            🖥️
                          </button>
                          <button
                            className=""
                            onClick={() => setCodeViewActive(!codeViewActive)}
                          >
                            {codeViewActive ? "🖼️" : "🖨️"}
                          </button>
                        </div>
                        {/* Clear and Stop buttons */}
                        <div className="flex items-center space-x-4">
                          <button
                            className={`${
                              isLoading ? "" : "opacity-70 cursor-not-allowed"
                            }`}
                            onClick={handleStop}
                          >
                            <span role="img" aria-label="stop">
                              🟥
                            </span>
                          </button>
                          <button
                            className={`${
                              isStopped ? "" : "opacity-70 cursor-not-allowed"
                            }`}
                            onClick={() => {
                              setIframeContent("");
                              setIsStopped(false);
                            }}
                          >
                            <span role="img" aria-label="clear">
                              🧽
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div></div>
                    <div className="flex justify-end space-x-4">
                      <button onClick={handleSave}>
                        <span role="img" aria-label="paper-plane">
                          📩
                        </span>
                      </button>
                      {!isLoading && iframeContent && (
                        <button onClick={handleEdit} className="ml-4">
                          {editingMode ? "💾" : "✏️"}
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="border bg-white rounded-b-xl border-t-0 h-[calc(100vh-100px)] overflow-auto">
                    {codeViewActive && <pre>{htmlContent}</pre>}
                    {!codeViewActive && (
                      <iframe
                        ref={iframeRef}
                        sandbox="allow-same-origin allow-scripts"
                        className="w-full h-full"
                        srcDoc={htmlContent}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <RateModal key={lastMessageId} show={!!lastMessageId} />
    </>
  );
}
