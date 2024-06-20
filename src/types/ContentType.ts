import {ContentConstant} from "../constant/Constant";
import {UserResponseDTO} from "../dto/UserResponseDTO";

export interface ContentType{
    title: string,
    type: ContentConstant,
    addedBy: UserResponseDTO,
    contentNumber: number,
    lessonId: string,
}


export interface ImageType extends ContentType{
    url: string,
    description: string,
}
export interface AudioType extends ContentType{
    url: string,
    description: string,
}
export interface VideoType extends ContentType{
    url: string,
    description: string,
}
export interface TextType extends ContentType{
    description:string
}