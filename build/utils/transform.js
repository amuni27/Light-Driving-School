"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MappingService = void 0;
const class_transformer_1 = require("class-transformer");
class MappingService {
    constructor(dtoClass) {
        this.dtoClass = dtoClass;
    }
    transformToDTO(entity) {
        return (0, class_transformer_1.plainToInstance)(this.dtoClass, entity, {
            excludeExtraneousValues: true,
        });
    }
}
exports.MappingService = MappingService;
