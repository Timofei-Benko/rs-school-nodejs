const { Entity, PrimaryGeneratedColumn, Column, OneToMany } = require('typeorm');
const BoardEntity = require('../boards/board.entity');

@Entity({ name: 'user' })
class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column('varchar', { length: 50 })
    name?: string;

    @Column('varchar', { length: 50 })
    login?: string;

    @Column('varchar', { length: 50 })
    password?: string;

    @OneToMany('BoardEntity', 'user')
    board?: typeof BoardEntity;
}

export = UserEntity;
