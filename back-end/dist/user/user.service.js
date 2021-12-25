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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_model_1 = require("./user.model");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const graphql_1 = require("graphql");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async register(registerInput) {
        try {
            const isUser = await this.userModel.findOne({
                email: registerInput.email,
            });
            if (isUser) {
                throw new graphql_1.GraphQLError('Nah Bro, you already exist 🤡');
            }
            else {
                registerInput.password = await bcrypt
                    .hash(registerInput.password, 10)
                    .then((r) => r);
                return await new this.userModel(registerInput).save();
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    findOneById(id) { }
    async findOne(username) {
        return this.userModel.findOne({ email: username }).exec();
    }
    async findAll() {
        return this.userModel.find().exec();
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_model_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map