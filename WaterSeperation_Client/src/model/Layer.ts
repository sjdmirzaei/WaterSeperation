import { Subsystem } from "./Subsystem";

export class Layer {
  constructor() {
   // this.subsystem = new Subsystem();
    this.visible = false;
  }
  id: string;
  name: string;
  title: string;
  url: string;
  subsystem: string;
  visible: boolean;
  symbol: string;
  type: string;
  color: string;
}
