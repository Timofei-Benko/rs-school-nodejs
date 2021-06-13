const router = require('express').Router();
import e = require('express');
const User = require('./user.model');
const usersService = require('./user.service');
import IUser = require('./user.interface');

router.route('/').get(async (_req: e.Request, res: e.Response, next: e.NextFunction) => {
  try {
    const users: Array<IUser> = await usersService.getAll();
    res.json(users.map(User.toResponse));
  } catch (err) {
    next(err);
  }
});

router.route('/:id').get(async (req: e.Request, res: e.Response, next: e.NextFunction) => {
  try {
    const user: IUser = await usersService.getUser(req.params['id']);
    res.status(200).send(User.toResponse(user));
  } catch (err) {
    next(err);
  }
});

router.route('/').post(async (req: e.Request, res: e.Response, next: e.NextFunction) => {
  try {
    const user: IUser = await usersService.createUser(User.fromRequest(req.body));
    res.status(201).send(User.toResponse(user));
  } catch (err) {
    next(err);
  }
});

router.route('/:id').put(async (req: e.Request, res: e.Response, next: e.NextFunction) => {
  try {
    const user: IUser = await usersService.updateUser(
        req.params['id'],
        req.body
    );
    res.status(200).send(User.toResponse(user));
  } catch (err) {
    next(err);
  }
});

router.route('/:id').delete(async (req: e.Request, res: e.Response, next: e.NextFunction) => {
  try {
    const user: IUser = await usersService.deleteUser(req.params['id']);
    res.status(204).send(User.toResponse(user));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
