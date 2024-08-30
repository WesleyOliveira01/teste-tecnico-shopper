import { IConfirmRequestBody } from "../application/dto/request/ConfirmRequestBody";
import { IUploadRequestBody } from "../application/dto/request/UploadRequestBody";
import { ConfirmMeasurementUseCase } from "../application/useCases/confirmMeasurementUseCase";
import { ListMeasurementsUseCase } from "../application/useCases/listMeasurementsUseCase";
import { UploadImageUseCase } from "../application/useCases/uploadImageUseCase";

export class MeasureService {
  async uploadImage(data: IUploadRequestBody) {
    return await UploadImageUseCase.execute(data);
  }

  async confirmMeasurement(data: IConfirmRequestBody) {
    return await ConfirmMeasurementUseCase.execute(data);
  }

  async listMeasurements(customer_code: string, measure_type?: string) {
    return await ListMeasurementsUseCase.execute(customer_code, measure_type);
  }
}
