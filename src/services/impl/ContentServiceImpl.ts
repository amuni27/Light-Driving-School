import {ContentRequestDto} from "../../dto/ContentRequestDto";
import {ContentResponseDto} from "../../dto/ContentResponseDto";
import {ContentService} from "../ContentService";
import {MappingService} from "../../utils/transform";
import {CourseResponseDto} from "../../dto/CourseResponseDto";

export class ContentServiceImpl implements ContentService {

    mappingService;

    constructor() {
        this.mappingService = new MappingService(ContentResponseDto)
    }

    addContent(contentRequest: ContentRequestDto): Promise<ContentResponseDto> {
        throw new Error("Method not implemented.");
    }

    updateContent(contentId: string, contentRequest: ContentRequestDto): Promise<ContentResponseDto> {
        throw new Error("Method not implemented.");
    }

    deleteContent(contentId: string): Promise<ContentResponseDto> {
        throw new Error("Method not implemented.");
    }

    findContent(contentId: string): Promise<ContentResponseDto> {
        throw new Error("Method not implemented.");
    }

    findAllContent(): Promise<ContentResponseDto[]> {
        throw new Error("Method not implemented.");
    }

}