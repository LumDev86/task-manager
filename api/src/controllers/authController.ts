import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const generateToken = (userId: string): string => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET!, { expiresIn: "1h" });
};

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        const user = new User({ email, password });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        const token = generateToken(user.id);
        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
};
