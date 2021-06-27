const router = require('express').Router();
import e = require('express');
const usersService = require('./user.service');
import UserEntity = require('./user.entity');
const User = require('./user.model');

router.route('/').get(async (_req: e.Request, res: e.Response, next: e.NextFunction) => {
  try {
    const users: Array<UserEntity> = await usersService.getAll();
    res.json(users.map(user => User.toResponse(user)));
  } catch (err) {
    next(err);
  }
});

router.route('/:id').get(async (req: e.Request, res: e.Response, next: e.NextFunction) => {
  try {
    const user: UserEntity = await usersService.getUser(req.params['id']);
    res.status(200).json(User.toResponse(user));
  } catch (err) {
    next(err);
  }
});

router.route('/').post(async (req: e.Request, res: e.Response, next: e.NextFunction) => {
  try {
    const user: UserEntity = await usersService.createUser(req.body);
    console.log(user);
    res.status(201).json(User.toResponse(user));
  } catch (err) {
    next(err);
  }
});

router.route('/:id').put(async (req: e.Request, res: e.Response, next: e.NextFunction) => {
  try {
    const user: UserEntity = await usersService.updateUser(
        req.params['id'],
        req.body
    );
    res.status(200).json(User.toResponse(user));
  } catch (err) {
    next(err);
  }
});

router.route('/:id').delete(async (req: e.Request, res: e.Response, next: e.NextFunction) => {
  try {
    const user: UserEntity = await usersService.deleteUser(req.params['id']);
    res.status(204).json(User.toResponse(user));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
