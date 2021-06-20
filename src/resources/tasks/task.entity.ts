const { Entity, PrimaryGeneratedColumn, Column } = require('typeorm');

@Entity({ name: 'column' })
class ColumnEntity {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column('varchar', { length: 25 })
    title?: string;

    @Column()
    order?: number;
}

export = ColumnEntity;
