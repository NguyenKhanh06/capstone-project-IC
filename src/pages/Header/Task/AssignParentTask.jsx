import axios from 'axios';
import React, { useEffect, useState } from 'react';

function AssignParentTask(props) {
    const [open, setOpen] = useState(null);
    const [showCreate, setShowCreate] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [task, setTask] = useState([]);
    const [deadline, setDeadline] = useState(null);
    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("")
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [stateTask, SetStateTask] = useState(0)
    const[staffs, setStaffs] = useState([])
 
    return (
        <div>
            <></>
        </div>
    );
}

export default AssignParentTask;