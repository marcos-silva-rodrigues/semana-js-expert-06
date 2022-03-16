import { jest, describe, test, expect } from '@jest/globals';
import config from '../../../server/config';
import { Controller } from '../../../server/controller';
import { Service } from '../../../server/service';
import TestUtil from '../_util/testUtil';

const {
  pages,
  location,
  constants: {
    CONTENT_TYPE
  }
} = config;

describe('#Controller', () => {

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test('should stream data with valid filename', async () => {
    const controller = new Controller();
    const mockFileStream = TestUtil.generateReadableStream(['data'])
    const expectType = '.html'

    jest.spyOn(
      Service.prototype,
      Service.prototype.getFileStream.name,
    ).mockResolvedValue({
      stream: mockFileStream,
      type: expectType
    });

    const fileStream = await controller.getFileStream(pages.homeHTML);

    expect(Service.prototype.getFileStream).toBeCalledWith(pages.homeHTML);
    expect(fileStream.stream).toEqual(mockFileStream);
    expect(fileStream.type).toEqual(expectType);
  });

  test('should stream data with valid filename', async () => {
    const controller = new Controller();
    const invalidFile = 'home/invalid.html'

    jest.spyOn(
      Service.prototype,
      Service.prototype.getFileStream.name,
    ).mockRejectedValue(new Error('Error: ENOENT: no such file or directory'));

    expect(() => controller.getFileStream(invalidFile)).rejects.toThrowError(new Error('Error: ENOENT: no such file or directory'));
  });
});