import { Repository } from "typeorm";


export abstract class AbstractService{
    protected constructor(
      protected readonly respository: Repository<any>
    ){
    }

    async save(options) {
        return this.respository.save(options);
    }

    async findOne(options){
        return this.respository.findOneBy(options);
    }

    async update(id: number, options){
        return this.respository.update(id, options);
    }

    async find(options = {}){
        return this.respository.find(options);
    }

    async delete(id: number){
        return this.respository.delete(id);
    }
}