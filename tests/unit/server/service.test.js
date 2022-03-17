import { jest, describe, test, expect, beforeEach } from "@jest/globals";
import config from "../../../server/config";
import { Service } from "../../../server/service";
import TestUtil from "../_util/testUtil";
import path from 'path';
import fs from 'fs';

const {dir: { publicDirectory }, pages, location } = config;

describe("#Service", () => {
  beforeEach(async () => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("createFileStream", async () => {
    const expectPath = `${publicDirectory}\\home\\index.html`;
    const streamMock = TestUtil.generateReadableStream(['data stream']);
    
    jest.spyOn(fs, "createReadStream").mockReturnValue(streamMock);

    const service = new Service();
    const data = await service.createFileStream(expectPath);

    expect(data).toEqual(streamMock);
  });

  test("getFileInfo with valid file", async () => {
    const expectPath = `${publicDirectory}\\home\\index.html`
    const expectType = '.html';

    jest.spyOn(path, "join").mockReturnValue(expectPath);

      const service = new Service();
      const data = await service.getFileInfo(pages.homeHTML);

      expect(data.type).toEqual(expectType);
      expect(data.name).toEqual(expectPath);
  });

  test("getFileStream", async () => {
    const streamMock =TestUtil.generateReadableStream(['index.html']);
    const expectType = ".html";

    jest
      .spyOn(Service.prototype, Service.prototype.createFileStream.name)
      .mockReturnValue(streamMock);

    jest
      .spyOn(Service.prototype, Service.prototype.getFileInfo.name)
      .mockReturnValue({
        name: pages.homeHTML,
        type: expectType
      });

    const service = new Service();

    const data = await service.getFileStream(location.home);
    expect(Service.prototype.getFileInfo).toBeCalledWith(location.home);
    expect(data.stream).toStrictEqual(streamMock);
    expect(data.type).toStrictEqual(expectType);
  });
});
