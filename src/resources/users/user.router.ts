const router = require('express').Router();
import e = require('express');
const usersService = require('./user.service');
import UserEntity = require('./user.entity');

router.route('/').get(async (_req: e.Request, res: e.Response, next: e.NextFunction) => {
  try {
    const users: Array<UserEntity> = await usersService.getAll();
    res.json(users.map(user => usersService.getSafeResponse(user)));
  } catch (err) {
    next(err);
  }
});

router.route('/:id').get(async (req: e.Request, res: e.Response, next: e.NextFunction) => {
  try {
    const user: UserEntity = await usersService.getUser(req.params['id']);
    res.status(200).send(usersService.getSafeResponse(user));
  } catch (err) {
    next(err);
  }
});

router.route('/').post(async (req: e.Request, res: e.Response, next: e.NextFunction) => {
  try {
    const user: UserEntity = await usersService.createUser(req.body);
    res.status(201).send(usersService.getSafeResponse(user));
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
    res.status(200).send(usersService.getSafeResponse(user));
  } catch (err) {
    next(err);
  }
});

router.route('/:id').delete(async (req: e.Request, res: e.Response, next: e.NextFunction) => {
  try {
    const user: UserEntity = await usersService.deleteUser(req.params['id']);
    res.status(204).send(usersService.getSafeResponse(user));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
