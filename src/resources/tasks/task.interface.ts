/* eslint-disable  @typescript-eslint/no-unused-vars */
interface ITask {
    id: string,
    title?: string,
    order?: number | null,
    description?: string,
    userId?: string | null,
    boardId?: string | null,
    columnId?: string | null
}

export = ITask;
