"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginTypeResponse = exports.LoginInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_schema_1 = require("../user/user.schema");
let LoginInput = class LoginInput {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LoginInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LoginInput.prototype, "password", void 0);
LoginInput = __decorate([
    (0, graphql_1.InputType)()
], LoginInput);
exports.LoginInput = LoginInput;
let LoginTypeResponse = class LoginTypeResponse {
};
__decorate([
    (0, graphql_1.Field)(type => user_schema_1.UserType),
    __metadata("design:type", user_schema_1.UserType)
], LoginTypeResponse.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], LoginTypeResponse.prototype, "accessToken", void 0);
LoginTypeResponse = __decorate([
    (0, graphql_1.ObjectType)()
], LoginTypeResponse);
exports.LoginTypeResponse = LoginTypeResponse;
//# sourceMappingURL=auth.schema.js.map