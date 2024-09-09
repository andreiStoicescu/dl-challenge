import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { ProjectEntity } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,
  ) { }

  findProjectEntity(id: number) {
    return this.projectRepository.findOneBy({ id }).then((projectEntity) => {
      if (projectEntity == null) {
        throw new NotFoundException(`Project with id ${id} not found`);
      }
      return projectEntity;
    });
  }

  create(createProjectInput: CreateProjectInput) {
    const projectEntity = new ProjectEntity();
    projectEntity.name = createProjectInput.name;

    return this.projectRepository.save(projectEntity);
  }

  findAll() {
    return this.projectRepository.find();
  }

  findOne(id: number) {
    return this.findProjectEntity(id);
  }

  async update(id: number, updateProjectInput: UpdateProjectInput) {
    const projectEntity = await this.findProjectEntity(id);
    if (updateProjectInput.name) {
      projectEntity.name = updateProjectInput.name;
    }
    return this.projectRepository.save(projectEntity);
  }

  async remove(id: number) {
    const projectEntity = await this.projectRepository
      .findOne({
        where: { id },
        relations: ['invoices'],
      })
      .then((projectEntity) => {
        if (projectEntity == null) {
          throw new NotFoundException(`Project with id ${id} not found`);
        }
        return projectEntity;
      });

    if (projectEntity.invoices.length > 0) {
      throw new NotAcceptableException('Cannot delete project with invoices');
    }

    const result = await this.projectRepository.delete({ id });
    return result.affected === 1;
  }
}
