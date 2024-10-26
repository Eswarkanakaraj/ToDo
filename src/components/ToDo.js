import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import "./ToDo.css";
import Clock from "./Clock";

export default function ToDo() {
  const [task, setTask] = useState(""); // To store input value
  const [tasks, setTasks] = useState([]); // To store list of pending tasks
  const [completedTasks, setCompletedTasks] = useState([]); // To store list of completed tasks

  const handleChange = (e) => {
    setTask(e.target.value); // Update task as the input changes
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    if (task.trim()) {
      setTasks([...tasks, task]); // Add current task to tasks array
      setTask(""); // Clear input field after submitting
    }
  };

  const handleDelete = (indexToRemove) => {
    setTasks(tasks.filter((_, index) => index !== indexToRemove));
  };

  const handleComplete = (indexToComplete) => {
    const completedTask = tasks[indexToComplete]; // Get the completed task
    setTasks(tasks.filter((_, index) => index !== indexToComplete)); // Remove from tasks
    setCompletedTasks([...completedTasks, completedTask]); // Add to completed tasks
  };

  // New function to delete a task from the completed tasks
  const handleDeleteCompleted = (indexToRemove) => {
    setCompletedTasks(completedTasks.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <Container>
        <Row>
          <div className="todo-flex">
            <Col sm={12} lg={12} md={12}>
              <h1>My Day</h1>
              <Clock />
              <br />

              <h2>Tasks</h2>
              {tasks.map((item, index) => (
                <div key={index} className="tasks">
                  <input
                    type="checkbox"
                    onChange={() => handleComplete(index)} // Mark as complete on checkbox click
                  />
                  {index + 1}: {item}
                  <button onClick={() => handleDelete(index)}>delete</button>
                </div>
              ))}

              <h2>Completed Tasks</h2>
              <div className="completed-section">
                {completedTasks.map((item, index) => (
                  <div key={index} className="completed-task">
                    {index + 1}: {item}
                    <button onClick={() => handleDeleteCompleted(index)}>delete</button> {/* Delete button for completed tasks */}
                  </div>
                ))}
              </div>
            </Col>

            <Col sm={12} lg={12} md={12} className="addtask">
              <form onSubmit={handleSubmit}>
                <input type="text" value={task} onChange={handleChange} />
              </form>
            </Col>
          </div>
        </Row>
      </Container>
    </div>
  );
}
