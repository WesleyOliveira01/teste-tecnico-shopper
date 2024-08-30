import { MeasureRepository } from "../../domain/repositories/MeasureRepository";
import { ErrorHandler } from "../../errors/ErrrorHandler";
import { GoogleGenerativeAIService } from "../../services/GoogleGenerativeAIService";
import { ImageProcessingService } from "../../services/ImageProcessingService";
import { IUploadRequestBody } from "../dto/request/UploadRequestBody";
import { UploadResponse } from "../dto/response/UploadResponse";

export class UploadImageUseCase {
  static async execute(data: IUploadRequestBody):Promise<UploadResponse> {
    const measureDate = new Date(data.measure_datetime);

    const leituraExistente = await MeasureRepository.findExistingMeasure(
      data.customer_code,
      data.measure_type,
      measureDate
    );

    if (leituraExistente.length > 0) {
      throw new ErrorHandler(
        "DOUBLE_REPORT",
        "Leitura do mês já realizada",
        409
      );
    }

    const imageBase64 = data.image.split(",")[1];
    const measureValue =
      await GoogleGenerativeAIService.extractMeasureFromImage(imageBase64);
    const imageUrl = await ImageProcessingService.uploadImageToImgur(
      imageBase64
    );

    const measure = await MeasureRepository.createMeasure({
      customerCode: data.customer_code,
      measureDate: measureDate,
      measureType: data.measure_type,
      value: measureValue,
      imageUrl: imageUrl,
    });

    return {
      image_url: measure.imageUrl,
      measure_value: measure.value,
      measure_uuid: measure.id,
    };
  }
}
