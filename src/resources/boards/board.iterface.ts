/* eslint-disable  @typescript-eslint/no-unused-vars */
interface IBoard {
    title: string;
    columns:  Array<{
        id: string;
        title: string;
        order: number;
    }> | [];
}

export = IBoard;
