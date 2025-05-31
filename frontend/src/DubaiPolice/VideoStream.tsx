import { useEffect, useRef, useState } from "react";
import { BiSolidErrorCircle } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { LuMessageSquareText } from "react-icons/lu";
import { PiListDashesBold } from "react-icons/pi";
import ReactPlayer from "react-player";

const cameras = [
    {
        id: 1,
        name: "Camera 1",
        url: "https://www.facebook.com/braiytai/videos/alpr-system/437481416905659",
    },
    {
        id: 2,
        name: "Camera 2",
        url: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4",
    },
    {
        id: 3,
        name: "Camera 3",
        url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    },
    {
        id: 4,
        name: "Camera 4",
        url: "https://www.facebook.com/braiytai/videos/alpr-system/437481416905659",
    },
    {
        id: 5,
        name: "Camera 5",
        url: "https://www.youtube.com/watch?v=mN0zPOpADL4&t=60s",
        type: "video",
    },
    {
        id: 6,
        name: "Camera 6",
        url: "https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4",
        type: "video",
    },
];

const VideoStream = () => {
    const [showSidebar, setShowSidebar] = useState(true);
    const [toggleMsg, settoggleMsg] = useState(true);
    const [toggleLogs, settoggleLogs] = useState(true);
    const [input, setInput] = useState("");

    const textareaRef = useRef(null);
    const adjustHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            const newHeight = textareaRef.current.scrollHeight;
            const maxHeight =
                5 * parseFloat(getComputedStyle(textareaRef.current).lineHeight);
            textareaRef.current.style.height = `${Math.min(newHeight, maxHeight)}px`;
        }
    };
    useEffect(() => {
        adjustHeight();
    }, []);
    useEffect(() => {
        adjustHeight();
    }, [input]);
    return (
        <div className="flex h-screen bg-gray-900 text-white">
            {/* Sidebar */}
            <div className="p-4 flex gap-3 flex-col text-lg">
                <LuMessageSquareText
                    className="cursor-pointer"
                    onClick={() => settoggleMsg(!toggleMsg)}
                />
                <PiListDashesBold
                    className="cursor-pointer"
                    onClick={() => settoggleLogs(!toggleLogs)}
                />
                <span>
                    {showSidebar ? (
                        <IoIosArrowForward
                            className="cursor-pointer"
                            onClick={() => setShowSidebar(false)}
                        />
                    ) : (
                        <IoIosArrowBack
                            className="cursor-pointer"
                            onClick={() => setShowSidebar(true)}
                        />
                    )}
                </span>
            </div>
            {showSidebar && (
                <div className="w-1/4 p-4 bg-gray-800 overflow-auto">
                    {toggleMsg && (
                        <div>
                            <h2 className="text-xl font-bold mb-4">Messages</h2>
                            <div className="space-y-2">
                                <div className="bg-gray-700 p-2 rounded">
                                    Person is walking not by the pedestrian zebra
                                </div>
                                <div className="bg-gray-700 p-2 rounded">
                                    Operator 2 [CAM 4]: red truck is ready to go
                                </div>
                                <div className="bg-gray-700 p-2 rounded">
                                    Operator 2 [CAM 2]: truck is out of the parking area!
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="mt-4 w-full relative">
                        <textarea
                            id="texarea-input"
                            name="texarea-input"
                            ref={textareaRef}
                            className="p-3 rounded-md resize-none w-full bg-gray-900"
                            placeholder="Type anything"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button
                            className="mt-4 absolute right-5 bottom-7 text-center text-white py-1 px-2 rounded-md hover:bg-blue-700 transition"
                        // onClick={handleSubmit}
                        >
                            ➤
                        </button>
                    </div>
                    {toggleLogs && (
                        <div>
                            <h2 className="text-xl font-bold mt-6">Logs</h2>
                            <pre className="bg-gray-700 p-2 rounded text-sm">
                                vehicles: 25{"\n"}
                                [10:59:43] Camera 5, People: 1{"\n"}
                                [10:59:48] Camera 6, Total vehicles: 26
                            </pre>
                        </div>
                    )}
                </div>
            )}

            {/* Camera Grid */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
                {cameras.map((camera) => (
                    <div
                        key={camera.id}
                        className="relative bg-black p-2 rounded-lg border border-gray-700"
                    >
                        <span className="absolute top-2 left-2 flex z-20 items-center justify-between w-full px-7 py-1">
                            <h3 className=" bg-gray-700 px-2 rounded ">{camera.name}</h3>
                            <BiSolidErrorCircle className="text-xl" />
                        </span>
                        <ReactPlayer
                            url={camera.url}
                            playing={true}
                            // controls={true}
                            width="100%"
                            height="320px"
                            style={{
                                objectFit: "contain",
                                overflow: "hidden",
                            }}
                            muted={true}
                            loop={true}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoStream;
