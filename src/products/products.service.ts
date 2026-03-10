import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productRepository.save(createProductDto);
  }

  findAll() {
    return this.productRepository.find({
      loadEagerRelations: true,
      relations: {
        provider: true,
      },
    });
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({ productId: id });

    if (!product) throw new NotFoundException();

    return product;
  }

  // findByProvider(id: string) {
  //   return 'OK';
  // }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productRepository.preload({
      productId: id,
      ...updateProductDto,
    });

    if (!productToUpdate) throw new NotFoundException();

    const productUpdated = this.productRepository.save(productToUpdate);

    return productUpdated;
  }

  async remove(id: string) {
    const { productId } = await this.findOne(id);
    await this.productRepository.delete(productId);

    return {
      message: `Objeto con ID ${id} eliminado`,
    };
  }
}
