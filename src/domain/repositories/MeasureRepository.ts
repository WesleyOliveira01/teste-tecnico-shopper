import { Measure, MeasureType } from "@prisma/client";
import prisma from "../../infra/config/database";

export class MeasureRepository {
  static async findExistingMeasure(
    customerCode: string,
    measureType: MeasureType,
    measureDate: Date
  ): Promise<Measure[]> {
    return await prisma.measure.findMany({
      where: {
        customerCode,
        measureType,
        measureDate: {
          gte: new Date(measureDate.getFullYear(), measureDate.getMonth(), 1),
          lt: new Date(
            measureDate.getFullYear(),
            measureDate.getMonth() + 1,
            1
          ),
        },
      },
    });
  }

  static async createMeasure(data: {
    customerCode: string;
    measureDate: Date;
    measureType: MeasureType;
    value: number;
    imageUrl: string;
  }): Promise<Measure> {
    return await prisma.measure.create({
      data,
    });
  }

  static async findMeasureById(measureUuid: string): Promise<Measure | null> {
    return await prisma.measure.findUnique({
      where: { id: measureUuid },
    });
  }

  static async updateMeasure(
    measureUuid: string,
    data: Partial<Measure>
  ): Promise<Measure> {
    return await prisma.measure.update({
      where: { id: measureUuid },
      data,
    });
  }

  static async listMeasures(
    customerCode: string,
    measureType?: string
  ): Promise<Measure[]> {
    const whereClause: any = { customerCode };
    if (measureType) {
      whereClause.measureType = measureType.toUpperCase();
    }
    return await prisma.measure.findMany({ where: whereClause });
  }
}
