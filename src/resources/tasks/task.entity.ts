const { Entity, PrimaryGeneratedColumn, Column } = require('typeorm');

@Entity({ name: 'column' })
class ColumnEntity {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column('uuid', { nullable: true })
    boardId?: string;

    @Column('uuid', { nullable: true })
    userId?: string;

    @Column('uuid', { nullable: true })
    columnId?: string;

    @Column('varchar')
    description?: string;

    @Column('varchar', { length: 25 })
    title?: string;

    @Column()
    order?: number;
}

export = ColumnEntity;
