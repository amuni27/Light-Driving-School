"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentType = exports.Role = void 0;
var Role;
(function (Role) {
    Role[Role["STUDENT"] = 0] = "STUDENT";
    Role[Role["STAFF"] = 1] = "STAFF";
    Role[Role["ADMIN"] = 2] = "ADMIN";
})(Role || (exports.Role = Role = {}));
var ContentType;
(function (ContentType) {
    ContentType[ContentType["TEXT"] = 0] = "TEXT";
    ContentType[ContentType["VIDEO"] = 1] = "VIDEO";
    ContentType[ContentType["AUDIO"] = 2] = "AUDIO";
    ContentType[ContentType["IMAGE"] = 3] = "IMAGE";
})(ContentType || (exports.ContentType = ContentType = {}));
