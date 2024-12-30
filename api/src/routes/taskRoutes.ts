import express from "express";
import { body } from "express-validator";
import asyncHandler from "../utils/asyncHandler";
import { protect } from "../middlewares/authMiddleware"; 
import { createTask, getAllTasks, getTaskById, updateTask, deleteTask } from "../controllers/taskController";

const router = express.Router();

const validateTask = [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").optional().isString().withMessage("Description must be a string"),
];

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: CRUD operations for tasks
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the task
 *               description:
 *                 type: string
 *                 description: The description of the task
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Bad request (validation errors)
 *       500:
 *         description: Server error
 */
router.post("/tasks", protect, validateTask, asyncHandler(createTask)); 

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []  
 *     parameters:
 *       - in: query
 *         name: completed
 *         required: false
 *         schema:
 *           type: string
 *           enum: [true, false]
 *           description: Filter tasks by completion status
 *     responses:
 *       200:
 *         description: A list of tasks
 *       500:
 *         description: Server error
 */
router.get("/tasks", protect, asyncHandler(getAllTasks)); 

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task details
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.get("/tasks/:id", protect, asyncHandler(getTaskById)); 

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.put("/tasks/:id", protect, asyncHandler(updateTask)); 

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.delete("/tasks/:id", protect, asyncHandler(deleteTask)); 

export default router;


