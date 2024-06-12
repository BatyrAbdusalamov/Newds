import { Body, Controller, Delete, Get, Param, ParseArrayPipe, ParseBoolPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateTagData } from './data/CreateTag.data'
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
    constructor (private tagService: TagService) {}

}