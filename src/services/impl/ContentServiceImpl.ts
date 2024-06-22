import {ContentRequestDto} from "../../dto/ContentRequestDto";
import {ContentResponseDto} from "../../dto/ContentResponseDto";
import {ContentService} from "../ContentService";
import {MappingService} from "../../utils/transform";
import {ContentConstant} from "../../constant/Constant";
import Content from "../../model/Content";
import {ImageContent} from "../../model/Image";
import {AudioContent} from "../../model/Audio";
import {VideoContent} from "../../model/VIdeo";
import {TextContent} from "../../model/Text";
import {LessonServiceImpl} from "./LessonServiceImpl";
import {LessonService} from "../LessonService";
import mongoose, {Error} from "mongoose";
import Lesson from "../../model/Lesson";
import {ContentError} from "../../exceptions/ContentError";

export class ContentServiceImpl implements ContentService {

    mappingService;
    lessonService: LessonService;

    constructor() {
        this.mappingService = new MappingService(ContentResponseDto)
        this.lessonService = new LessonServiceImpl();
    }

    async addContent(contentRequestDto: ContentRequestDto): Promise<ContentResponseDto> {
        try {
            const content = this.createContent(contentRequestDto);

            if (!content) {
                throw new ContentError(`Unsupported content type: ${contentRequestDto.type}`);
            }

            const addContentToLesson = await this.lessonService.addContentTOLesson(contentRequestDto.lessonId, content._id.toString(), contentRequestDto.contentNumber)
            if (!addContentToLesson) {
                throw new ContentError(`Cannot add content to lesson: ${contentRequestDto.lessonId}`);
            }
            const savedContent = await content.save();
            if (!savedContent) {
                throw new ContentError("Could not save content");
            }

            return this.mappingService.transformToDTO(savedContent.populate("addedBy"));
        } catch (error) {
            console.error(`Error in addContent: ${error}`);
            throw new ContentError(`Error in addContent: ${error}`);
        }
    }


    updateContent(contentId: string, contentRequest: ContentRequestDto): Promise<ContentResponseDto> {
        throw new ContentError("Method not implemented.");
    }

    async deleteContent(contentId: string): Promise<boolean> {
        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            const foundedContent = await Content.findById(contentId);
            if (!foundedContent) {
                throw new ContentError(`Content with id ${contentId} not found`);
            }
            const result = await this.lessonService.deleteContentFromLesson(contentId, foundedContent.lessonId)
            if (!result) {
                throw new ContentError(`Failed to delete content with id ${contentId}`);
            }
            const content = await Content.deleteOne({_id: contentId});
            await session.commitTransaction();
            await session.endSession();
            if (content.deletedCount > 0) return true;
            else throw new ContentError(`Module with id ${contentId} not found and cannot be deleted`);
        } catch (error) {
            throw new ContentError(`Error in delete Content: ${error}`);
        }
    }

    async findContent(contentId: string): Promise<ContentResponseDto> {
        try {
            const content = await Content.findById(contentId).populate('addedBy');
            if (!content) {
                throw new ContentError(`Content with id ${contentId} not found`);
            }
            return this.mappingService.transformToDTO(content);
        } catch (error) {
            throw new ContentError(`Error in find Content: ${error}`);
        }
    }

    async findAllContent(): Promise<ContentResponseDto[]> {
        try {
            const content = await Content.find().populate('addedBy');
            if (!content) {
                throw new ContentError("Content not found");
            }
            return content.map(data => this.mappingService.transformToDTO(data));
        } catch (error) {
            throw new ContentError(`Error in find Content: ${error}`);
        }
    }

    private createContent(contentRequestDto: ContentRequestDto): InstanceType<typeof Content> | null {
        switch (contentRequestDto.type) {
            case ContentConstant.IMAGE:
                return new ImageContent(contentRequestDto);
            case ContentConstant.AUDIO:
                return new AudioContent(contentRequestDto);
            case ContentConstant.VIDEO:
                return new VideoContent(contentRequestDto);
            case ContentConstant.TEXT:
                return new TextContent(contentRequestDto);
            default:
                return null;
        }
    }

}