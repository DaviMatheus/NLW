import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, UsingJoinColumnIsNotAllowedError  } from "typeorm";
import { v4 as uuid } from "uuid";
import { Expose } from "class-transformer";

@Entity("tags")
class Tags {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Expose({name: "name_Custom "})
    name_Custom(): string {
        return `#${this.name}`;
    }

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }

}

export {Tags};
