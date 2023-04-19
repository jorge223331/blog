export interface IModel {
  id: number;
  created: number;
  updated: number;
}
export class Model<Type extends IModel> {
  id!: number;
  created!: number;
  updated!: number;
  constructor(data: Type) {
    const self = this as any;
    for (const k in data) {
      if (Object.prototype.hasOwnProperty.call(data, k)) {
        self[k] = data[k];
      }
    }
  }
}
export class ModelInsertable<Type extends Record<string, any>> {
  id!: number;
  created!: number;
  updated!: number;
  constructor(data: Type) {
    const self = this as any;
    for (const k in data) {
      if (Object.prototype.hasOwnProperty.call(data, k)) {
        self[k] = data[k];
      }
    }
  }
}
