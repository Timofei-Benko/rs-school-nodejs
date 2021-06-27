const { getRepository } = require('typeorm');
import TaskEntity = require('./task.entity');

const getAll = async (): Promise<Array<TaskEntity | undefined>> => {
  const taskRepository = getRepository(TaskEntity);
  return taskRepository.find();
};

const getTask = async (id: string): Promise<TaskEntity | undefined> => {
  const taskRepository = getRepository(TaskEntity);
  return taskRepository.findOne(id);
};

const createTask = async (taskData): Promise<TaskEntity> => {
  const taskRepository = getRepository(TaskEntity);
  return taskRepository.save(taskData);
};

const updateTask = async (newTaskData, id: string): Promise<TaskEntity | null> => {
  const taskRepository = getRepository(TaskEntity);
  const task: TaskEntity | undefined = await taskRepository.findOne(id);
  if (!task) return null;
  return taskRepository.save({...task, ...newTaskData});
};

const deleteTask = async (id: string): Promise<TaskEntity | null> => {
  const taskRepository = getRepository(TaskEntity);
  const taskToRemove: TaskEntity | undefined = await taskRepository.findOne(id);
  if (!taskToRemove) return null;
  return taskRepository.remove(taskToRemove);
};

const deleteTasksByBoardId = async (boardId: string): Promise<void> => {
  const taskRepository = getRepository(TaskEntity);
  await taskRepository.delete({ boardId });
}

const unnassignTasksByUserId = async (userId: string): Promise<void> => {
  const taskRepository = getRepository(TaskEntity);
  const tasks = await taskRepository.find({ userId });
  await tasks.map(async task => {
    if (task.userId === userId) {
      await taskRepository.save({
        ...task,
        userId: null,
      })
    }
  });
}

module.exports = {
  getAll,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  deleteTasksByBoardId,
  unnassignTasksByUserId
};
