import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import "./ToDo.css";
import Clock from "./Clock";
import Accordion from "react-bootstrap/Accordion";
import { FaTrash } from "react-icons/fa";

import { IoIosAddCircleOutline } from "react-icons/io";

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
    setCompletedTasks(
      completedTasks.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div>
      <Container>
        <Row>
          <div className="todo-flex">
            <Col sm={12} lg={12} md={12}>
          <br/>
           
              <h1>My Day</h1>
              
              <Clock />
            <br/>

              {tasks.map((item, index) => (
                <div key={index} className="tasks">
                  <div>
                  <button
                   onClick={() => handleComplete(index)} // Mark as complete on checkbox click
                  > <IoIosAddCircleOutline className="complete" /></button>
                  {index + 1}: {item}
                  </div>
                  <button onClick={() => handleDelete(index)}> <FaTrash />
                  </button>
                </div>
                
              ))}

              <br />

              <div className="completed-section">
                <Accordion defaultActiveKey="0" flush className="accordian">
                  <Accordion.Item eventKey="0" className="accordion-item">
                    <Accordion.Header className="accordion-header"  >Completed Tasks</Accordion.Header>
                    <Accordion.Body className="accordian-body">
                      {completedTasks.map((item, index) => (
                     
                        <div key={index} className="completed-task" style={{color:"white" ,opacity:"0.7",textDecoration:"line-through" }}>
                          {index + 1}: {item}
                          <button onClick={() => handleDeleteCompleted(index)}>
                          <FaTrash />
                          </button>{" "}
                          {/* Delete button for completed tasks */}
                        </div>
                        
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </Col>

            <Col sm={12} lg={12} md={12} className="addtask">
              <form onSubmit={handleSubmit}>
                <input
                placeholder="+ Add Task "
                  type="text"
                  value={task}
                  onChange={handleChange}
                  required
                />
              </form>
            </Col>
          </div>
        </Row>
      </Container>
    </div>
  );
}
