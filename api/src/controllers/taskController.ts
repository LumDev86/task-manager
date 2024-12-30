import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import * as taskService from "../services/taskService";

export const createTask = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description } = req.body;
        const userId = (req as any).user?.id; 
        const newTask = await taskService.createTask(title, userId, description);
        return res.status(201).json(newTask); 
    } catch (error) {
        next(error); // Propaga el error
        return res.status(500).json({ message: "Internal server error" }); 
    }
};

export const getAllTasks = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const userId = (req as any).user?.id; 
        const { completed } = req.query;

        const filter: Record<string, any> = { user: userId }; 
        if (completed !== undefined) {
            filter.completed = completed === "true";
        }

        const tasks = await taskService.getAllTasks(filter);
        return res.status(200).json(tasks); 
    } catch (error) {
        next(error);
        return res.status(500).json({ message: "Internal server error" }); 
    }
};

export const getTaskById = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const userId = (req as any).user?.id; 
        const task = await taskService.getTaskById(req.params.id, userId);

        if (!task) {
            return res.status(404).json({ message: "Task not found or not authorized" });
        }

        return res.status(200).json(task); 
    } catch (error) {
        next(error);
        return res.status(500).json({ message: "Internal server error" }); 
    }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userId = (req as any).user?.id; 
        const task = await taskService.updateTask(req.params.id, req.body, userId);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json(task); 
    } catch (error) {
        next(error);
        return res.status(500).json({ message: "Internal server error" }); 
    }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const userId = (req as any).user?.id; 
        const task = await taskService.deleteTask(req.params.id, userId);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json({ message: "Task deleted successfully" }); 
    } catch (error) {
        next(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};




