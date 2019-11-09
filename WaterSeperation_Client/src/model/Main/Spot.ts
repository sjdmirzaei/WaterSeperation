import { Region } from "../Codeing/Region";
import { Treaty } from "../Codeing/Treaty";
import { IrrigationMethod } from "../Codeing/IrrigationMethod";
import { VegetationType } from "../Codeing/VegetationType";
import { SpotType } from "../Codeing/SpotType";

export class Spot {
  constructor() {}
  id: number;
  name: string;
  code: string;

  // مساحت در واحد متر مربع
  space: number;
  RegionId: number;
  TreatyId: number;
  IrrigationId: number;
  VegetationId: number;
  region: Region;
  spotType: SpotType;
  treaty: Treaty;
  irrigationType: IrrigationMethod;
  vegetationType: VegetationType;
}
