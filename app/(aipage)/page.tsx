"use client";
import {
  ChangeEvent,
  CSSProperties,
  FormEvent,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Message, useChat } from "ai/react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import useSearchParams from "@/hooks/useSearchParams";
import RateModal from "@/components/RateModal";
import { cn, updateProject } from "@/utils/helpers";
// @ts-ignore
import partialParse from "partial-json-parser";

import {
  html,
  replaceMenu,
  replaceFeatures,
  replaceIndividualFeatures,
  replaceTestimonials,
  replaceBlog,
  replaceFaqs,
  replaceTeam,
  replaceHero,
  replaceFooter,
} from "@/constants";
import LoadingSpinner from "@/components/loadingSpinner";
import dynamic from "next/dynamic";

const TweetButton = dynamic(() => import("@/components/tweetButton"), {
  ssr: false,
});

enum DeviceSize {
  Mobile = "w-1/2",
  Tablet = "w-3/4",
  Desktop = "w-full",
}

export default function Chat() {
  const {
    stop: stopHeader,
    messages: messagesHeader,
    setInput: setInputHeader,
    handleSubmit: handleSubmitHeader,
    isLoading: isLoadingHeader,
  } = useChat({
    api: "/api/generate/header",
  });

  const {
    stop: stopFooter,
    messages: messagesFooter,
    setInput: setInputFooter,
    handleSubmit: handleSubmitFooter,
    isLoading: isLoadingFooter,
  } = useChat({
    api: "/api/generate/footer",
  });

  const {
    stop: stopHero,
    messages: messagesHero,
    setInput: setInputHero,
    handleSubmit: handleSubmitHero,
    isLoading: isLoadingHero,
  } = useChat({
    api: "/api/generate/hero",
  });

  const {
    stop: stopFeatures,
    messages: messagesFeatures,
    setInput: setInputFeatures,
    handleSubmit: handleSubmitFeatures,
    isLoading: isLoadingFeatures,
  } = useChat({
    api: "/api/generate/features",
  });

  const {
    stop: stopIndividualFeatures,
    messages: messagesIndividualFeatures,
    setInput: setInputIndividualFeatures,
    handleSubmit: handleSubmitIndividualFeatures,
    isLoading: isLoadingIndividualFeatures,
  } = useChat({
    api: "/api/generate/individualFeatures",
  });

  const {
    stop: stopTestimonials,
    messages: messagesTestimonials,
    setInput: setInputTestimonials,
    handleSubmit: handleSubmitTestimonials,
    isLoading: isLoadingTestimonials,
  } = useChat({
    api: "/api/generate/testimonials",
  });

  const {
    stop: stopBlog,
    messages: messagesBlog,
    setInput: setInputBlog,
    handleSubmit: handleSubmitBlog,
    isLoading: isLoadingBlog,
  } = useChat({
    api: "/api/generate/blog",
  });

  const {
    stop: stopFaq,
    messages: messagesFaq,
    setInput: setInputFaq,
    handleSubmit: handleSubmitFaq,
    isLoading: isLoadingFaq,
  } = useChat({
    api: "/api/generate/faq",
  });

  const {
    stop: stopTeam,
    messages: messagesTeam,
    setInput: setInputTeam,
    handleSubmit: handleSubmitTeam,
    isLoading: isLoadingTeam,
  } = useChat({
    api: "/api/generate/team",
  });

  const [input, setInput] = useState("");
  const [show, setShow] = useState(false);
  const [htmlContent, setHtmlContent] = useState(html);
  const { user, setUser } = useAuth();
  const [lastMessageId, setLastMessageId] = useState<string | null>(null);
  const [hasNoCreditsError, setHasNoCreditsError] = useState(false);
  const { set } = useSearchParams();

  const [iframeContent, setIframeContent] = useState("");

  const [deviceSize, setDeviceSize] = useState(DeviceSize.Desktop);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [fileName, setFileName] = useState("");
  const [codeViewActive, setCodeViewActive] = useState(false);
  const [isStopped, setIsStopped] = useState(false);

  const isLoading = [
    isLoadingHeader,
    isLoadingHero,
    isLoadingFooter,
    isLoadingFeatures,
    isLoadingIndividualFeatures,
    isLoadingTestimonials,
    isLoadingBlog,
    isLoadingFaq,
    isLoadingTeam,
  ].some((x) => x);

  const height = useMemo(() => {
    if (!iframeRef.current) return undefined;
    return iframeRef.current.contentDocument?.documentElement?.scrollHeight;
  }, [htmlContent, iframeRef.current]);

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

  useEffect(() => {
    const lastMessage = getLastMessage(messagesFooter);
    if (!lastMessage) return;

    setHtmlContent((prev) =>
      replaceFooter(prev, parsePartial(lastMessage.content)),
    );
    setShow(true);
  }, [messagesFooter]);

  useEffect(() => {
    const lastMessage = getLastMessage(messagesHero);
    if (!lastMessage) return;

    setHtmlContent((prev) =>
      replaceHero(prev, parsePartial(lastMessage.content)),
    );
    setShow(true);
  }, [messagesHero]);

  useEffect(() => {
    const lastMessage = getLastMessage(messagesHeader);
    if (!lastMessage) return;

    setHtmlContent((prev) =>
      replaceMenu(prev, parsePartial(lastMessage.content)),
    );
    setShow(true);
  }, [messagesHeader]);

  useEffect(() => {
    const lastMessage = getLastMessage(messagesBlog);
    if (!lastMessage) return;

    setHtmlContent((prev) =>
      replaceBlog(prev, parsePartial(lastMessage.content)),
    );
    setShow(true);
  }, [messagesBlog]);

  useEffect(() => {
    const lastMessage = getLastMessage(messagesFaq);
    if (!lastMessage) return;

    setHtmlContent((prev) =>
      replaceFaqs(prev, parsePartial(lastMessage.content)),
    );
    setShow(true);
  }, [messagesFaq]);

  useEffect(() => {
    const lastMessage = getLastMessage(messagesFooter);
    if (!lastMessage) return;

    setHtmlContent((prev) =>
      replaceFeatures(prev, parsePartial(lastMessage.content)),
    );
    setShow(true);
  }, [messagesFooter]);

  useEffect(() => {
    const lastMessage = getLastMessage(messagesFeatures);
    if (!lastMessage) return;

    setHtmlContent((prev) =>
      replaceFeatures(prev, parsePartial(lastMessage.content)),
    );
    setShow(true);
  }, [messagesFeatures]);

  useEffect(() => {
    const lastMessage = getLastMessage(messagesIndividualFeatures);
    if (!lastMessage) return;

    setHtmlContent((prev) =>
      replaceIndividualFeatures(prev, parsePartial(lastMessage.content)),
    );
    setShow(true);
  }, [messagesIndividualFeatures]);

  useEffect(() => {
    const lastMessage = getLastMessage(messagesTestimonials);
    if (!lastMessage) return;

    setHtmlContent((prev) =>
      replaceTestimonials(prev, parsePartial(lastMessage.content)),
    );
    setShow(true);
  }, [messagesTestimonials]);

  useEffect(() => {
    const lastMessage = getLastMessage(messagesTeam);
    if (!lastMessage) return;

    setHtmlContent((prev) =>
      replaceTeam(prev, parsePartial(lastMessage.content)),
    );
    setShow(true);
  }, [messagesTeam]);

  useLayoutEffect(() => {
    if (!iframeRef.current?.contentDocument) return;
    requestAnimationFrame(() => {
      iframeRef.current?.contentDocument?.open();
      iframeRef.current?.contentDocument?.write(htmlContent);
      iframeRef.current?.contentDocument?.close();
    });
  }, [htmlContent, iframeRef.current]);

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

  function onFocusHandler() {
    if (!user) {
      set("authModal", "true");
    }
  }

  const handleStop = async () => {
    stopAll();
    setIsStopped(true);
    await saveResult(iframeContent);
  };

  function stopAll() {
    stopHeader();
    stopHero();
    stopFooter();
    stopFeatures();
    stopIndividualFeatures();
    stopTestimonials();
    stopBlog();
    stopFaq();
    stopTeam();
  }

  function handleChange(event: ChangeEvent) {
    const value = (event.target as HTMLInputElement).value;
    setInput(value);
    setInputHero(value);
    setInputHeader(value);
    setInputFeatures(value);
    setInputIndividualFeatures(value);
    setInputTestimonials(value);
    setInputBlog(value);
    setInputFaq(value);
    setInputTeam(value);
    setInputFooter(value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShow(false);
    setHtmlContent(html);
    handleSubmitHero(event);
    handleSubmitHeader(event);
    handleSubmitFeatures(event);
    handleSubmitIndividualFeatures(event);
    handleSubmitTestimonials(event);
    handleSubmitBlog(event);
    handleSubmitFaq(event);
    handleSubmitTeam(event);
    handleSubmitFooter(event);
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
              onChange={user ? handleChange : undefined}
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
              <div className="overscroll-contain flex flex-col flex-1 items-center py-4 w-full">
                <div className={cn(deviceSize, "h-full flex-1 flex flex-col")}>
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
                    </div>
                  </div>
                  <div
                    style={
                      {
                        "--h": `${height}px`,
                      } as CSSProperties
                    }
                    className={cn(
                      "border bg-white rounded-b-xl border-t-0 overflow-auto",
                      height ? "h-[--h]" : "h-[calc(100vh-100px)]",
                    )}
                  >
                    {codeViewActive && <pre>{htmlContent}</pre>}
                    {!codeViewActive && (
                      <iframe
                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                        ref={iframeRef}
                        className={cn(
                          "w-full flex-1 h-full overscroll-contain",
                        )}
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

function parsePartial(data: any) {
  try {
    return partialParse(data);
  } catch {}
}

function getLastMessage(message: Message[]) {
  const lastMessage = message[message.length - 1];
  if (lastMessage && lastMessage.role !== "user") {
    return lastMessage;
  }
}
