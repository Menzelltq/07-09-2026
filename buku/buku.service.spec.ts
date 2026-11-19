import { NotFoundException } from '@nestjs/common';
import { BukuService } from './buku.service.js';

describe('BukuService', () => {
  let service: BukuService;

  beforeEach(() => {
    service = new BukuService();
  });

  it('creates a book and returns it in the list', () => {
    const buku = { id: 2, judul: 'Buku Agama', penulis: 'Menzell Lusmana', tahun: 2026 };

    expect(service.create(buku)).toEqual(buku);
    expect(service.findAll()).toEqual([buku]);
  });

  it('updates a book by ID while keeping the route ID', () => {
    service.create({ id: 2, judul: 'Buku Agama', penulis: 'Menzell Lusmana', tahun: 2026 });

    expect(service.update(2, { id: 3, judul: 'Buku Baru' })).toEqual({
      id: 2,
      judul: 'Buku Baru',
      penulis: 'Menzell Lusmana',
      tahun: 2026,
    });
  });

  it('throws when trying to update a book that does not exist', () => {
    expect(() => service.update(99, { judul: 'Tidak ada' })).toThrow(NotFoundException);
  });
});
