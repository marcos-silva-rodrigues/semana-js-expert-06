import { jest, describe, test, expect, beforeEach } from "@jest/globals";
import config from "../../../server/config";
import { Service } from "../../../server/service";
import TestUtil from "../_util/testUtil";
import fs from 'fs';
import fsPromises from 'fs/promises';

const {dir: { publicDirectory }, pages, location } = config;

describe("#Service", () => {
  beforeEach(async () => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("createFileStream", async () => {
    const streamMock = TestUtil.generateReadableStream(['data stream']);
    const file = `index.html`;
    
    jest
      .spyOn(fs, fs.createReadStream.name)
      .mockReturnValue(streamMock);

    const service = new Service();
    const data = await service.createFileStream(file);

    expect(data).toStrictEqual(streamMock);
    expect(fs.createReadStream).toBeCalledWith(file);
  });

  test("getFileInfo", async () => {
    jest.spyOn(
      fsPromises,
      fsPromises.access.name
    ).mockResolvedValue()

    const currentSong = 'mySong.mp3'
    const service = new Service()
    const result = await service.getFileInfo(currentSong)
    const expectedResult = {
      type: '.mp3',
      name: `${publicDirectory}/${currentSong}`
    }

    expect(result).toStrictEqual(expectedResult)
  });

  test("getFileStream", async () => {
    const currentReadable = TestUtil.generateReadableStream(['abc']);
    const currentSong = `mySong.mp3`;
    const currentSongFullPath = `${publicDirectory}/${currentSong}`;

    const fileInfo = {
      type: '.mp3',
      name: currentSongFullPath
    };

    const service = new Service();
    jest
      .spyOn(
        service,
        service.getFileInfo.name
      )
      .mockResolvedValue(fileInfo);

    jest
      .spyOn(
        service,
        service.createFileStream.name
      )
      .mockReturnValue(currentReadable);

    const result = await service.getFileStream(currentSong);
    const expectedResult = {
      type: fileInfo.type,
      stream: currentReadable
    };
    expect(result).toStrictEqual(expectedResult)
    expect(service.createFileStream).toHaveBeenCalledWith(
      fileInfo.name
    );

    expect(service.getFileInfo).toHaveBeenCalledWith(
      currentSong
    );

  });
});
