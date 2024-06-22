import 'reflect-metadata'; // Ensure this is imported at the top
import { Request, Response } from 'express';
import { ContentController } from '../controller/ContentController';
import { ContentServiceImpl } from '../services/impl/ContentServiceImpl';
import { ContentRequestDto } from '../dto/ContentRequestDto';
import { ContentResponseDto } from '../dto/ContentResponseDto';
import { ContentConstant } from '../constant/Constant';

jest.mock('../services/impl/ContentServiceImpl');

describe('ContentController', () => {
    let contentController: ContentController;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        contentController = new ContentController();
        req = {
            body: {},
            user: { id: '66760c654d197e0913bb5506' },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('addContent', () => {
        it('should return 400 if user is not logged in', async () => {
            req.user = undefined;

            contentController.addContent(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith('You are not logged in.');
        });

        it('should return 201 and created content if request is valid', async () => {
            const contentRequestDto: ContentRequestDto = new ContentRequestDto(
                ContentConstant.TEXT,
                'Test Title',
                'http://example.com',
                'Test Description',
                'user123',
                1,
                'lesson123'
            );

            req.body = contentRequestDto;

            const contentResponseDto: ContentResponseDto = new ContentResponseDto();
            contentResponseDto.id = 'content123';
            contentResponseDto.title = 'Test Title';
            contentResponseDto.type = ContentConstant.TEXT;
            contentResponseDto.description = 'Test Description';
            contentResponseDto.url = 'http://example.com';

            // Ensure addContent returns a promise that resolves with the contentResponseDto
            (ContentServiceImpl.prototype.addContent as jest.Mock).mockResolvedValue(contentResponseDto);

            await contentController.addContent(req as Request, res as Response);

            expect(ContentServiceImpl.prototype.addContent).toHaveBeenCalledWith(contentRequestDto);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith(contentResponseDto);
        });

        it('should return 400 and error message if service throws error', async () => {
            const contentRequestDto: ContentRequestDto = new ContentRequestDto(
                ContentConstant.TEXT,
                'Test Title',
                'http://example.com',
                'Test Description',
                'user123',
                1,
                'lesson123'
            );

            req.body = contentRequestDto;

            // Ensure addContent returns a promise that rejects with an error
            (ContentServiceImpl.prototype.addContent as jest.Mock).mockRejectedValue(new Error('Service Error'));

            await contentController.addContent(req as Request, res as Response);

            expect(ContentServiceImpl.prototype.addContent).toHaveBeenCalledWith(contentRequestDto);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({ error: 'Service Error' });
        });
    });
});
