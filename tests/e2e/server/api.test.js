import { jest, expect, describe, test } from "@jest/globals";
import { setTimeout } from "timers/promises";
import TestE2EUtil from "./_util/testUtil.js";

describe("API E2E suite Test", () => {

  describe("client workflow", () => {
  
    test("it should not receive data stream if the process is not playing", async () => {
      const server = await TestE2EUtil.getTestServer();
      const onChunk = jest.fn();

      TestE2EUtil.pipeAndReadStreamData(
        server.testServer.get("/stream"),
        onChunk
      );

      await setTimeout(TestE2EUtil.RETENTION_DATA_PERIOD);
      server.kill();
      expect(onChunk).not.toHaveBeenCalled();
    });

    test("it should receive data stream if the process is playing", async () => {
      const server = await TestE2EUtil.getTestServer();
      const onChunk = jest.fn();
      const { send } = TestE2EUtil.commandSender(server.testServer);

      TestE2EUtil.pipeAndReadStreamData(
        server.testServer.get("/stream"),
        onChunk
      );

      const { start, stop } = TestE2EUtil.POSSIBLE_COMMANDS;
      await send(start);
      await setTimeout(TestE2EUtil.RETENTION_DATA_PERIOD);
      await send(stop);

      const [
        [buffer]
      ] = onChunk.mock.calls;

      expect(buffer).toBeInstanceOf(Buffer);
      expect(buffer.length).toBeGreaterThan(1000);
      server.kill();
    });
  });
});
