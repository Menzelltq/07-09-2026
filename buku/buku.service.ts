import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBukuDto } from './dto/create-buku.dto.js';
import { UpdateBukuDto } from './dto/update-buku.dto.js';

@Injectable()
export class BukuService {
  private readonly buku: CreateBukuDto[] = [];

  create(createBukuDto: CreateBukuDto) {
    if (!Number.isInteger(createBukuDto.id)) {
      throw new BadRequestException('ID buku harus berupa bilangan bulat');
    }

    if (this.buku.some((buku) => buku.id === createBukuDto.id)) {
      throw new ConflictException(`Buku dengan ID ${createBukuDto.id} sudah ada`);
    }

    this.buku.push(createBukuDto);
    return createBukuDto;
  }

  findAll() {
    return this.buku;
  }

  findOne(id: number) {
    const buku = this.buku.find((item) => item.id === id);
    if (!buku) {
      throw new NotFoundException(`Buku dengan ID ${id} tidak ditemukan`);
    }
    return buku;
  }

  update(id: number, updateBukuDto: UpdateBukuDto) {
    const index = this.buku.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Buku dengan ID ${id} tidak ditemukan`);
    }

    const updatedBuku = { ...this.buku[index], ...updateBukuDto, id };
    this.buku[index] = updatedBuku;
    return updatedBuku;
  }

  remove(id: number) {
    return `This action removes a #${id} buku`;
  }
}
