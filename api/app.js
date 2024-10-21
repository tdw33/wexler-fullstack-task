import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 9001;

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

const imageMetadata = [];

app.post("/upload", upload.array("images", 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const uploadedImages = [];

    for (const file of req.files) {
      const formData = new FormData();
      formData.append("image", file.buffer.toString("base64"));

      const response = await axios.post(
        "https://api.imgur.com/3/image",
        formData,
        {
          headers: {
            Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageData = response.data.data;
      const metadata = {
        id: uuidv4(),
        imgurId: imageData.id,
        url: imageData.link,
        size: file.size,
        type: file.mimetype,
        name: file.originalname,
        uploadDate: new Date(),
      };

      imageMetadata.push(metadata);
      uploadedImages.push(metadata);
    }

    res.status(200).json({
      message: "Images uploaded successfully",
      images: uploadedImages,
    });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({ error: "Failed to upload images" });
  }
});

app.get("/images", (req, res) => {
  res.status(200).json(imageMetadata);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;
