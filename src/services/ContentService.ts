import {ContentRequestDto} from "../dto/ContentRequestDto";
import {ContentResponseDto} from "../dto/ContentResponseDto";

export interface ContentService {

    addContent(contentRequest: ContentRequestDto): Promise<ContentResponseDto>;

    updateContent(contentId: string, contentRequest: ContentRequestDto): Promise<ContentResponseDto>;

    deleteContent(contentId: string): Promise<ContentResponseDto>;

    findContent(contentId: string): Promise<ContentResponseDto>;

    findAllContent(): Promise<ContentResponseDto[]>;
}