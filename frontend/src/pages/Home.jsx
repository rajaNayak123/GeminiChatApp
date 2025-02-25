import React, { useState, useContext, useEffect } from "react";
// import { userDataContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Home = () => {
  // const { user } = useContext(userDataContext);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();

  function createProject(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found! User might not be authenticated.");
      return;
    }

    const newdata = { name: projectName };
    // console.log(newdata);

    axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/projects/create-project`,
        newdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setIsModelOpen(false);
        setProjectName("");
      })
      .catch((error) => {
        console.error(
          "Error creating project:",
          error.response?.data || error.message
        );
      });

    setProjectName("");
  }

  // a loggdin user is allowed to see all the projects
  useEffect(() => {
    const token = localStorage.getItem("token"); // Get token from storage
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/projects/all-projects`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setProjects(res.data);
      })
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  return (
    <main className="p-10 h-screen bg-gray-900">
      <div className="projects">
        <button
          onClick={() => {
            setIsModelOpen(true);
          }}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 text-white font-semibold text-lg bg-blue-500 border-2 border-blue-500 rounded-lg transition duration-200 ease-in-out hover:bg-blue-700 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
              fill="currentColor"
            ></path>
          </svg>
          Create project
        </button>

        {/* <div>
          <h2>All Projects</h2>
          {projects.length === 0 ? (
            <p>No projects found</p>
          ) : (
            <ul>
              {projects.map((project) => (
                <li key={project._id}>{project.name}</li>
              ))}
            </ul>
          )}
        </div> */}

        {projects.map((project) => (
          <div
            key={project._id}
            onClick={() => {
              navigate(`/project`, {
                state: { project },
              });
            }}
            className="project mt-8 flex flex-col gap-3 cursor-pointer p-4 border border-slate-300 rounded-md min-w-52 hover:bg-blue-400"
          >
            <h4 className="font-semibold text-white text-xl">
              {project.name}
            </h4>

            <div className="flex items-center justify-start gap-2  text-blue-50">
              <p>
                {" "}
                <small>
                  {" "}
                  <i class="ri-user-3-line text-xl"></i> Collaborators
                </small>{" "}
                :
              </p>
              {project.users.length}
            </div>
          </div>
        ))}
      </div>

      {isModelOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-1/3">
            <h2 className="text-2xl mb-4">Create New Project</h2>
            <form onSubmit={createProject}>
              <div className="mb-4">
                <div className="flex flex-col gap-1">
                  <label className="mb-1">Project Name</label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => {
                      setProjectName(e.target.value);
                    }}
                    placeholder="Enter your project name"
                    required
                    className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-600 placeholder-opacity-50"
                  />
                </div>
              </div>
              <div className="flex justify-between gap-4">
                <button
                  onClick={() => {
                    setIsModelOpen(false);
                  }}
                  type="submit"
                  className="w-full p-3 mt-7 cursor-pointer text-white bg-red-600 rounded-md shadow-md hover:bg-red-400 active:scale-95 transition"
                >
                  Cancle
                </button>
                <button
                  type="submit"
                  className="w-full p-3 mt-7 cursor-pointer text-white bg-green-600 rounded-md shadow-md hover:bg-green-400 active:scale-95 transition"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
