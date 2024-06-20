import {ContentConstant} from "../constant/Constant";

export interface ChoiceType {
    _id: string;
    choiceLetter: string,
    type: ContentConstant
}

export interface QuestionImageType extends ChoiceType {
    url: string,
    description: string,
}

export interface QuestionAudioType extends ChoiceType {
    url: string,
    description: string,
}

export interface QuestionVideoType extends ChoiceType {
    url: string,
    description: string,
}

export interface QuestionTextType extends ChoiceType {
    description: string
}