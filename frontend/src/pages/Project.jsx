import React, { useState } from "react";
import { useLocation } from "react-router-dom";
const Project = () => {
  const location = useLocation();
  console.log(location.state);

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  return (
    <main className="h-screen w-screen flex">
      <section className="left relative flex flex-col h-screen min-w-96 bg-slate-300">
        <header className="flex justify-between items-center p-2 px-4 w-full bg-slate-100 absolute z-10 top-0">
          <button className="flex gap-2">
            <i className="ri-add-fill mr-1"></i>
            <p>Add collaborator</p>
          </button>
          <button
            onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
            className="p-2 cursor-pointer"
          >
            <i className="ri-group-fill"></i>
          </button>
        </header>

        <div className="conversation-area pt-14 pb-10 flex-grow flex flex-col h-full relative">
          <div className="message-box p-1 flex-grow flex flex-col gap-1 overflow-auto max-h-full scrollbar-hide">
            <div className="message flex flex-col p-2 bg-slate-50 w-fit rounded-md">
              <small className="opacity-65 text-xs">test@gmail.com</small>
              <p>hello world lorem</p>
            </div>
            <div className="message max-w-56 ml-auto flex flex-col p-2 bg-slate-50 w-fit rounded-md">
              <small className="opacity-65 text-xs">test@gmail.com</small>
              <p>hello world</p>
            </div>
          </div>
          <div className="inputField w-full gap-1 flex absolute bottom-2">
            <input
              type="text"
              className="p-2 px-4 border rounded outline-none ml-2 w-full"
              placeholder="Enter message"
            />
            <button className="px-5 cursor-pointer rounded bg-slate-950 text-white">
              <i className="ri-send-plane-fill"></i>
            </button>
          </div>
        </div>

        <div
          className={`sidePanel w-full h-[calc(100%-52px)] flex flex-col gap-2 bg-slate-50 absolute transition-all ${
            isSidePanelOpen ? "translate-x-0" : "-translate-x-full"
          } top-0 z-10`}
        >
          <header className="flex justify-between items-center px-4 p-2 bg-slate-200">
            <h1 className="font-semibold text-lg">Collaborators</h1>
            <button
              onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
              className="p-2 cursor-pointer"
            >
              <i className="ri-close-fill"></i>
            </button>
          </header>
          <div className="users flex flex-col gap-2">
            <div className="user cursor-pointer hover:bg-slate-200 p-2 ml-3 mt-2 rounded-2xl w-90 flex gap-2 items-center">
              <div className="aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600">
                <i className="ri-user-fill absolute"></i>
              </div>
              <h1 className="font-semibold text-lg">@gmail.com</h1>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Project;
