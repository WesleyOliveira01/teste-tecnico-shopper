import { MeasureRepository } from "../../domain/repositories/MeasureRepository";
import { ErrorHandler } from "../../errors/ErrrorHandler";
import { IConfirmRequestBody } from "../dto/request/ConfirmRequestBody";

export class ConfirmMeasurementUseCase {
  static async execute(data: IConfirmRequestBody) {
    const measure = await MeasureRepository.findMeasureById(data.measure_uuid);

    if (!measure) {
      throw new ErrorHandler("NOT_FOUND", "Leitura não encontrada", 404);
    }

    if (measure.isConfirmed) {
      throw new ErrorHandler(
        "CONFIRMATION_DUPLICATE",
        "Leitura do mês já realizada",
        409
      );
    }

    await MeasureRepository.updateMeasure(data.measure_uuid, {
      isConfirmed: true,
      value: data.confirmed_value,
    });

    return { success: true };
  }
}
