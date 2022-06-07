import { PointModel } from './point-model.model';

describe('PointModel', () => {
  it('should create an instance', () => {
    expect(new PointModel(0, 0)).toBeTruthy();
  });
});
