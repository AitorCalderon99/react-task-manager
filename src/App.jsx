import Sidebar from "./components/Sidebar.jsx";
import NoProjectSelected from "./components/Project/NoProjectSelected.jsx";
import {useState} from "react";
import NewProject from "./components/Project/NewProject.jsx";
import SelectedProject from "./components/Project/SelectedProject.jsx";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined, projects: [{
      title: 'Learning React',
      description: "This task is generated for learning and practicing React every day.\n\nLet's go!",
      dueDate: '2025-12-17',
      id: 1
    }], tasks: []
  });
  
  function handleStartAddProject(projectId) {
    setProjectsState(prevState => {
      return {
        ...prevState, selectedProjectId: null
      }
    })
  }
  
  function handleAddProject(newProject) {
    setProjectsState(prevState => {
      const newProjectWithId = {...newProject, id: prevState.projects.length + 1}
      
      return {
        ...prevState, selectedProjectId: newProjectWithId.id, projects: [...prevState.projects, newProjectWithId]
      }
    })
  }
  
  function handleDeleteProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId)
      }
    })
  }
  
  function setSelectedProject(id) {
    setProjectsState(prevState => {
      return {...prevState, selectedProjectId: id}
    })
  }
  
  function handleAddTask(text) {
    setProjectsState(prevState => {
      const newTask = {text, id: prevState.tasks.length + 1, projectId: prevState.selectedProjectId};
      
      return {
        ...prevState, tasks: [newTask, ...prevState.tasks]
      }
    })
  }
  
  function handleDeleteTask(taskId) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => taskId !== task.id)
      }
    })
  }
  
  const selectedProject = projectsState.projects.find(project => projectsState.selectedProjectId === project.id);
  
  let content;
  
  if (projectsState.selectedProjectId === null) {
    content = <NewProject addProject={handleAddProject} onCancel={setSelectedProject}/>;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>;
  } else {
    content = <SelectedProject project={selectedProject}
                               onDeleteProject={handleDeleteProject}
                               onAddTask={handleAddTask}
                               onDeleteTask={handleDeleteTask}
                               tasks={projectsState.tasks}/>
  }
  
  return (<main className="h-screen my-8 flex gap-8">
    <Sidebar onStartAddProject={handleStartAddProject}
             projects={projectsState.projects}
             clickedProject={setSelectedProject}
             selectedProjectId={selectedProject?.id}/>
    {content}
  </main>);
}

export default App;
