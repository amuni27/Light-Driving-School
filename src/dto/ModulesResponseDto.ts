import {UserResponseDTO} from "./UserResponseDTO";
import {Expose, Type} from "class-transformer";

export class ModulesResponseDto {
    @Expose({name: 'title'})
    private _title: string = ''
    @Expose({name: 'lessons'})
    private _lessons: string = ''
    @Expose({name: 'description'})
    private _description: string='';
    @Expose({name: 'addedBy'})
    @Type(() => UserResponseDTO)
    private _addedBy: UserResponseDTO = new UserResponseDTO();


    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get lessons(): string {
        return this._lessons;
    }

    set lessons(value: string) {
        this._lessons = value;
    }

    get addedBy(): UserResponseDTO {
        return this._addedBy;
    }

    set addedBy(value: UserResponseDTO) {
        this._addedBy = value;
    }
}