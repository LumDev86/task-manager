import Task from "../models/Task";

export const createTask = async (title: string, userId: string, description?: string) => {
    try {
        return await Task.create({ title, description, user: userId });
    } catch (error) {
        throw new Error("Error creating task");
    }
};

export const getAllTasks = async (filter: Record<string, any> = {}) => {
    try {
        return await Task.find(filter).populate("user", "name email"); 
    } catch (error) {
        throw new Error("Error fetching tasks");
    }
};

export const getTaskById = async (id: string, userId: string) => {
    try {
        return await Task.findOne({ _id: id, user: userId }).populate("user", "name email");
    } catch (error) {
        throw new Error("Error fetching task");
    }
};

export const updateTask = async (id: string, updates: Record<string, any>, userId: string) => {
    const task = await Task.findById(id);
    if (!task) {
        throw new Error("Task not found");
    }

    if (task.user.toString() !== userId) {
        throw new Error("Not authorized to update this task");
    }

    try {
        return await Task.findByIdAndUpdate(id, updates, { new: true });
    } catch (error) {
        throw new Error("Error updating task");
    }
};

export const deleteTask = async (id: string, userId: string) => {
    const task = await Task.findById(id);
    if (!task) {
        throw new Error("Task not found");
    }

    if (task.user.toString() !== userId) {
        throw new Error("Not authorized to delete this task");
    }

    try {
        return await Task.findByIdAndDelete(id);
    } catch (error) {
        throw new Error("Error deleting task");
    }
};


