import React, { useState } from 'react';
import './App.css';
import DisplayIcon from './assets/icons/Display.svg';
import DotIcon from './assets/icons/3 dot menu.svg';
import AddIcon from './assets/icons/add.svg';
import BackIcon from './assets/icons/Backlog.svg';
import DoneIcon from './assets/icons/Done.svg';
import InProgIcon from './assets/icons/in-progress.svg';
import TodoIcon from './assets/icons/To-do.svg';
import Card from './components/card';

const App = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [grouping, setGrouping] = useState("Status"); // Default grouping by status
  const [ordering, setOrdering] = useState("Priority");

  const [tasks, setTasks] = useState([
    { id: 'CAM-4', title: 'Add Multi-Language Support', category: 'Feature Request', avatar: 'AS', status: 'todo', priority: '1' },
    { id: 'CAM-2', title: 'Implement Email Notification System', category: 'Feature Request', avatar: 'PS', status: 'in-progress', priority: '2' },
    { id: 'CAM-1', title: 'Update User Profile Page UI', category: 'Feature Request', avatar: 'SS', status: 'backlog', priority: '3' },
    { id: 'CAM-3', title: 'Optimize Database Queries for Performance', category: 'Performance Improvement', avatar: '', status: 'done', priority: '4' },
    { id: 'CAM-7', title: 'Verifying the list', category: 'Performance Improvement', avatar: 'TVS', status: 'done', priority: '0' },
  ]);

  const toggleOptions = () => {
    setShowOptions((prev) => !prev); // Toggle the dropdowns
  };

  // Dynamically get grouped tasks based on the current grouping type
  const getGroupedTasks = (group) => {
    if (group === "Status") {
      // Group tasks by status
      return {
        backlog: tasks.filter((task) => task.status === "backlog"),
        todo: tasks.filter((task) => task.status === "todo"),
        "in-progress": tasks.filter((task) => task.status === "in-progress"),
        done: tasks.filter((task) => task.status === "done"),
      };
    } else if (group === "Priority") {
      // Group tasks by priority levels
      return {
        4: tasks.filter((task) => task.priority === "4"), // Urgent
        3: tasks.filter((task) => task.priority === "3"), // High
        2: tasks.filter((task) => task.priority === "2"), // Medium
        1: tasks.filter((task) => task.priority === "1"), // Low
        0: tasks.filter((task) => task.priority === "0"), // No Priority
      };
    }
  };

  const groupedTasks = getGroupedTasks(grouping);

  return (
    <div>
      <div className="toolbar">
        <div className="display-button">
          <button onClick={toggleOptions}>
            <img src={DisplayIcon} alt="Display Icon" className="icon" /> 
            Display
          </button>
        </div>
        {showOptions && (
          <div className="dropdowns">
            <div className="grouping-dropdown">
              <label htmlFor="grouping">Grouping</label>
              <select
                id="grouping"
                value={grouping}
                onChange={(e) => setGrouping(e.target.value)}
              >
                <option value="Status">Status</option>
                <option value="Priority">Priority</option>
              </select>
            </div>
            <div className="ordering-dropdown">
              <label htmlFor="ordering">Ordering</label>
              <select
                id="ordering"
                value={ordering}
                onChange={(e) => setOrdering(e.target.value)}
              >
                <option value="Priority">Priority</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="columns">
        {/* Dynamically render columns based on grouping */}
        {grouping === "Status" &&
          Object.entries(groupedTasks).map(([status, tasks]) => (
            <div key={status} className="task-column">
              <div className="task-header">
                <h3>
                  {status.charAt(0).toUpperCase() + status.slice(1)} {tasks.length}
                </h3>
                <div className="button-group">
                  <button className="Add">
                    <img src={AddIcon} alt="Add Icon" />
                  </button>
                  <button className="Dot">
                    <img src={DotIcon} alt="Dot Icon" />
                  </button>
                </div>
              </div>
              <div className="tasks-list">
                {tasks.map((task) => (
                  <Card key={task.id} task={task} />
                ))}
              </div>
            </div>
          ))}

        {grouping === "Priority" &&
          Object.entries(groupedTasks).map(([priority, tasks]) => (
            <div key={priority} className="task-column">
              <div className="task-header">
                <h3>
                  {["No Priority", "Low", "Medium", "High", "Urgent"][priority]}{" "}
                  {tasks.length}
                </h3>
                <div className="button-group">
                  <button className="Add">
                    <img src={AddIcon} alt="Add Icon" />
                  </button>
                  <button className="Dot">
                    <img src={DotIcon} alt="Dot Icon" />
                  </button>
                </div>
              </div>
              <div className="tasks-list">
                {tasks.map((task) => (
                  <Card key={task.id} task={task} />
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
