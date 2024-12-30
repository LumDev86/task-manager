import mongoose, { Schema, Document } from "mongoose";
import { ITask } from "../interfaces/Task";

const TaskSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: false },
        completed: { type: Boolean, default: false },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
    }
);

export type TaskDocument = ITask & Document;
const Task = mongoose.model<TaskDocument>("Task", TaskSchema);
export default Task;
