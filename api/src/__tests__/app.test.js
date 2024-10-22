import request from "supertest";
import app from "../../app";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

jest.mock("axios");
jest.mock("uuid");

describe("API Endpoints", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("POST /upload should upload images successfully", async () => {
    const mockImgurResponse = {
      data: {
        data: {
          id: "imgur123",
          link: "https://imgur.com/image123.jpg",
        },
      },
    };
    axios.post.mockResolvedValue(mockImgurResponse);
    uuidv4.mockReturnValue("test-uuid");

    const testImagePath = path.join(
      __dirname,
      "..",
      "..",
      "src",
      "__tests__",
      "test_image.jpg"
    );
    const testImageBuffer = fs.readFileSync(testImagePath);

    const response = await request(app)
      .post("/upload")
      .attach("images", testImageBuffer, "test_image.jpg");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: "Images uploaded successfully",
      images: [
        {
          id: "test-uuid",
          imgurId: "imgur123",
          url: "https://imgur.com/image123.jpg",
          size: testImageBuffer.length,
          type: "image/jpeg",
          name: "test_image.jpg",
          uploadDate: expect.any(String),
        },
      ],
    });
  });

  it("POST /upload should handle errors", async () => {
    axios.post.mockRejectedValue(new Error("Upload failed"));

    const testImagePath = path.join(
      __dirname,
      "..",
      "..",
      "src",
      "__tests__",
      "test_image.jpg"
    );
    const testImageBuffer = fs.readFileSync(testImagePath);

    const response = await request(app)
      .post("/upload")
      .attach("images", testImageBuffer, "test_image.jpg");

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ error: "Failed to upload images" });
  });

  it("GET /images should return image metadata", async () => {
    const response = await request(app).get("/images");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("POST /upload should handle no files uploaded", async () => {
    const response = await request(app).post("/upload");

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: "No files uploaded" });
  });
});
