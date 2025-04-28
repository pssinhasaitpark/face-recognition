import express, { NextFunction, Request, Response } from 'express';
import path from 'path';

const router = express.Router();


router.get('/:name', (req: Request, res: Response, next: NextFunction) => {
    const { type, name } = req.params
    res.sendFile(path.join(__dirname, `../uploads/${name}`,))
});


export default router;