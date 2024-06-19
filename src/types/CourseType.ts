import {Schema} from "mongoose";
import {Expose} from "class-transformer";

export interface CourseType {
    title: string,
    description: string,
    modules: [{
        _id: string,
        number: string,

    }],
    addedBy: { type: Schema.Types.ObjectId, ref: 'User' }
}

export class CourseModulesType {
    @Expose({name: "_id"})
    private _id: string = '';
    @Expose({name: "number"})
    private _number: string = '';


    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get number(): string {
        return this._number;
    }

    set number(value: string) {
        this._number = value;
    }
}