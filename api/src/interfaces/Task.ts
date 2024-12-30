import mongoose from "mongoose";

export interface ITask {
    title: string;
    description?: string;
    completed: boolean;
    user: mongoose.Types.ObjectId;
    createdAt: Date;
}
