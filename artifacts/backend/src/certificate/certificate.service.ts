import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CertificateService {
  constructor(private prisma: PrismaService) {}
}