import { Controller } from '@nestjs/common';
import { CertificateService } from './certificate.service';

@Controller('certificates')
export class CertificateController {
  constructor(private certificateService: CertificateService) {}
}
