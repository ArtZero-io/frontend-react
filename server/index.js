require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs");
const {
  getProjectByAddress,
  getCloudFlareImage,
  getCollectionByAddress,
} = require("./api");
const app = express();

const PORT = process.env.PORT || 3002;
const indexPath = path.resolve(__dirname, "..", "build", "index.html");
console.log(PORT, "port");
// static resources should just be served as they are
app.get("/", async (req, res, next) => {
  sendDefaut(req, res);
});

app.use(
  express.static(path.resolve(__dirname, "..", "build"), { maxAge: "30d" })
);

const sendDefaut = (req, res) => {
  fs.readFile(indexPath, "utf8", async (err, htmlData) => {
    try {
      if (err) {
        console.error("Error during file reading", err);
        return res.status(404).end();
      }

      // get post info
      // inject meta tags
      htmlData = htmlData
        .replaceAll(
          "__META_OG_TITLE__",
          "ArtZero.io - NFT Marketplace for Astar Network Blockchain"
        )
        .replaceAll(
          "__META_OG_DESCRIPTION__",
          "Discover, create, collect and trade NFTs on Astar Network Blockchain with ArtZero.io"
        )
        .replaceAll(
          "__META_OG_IMAGE__",
          "https://imagedelivery.net/AHcX2l0hfeTsnvkojY22Eg/astar/artzero/preview/public"
        );
      return res.send(htmlData);
    } catch (e) {
      console.log("failll");
    }
  });
};

// here we serve the index.html page
app.get("/launchpad/*", async (req, res, next) => {
  fs.readFile(indexPath, "utf8", async (err, htmlData) => {
    try {
      if (err) {
        console.error("Error during file reading", err);
        return res.status(404).end();
      }
      if (req.params?.[0]) {
        const result = await getProjectByAddress({
          nftContractAddress: req.params[0],
        });
        if (!result?.length) return res.send(htmlData);
        const project = result[0];
        // get post info
        // inject meta tags
        let image = "";
        if (project?.headerImage) {
          image = await getCloudFlareImage(project.headerImage);
        }
        htmlData = htmlData
          .replaceAll("__META_OG_TITLE__", project.name)
          .replaceAll("__META_OG_DESCRIPTION__", project.description)
          .replaceAll("__META_OG_IMAGE__", image);
      }

      return res.send(htmlData);
    } catch (e) {
      return sendDefaut(req, res);
    }
  });
});

app.get("/collection/*", async (req, res, next) => {
  fs.readFile(indexPath, "utf8", async (err, htmlData) => {
    try {
      if (err) {
        console.error("Error during file reading", err);
        return res.status(404).end();
      }
      if (req.params?.[0]) {
        const result = await getCollectionByAddress({
          collection_address: req.params[0],
        });
        if (!result?.length) return res.send(htmlData);
        const project = result[0];
        // get post info
        // inject meta tags
        let image = "";
        if (project?.headerImage) {
          image = await getCloudFlareImage(project.headerImage);
        }
        htmlData = htmlData
          .replaceAll("__META_OG_TITLE__", project.name)
          .replaceAll("__META_OG_DESCRIPTION__", project.description)
          .replaceAll("__META_OG_IMAGE__", image);
      }

      return res.send(htmlData);
    } catch (e) {
      return sendDefaut(req, res);
    }
  });
});

app.get("/*", async (req, res, next) => {
  sendDefaut(req, res);
});

// listening...
app.listen(PORT, (error) => {
  if (error) {
    return console.log("Error during app startup", error);
  }
  console.log("listening on " + PORT + "...");
});
