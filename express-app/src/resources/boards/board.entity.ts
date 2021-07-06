const { Entity, Column, OneToOne, PrimaryGeneratedColumn } = require('typeorm');
const ColumnEntity = require('../tasks/column.entity');
const UserEntity = require('../users/user.entity');

@Entity({ name: 'board' })
class BoardEntity {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column('varchar', { length: 25} )
    title?: string;

    @OneToOne('UserEntity', 'board')
    user?: typeof UserEntity;

    @Column('jsonb', { nullable: true })
    columns?: typeof ColumnEntity[] | [];
}

export = BoardEntity;
