import * as React from 'react';
import './TaskForm.css';
import {TaskFormState} from "./types/TaskFormState";
import { addTask } from "../../store/actions/task-actions";
import {connect} from "react-redux";
import {TaskFormProps} from "./types/TaskFormProps";

class TaskForm extends React.Component<TaskFormProps, TaskFormState> {

    constructor(props: TaskFormProps, context: any) {
        super(props, context);
        this.state = {
            currentTask: "",
            nextTaskId: 0
        }
    }

    public render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="add a task"
                       onChange={this.inputChange} value={ this.state.currentTask }/>
                <button type="submit">Add task</button>
            </form>
            )
    }


    private onAddTask() {
        this.props.onAddTask({
            id: this.state.nextTaskId,
            description: this.state.currentTask
        });
        this.updateStateOnSubmit();
    }

    private updateStateOnSubmit() {
        this.setState({
            currentTask: "",
            nextTaskId: this.state.nextTaskId + 1
        })
    }

    private handleSubmit = (e: React.FormEvent<HTMLFormElement>) :void => {
        e.preventDefault();
        this.onAddTask();
    }


    private inputChange = (e: any) => {
        this.setState({
            currentTask: e.target.value,
        });
    }
}

const mapActionsToProps = {
    onAddTask: addTask
};

export default connect(undefined, mapActionsToProps)(TaskForm);