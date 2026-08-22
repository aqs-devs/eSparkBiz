import { getUsersService, getUserByIdService } from './service.js';
import type { Request, Response } from 'express';

export async function list(req: Request, res: Response) {
  const users = await getUsersService();
  res.json(users);
}

export async function show(req: Request, res: Response) {
  const id = Number(req.params['id']);
  const user = await getUserByIdService(id);
  res.json(user);
}
