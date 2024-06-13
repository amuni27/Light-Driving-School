import {plainToInstance} from 'class-transformer';

export class MappingService<T extends object, U extends object> {
    private readonly dtoClass: new () => T;

    constructor(dtoClass: new () => T) {
        this.dtoClass = dtoClass;
    }

    transformToDTO(entity: U): T {
        return plainToInstance(this.dtoClass, entity, {
            excludeExtraneousValues: true,
        });
    }
}
