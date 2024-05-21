const HttpStatusCode = require("../exceptions/HttpStatusCode");
const Stories = require("../model/Stories/StoryModel");
const StoriesService = require("../service/StoriesService");
const cloudinary = require("../uploads/cloudinary");
const multer = require("../uploads/multer");
const fs = require("fs");
module.exports = {
  handleCreateStories: async (req, res) => {
    try {
      const { userId, mediaType, mediaURL, caption } = req.body;
      const response = await StoriesService.handleCreateStories(
        userId,
        mediaType,
        mediaURL,
        caption
      );
      console.log("req.body", req.body);
      return res.status(HttpStatusCode.OK).json({ response });
    } catch (error) {
      return res.status(HttpStatusCode.NOT_FOUND).json({ error });
    }
  },
  handleDeleteStories: async (req, res) => {
    try {
      const id = req.params.id;
      const response = await StoriesService.handleDeleteStories(id);
      return res.status(HttpStatusCode.OK).json({ response });
    } catch (error) {
      return res.status(HttpStatusCode.NOT_FOUND).json({ error });
    }
  },
  handleUpdateStories: async (req, res) => {
    try {
      const id = req.params.id;
      const response = await StoriesService.handleUpdateStories(id);
      return res.status(HttpStatusCode.OK).json({ response });
    } catch (error) {
      return res.status(HttpStatusCode.NOT_FOUND).json({ error });
    }
  },
  handleViewStories: async (req, res) => {
    try {
      const storyID = req.params.id;
      const { userId } = req.body;
      const response = await StoriesService.handleViewStories(userId, storyID);
      return res.status(HttpStatusCode.OK).json({ response });
    } catch (error) {
      return res.status(HttpStatusCode.NOT_FOUND).json({ error });
    }
  },
  handleGetAll: async (req, res) => {
    try {
      const response = await StoriesService.handleGetAll();
      return res.status(HttpStatusCode.OK).json({ response });
    } catch (error) {
      return res.status(HttpStatusCode.NOT_FOUND).json({ error });
    }
  },
  handleLike: async (req, res) => {
    try {
      const userId = req.params.id;
      const storyId = req.body.storyId;
      const response = await StoriesService.handleLike(userId, storyId);
      return res.status(HttpStatusCode.OK).json({ response });
    } catch (error) {
      return res.status(HttpStatusCode.NOT_FOUND).json({ error });
    }
  },
  handleGetDetail: async (req, res) => {
    try {
      const storyID = req.params.id;
      const response = await StoriesService.handleGetDetail(storyID);
      return res.status(HttpStatusCode.OK).json({ response });
    } catch (error) {
      return res.status(HttpStatusCode.NOT_FOUND).json({ error });
    }
  },
  handleComments: async (req, res) => {
    try {
      const storyID = req.params.id;
      const { userId, text } = req.body;
      const response = await StoriesService.handleComments(
        storyID,
        userId,
        text
      );
      return res.status(HttpStatusCode.OK).json({ response });
    } catch (error) {
      return res.status(HttpStatusCode.NOT_FOUND).json({ error });
    }
  },
  handleUploadImages: (files) => {
    return new Promise(async (resolve, reject) => {
      try {
        const uploader = async (path) =>
          await cloudinary.uploads(path, "Images");
        const urls = [];
        console.log(files);
        for (const file of files) {
          const { path } = file;
          const newPath = await uploader(path);
          urls.push(newPath);
          fs.unlinkSync(path);
        }
        resolve({
          code: 200,
          message: "Uploads successfully!!",
          data: urls,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  handleUploadVideos: (file) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("filessss", file);
        const uploader = async (path) =>
          await cloudinary.uploadVideo(path, "Videos");
        const result = await uploader(file.path);
        console.log(result);
        resolve({
          code: 200,
          message: "Uploads successfully!!",
          data: result,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};
