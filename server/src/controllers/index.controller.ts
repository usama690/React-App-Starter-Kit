import { NextFunction, Request, Response } from 'express';

class IndexController {
  public getAccountDetails = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      return res.status(200).json({ success: true, message: 'Hello from index.js' });
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
