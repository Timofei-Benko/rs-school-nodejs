const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
import IUser = require('./user.interface');

router.route('/').get(async (_req, res) => {
  const users: Array<IUser> = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user: IUser = await usersService.getUser(req.params.id)
  res.status(200).send(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const user :IUser = await usersService.createUser(User.fromRequest(req.body));
  res.status(201).send(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user: IUser = await usersService.updateUser(
    req.params.id,
    req.body
  );
  res.status(200).send(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  const user: IUser = await usersService.deleteUser(req.params.id);
  res.status(204).send(User.toResponse(user));
})

module.exports = router;
