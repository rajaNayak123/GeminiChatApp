import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  initializeSocket,
  receiveMessage,
  sendMessage,
} from "../utils/socket.js";
import { userDataContext } from "../context/UserContext.jsx";
const Project = () => {
  const location = useLocation();
  // console.log(location.state);

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(new Set());
  const [project, setProject] = useState(location.state.project);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const { user } = useContext(userDataContext);
  const messageBox = React.createRef();

  const handleUserClick = (id) => {
    // setSelectedUserId([...selectedUserId, id]);
    setSelectedUserId((prevSelectedUserId) => {
      const newSelectedUserId = new Set(prevSelectedUserId);
      if (newSelectedUserId.has(id)) {
        newSelectedUserId.delete(id);
      } else {
        newSelectedUserId.add(id);
      }

      return newSelectedUserId;
    });
  };

  useEffect(() => {
    initializeSocket(project._id);

    receiveMessage("project-message", (data) => {
      console.log("🔵 New message:", data);
      if (data && data.message && data.sender) {
        appendIncomingMessage(data);
      }
    });

    const token = localStorage.getItem("token");

    if (!location?.state?.project?._id) {
      console.error("Project ID is missing");
      return;
    }

    axios
      .get(
        `${import.meta.env.VITE_BASE_URL}/projects/getOneProject/${
          location.state.project._id
        }`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.data) {
          setProject(res.data);
        } else {
          console.error("No project data found:", res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching project:", error);
      });

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/allUsers`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // console.log(res.data);
        setUsers(res.data.users || []);
      })
      .catch((err) => console.error("Error fetching projects:", err));

    return () => {
      socket.off("project-message"); // Clean up when component unmounts
    };
  }, [project._id]);

  function addCollaborators() {
    const token = localStorage.getItem("token");
    axios
      .put(
        `${import.meta.env.VITE_BASE_URL}/projects/add-user-to-project`,
        {
          projectId: location.state.project._id,
          users: Array.from(selectedUserId),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function messaSend(e) {
    e.preventDefault();

    if (!message.trim()) return;

    sendMessage("project-message", {
      message,
      // sender: { email: user.email },
      sender: {
        id: user?._id, // Ensure user ID is sent
        email: user?.email, // Ensure email is included
      },
    });

    // sendMessage("project-message", messageData);
    appendOutgoingMessage(message);

    setMessage("");
  }

  function appendIncomingMessage(messageObject) {
    console.log("Appending Incoming Message:", messageObject);

    if (!messageObject.message) return; // Prevent undefined messages

    const messageBox = document.querySelector(".message-box");
    const message = document.createElement("div");
    message.classList.add(
      "message",
      "max-w-56",
      "flex",
      "flex-col",
      "p-2",
      "bg-slate-50",
      "w-fit",
      "rounded-md"
    );

    message.innerHTML = `<small class='opacity-65 text-xs'>
        ${messageObject.sender?.email || "Unknown"}
      </small>
      <p class='text-sm'>${messageObject.message || "No message content"}</p>`;

    messageBox.appendChild(message);
  }

  function appendOutgoingMessage(messageObject) {
    console.log("Appending Outgoing Message:", messageObject);

    if (!messageObject.message) return; // Prevent undefined messages

    const messageBox = document.querySelector(".message-box");
    const message = document.createElement("div");
    message.classList.add(
      "message",
      "ml-auto",
      "max-w-56",
      "flex",
      "flex-col",
      "p-2",
      "bg-slate-50",
      "w-fit",
      "rounded-md"
    );

    message.innerHTML = `<small class='opacity-65 text-xs'>
      ${messageObject.sender?.email || "Unknown"}
    </small>
    <p class='text-sm'>${messageObject.message || "No message content"}</p>`;

    messageBox.appendChild(message);
  }

  return (
    <main
      className={`h-screen w-screen flex ${
        isModalOpen ? "overflow-hidden" : ""
      }`}
    >
      <section className="left relative flex flex-col h-screen min-w-96 bg-slate-300">
        <header
          className={`flex justify-between items-center p-2 px-4 w-full bg-slate-100 absolute z-10 top-0 transition-all ${
            isModalOpen ? "hidden" : ""
          }`}
        >
          <button
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="flex gap-2 cursor-pointer"
          >
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

        <div className="conversation-area mt-3 pt-14 pb-10 flex-grow flex flex-col h-full relative">
          <div
            ref={messageBox}
            className="message-box p-1 flex-grow flex flex-col gap-1 overflow-auto max-h-full scrollbar-hide"
          >
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
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              className="p-2 px-4 border rounded outline-none ml-2 w-full"
              placeholder="Enter message"
            />
            <button
              onClick={messaSend}
              className="px-5 cursor-pointer rounded bg-slate-950 text-white"
            >
              <i className="ri-send-plane-fill"></i>
            </button>
          </div>
        </div>

        {/* side panel */}
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
              <i className="ri-close-fill text-2xl"></i>
            </button>
          </header>
          {project?.users?.length > 0 ? (
            users.map((user) => (
              <div
                key={user.id}
                className="user cursor-pointer hover:bg-slate-200 p-2 ml-3 mt-2 rounded-2xl w-90 flex gap-2 items-center"
              >
                <div className="aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600">
                  <i className="ri-user-fill absolute"></i>
                </div>
                <h1 className="font-semibold text-lg">{user.email}</h1>
              </div>
            ))
          ) : (
            <p className="p-2 text-gray-500">No collaborators yet.</p>
          )}
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md w-96 max-w-full relative">
            <header className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Select User</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2">
                <i className="ri-close-fill text-2xl cursor-pointer"></i>
              </button>
            </header>
            <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
              {users.map((user) => (
                <div
                  key={user._id}
                  className={`user cursor-pointer rounded-2xl hover:bg-slate-200 ${
                    Array.from(selectedUserId).indexOf(user._id) != -1
                      ? "bg-slate-200"
                      : ""
                  } p-2 flex gap-2 items-center`}
                  onClick={() => {
                    handleUserClick(user._id);
                  }}
                >
                  <div className="aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600">
                    <i className="ri-user-fill absolute"></i>
                  </div>
                  <h1 className="font-semibold text-lg">{user.email}</h1>
                </div>
              ))}
            </div>
            <button
              onClick={addCollaborators}
              className="absolute cursor-pointer bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Add Collaborators
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Project;
