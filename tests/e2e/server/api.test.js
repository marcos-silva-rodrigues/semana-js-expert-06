import { jest, expect, describe, test } from "@jest/globals";
import fs from "fs";
import { setTimeout } from "timers/promises";
import TestE2EUtil from "./_util/testUtil.js";
import config from '../../../server/config.js';

const {
  constants: {
    CONTENT_TYPE
  },
  dir: {
    publicDirectory
  }
} = config;

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
    
    test('it should 404 when search invalid file', async () => {
      const server = await TestE2EUtil.getTestServer();
      const response = await server.testServer.get('/invalid-page');

      expect(response.status).toStrictEqual(404);
      server.kill();
    });

    test('it should js file', async () => {
      const server = await TestE2EUtil.getTestServer();
      const pathToJsFile = `${publicDirectory}/home/js/animation.js`;

      const jsFile = await fs.promises.readFile(pathToJsFile);
      const response = await server.testServer.get('/home/js/animation.js');

      expect(response.statusCode).toStrictEqual(200);
      expect(response.headers["content-type"]).toStrictEqual(CONTENT_TYPE['.js']);
      expect(response.text).toStrictEqual(jsFile.toString());
      server.kill();
    });

    test('it should css file', async () => {
      const server = await TestE2EUtil.getTestServer();
      const pathToCssFile = `${publicDirectory}/home/css/styles.css`;

      const cssFile = await fs.promises.readFile(pathToCssFile);
      const response = await server.testServer.get('/home/css/styles.css');

      expect(response.statusCode).toStrictEqual(200);
      expect(response.headers["content-type"]).toStrictEqual(CONTENT_TYPE['.css']);
      expect(response.text).toStrictEqual(cssFile.toString());
      server.kill();
    });

    test("it should redirect to /home when access '/'", async () => {
      const server = await TestE2EUtil.getTestServer();
      const response = await server.testServer.get('/');
      expect(response.headers.location).toStrictEqual('/home');
      expect(response.statusCode).toStrictEqual(302);
      server.kill();
    });

    test("it should home.html when access '/home'", async () => {
      const server = await TestE2EUtil.getTestServer();
      const pathToHome = `${publicDirectory}/home/index.html`;

      const homeHtml = await fs.promises.readFile(pathToHome);
      const response = await server.testServer.get('/home');

      expect(response.statusCode).toStrictEqual(200);
      expect(response.text).toStrictEqual(homeHtml.toString());
      server.kill();
    });


    test("it should controller.html when access '/controller'", async () => {
      const server = await TestE2EUtil.getTestServer();
      const pathToController = `${publicDirectory}/controller/index.html`;

      const controllerHtml = await fs.promises.readFile(pathToController);
      const response = await server.testServer.get('/controller');

      expect(response.statusCode).toStrictEqual(200);
      expect(response.text).toStrictEqual(controllerHtml.toString());
      server.kill();
    });

    test("it should type .html when access '/controller/controller.html'", async () => {
      const server = await TestE2EUtil.getTestServer();
      const pathToController = `${publicDirectory}/controller/index.html`;

      const controllerHtml = await fs.promises.readFile(pathToController);
      const response = await server.testServer.get('/controller/index.html');

      expect(response.headers['content-type']).toStrictEqual(CONTENT_TYPE['.html']);
      expect(response.statusCode).toStrictEqual(200);
      expect(response.text).toStrictEqual(controllerHtml.toString());
      server.kill();
    });
  });
});
