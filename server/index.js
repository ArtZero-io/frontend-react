require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs");
const {
  getProjectByAddress,
  getCloudFlareImage,
  getCollectionByAddress,
  getNFTByID,
} = require("./api");
const app = express();

const PORT = process.env.PORT || 3002;
const indexPath = path.resolve(__dirname, "..", "build", "index.html");
console.log(PORT, "port");
// static resources should just be served as they are
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
        if (!result?.length)
          return res.redirect(
            ["https://", req.get("Host"), "/launchpad"].join("")
          );
        const project = result[0];
        // get post info
        // inject meta tags
        let image = "";
        if (project?.headerImage) {
          image = await getCloudFlareImage(project.headerImage);
        }
        htmlData = htmlData
          .replaceAll(
            "ArtZero.io - NFT Marketplace for Aleph Zero Blockchain",
            project.name
          )
          .replaceAll(
            "Discover, create, collect and trade NFTs on Aleph Zero Blockchain with ArtZero.io",
            project.description
          )
          .replaceAll(
            "https://imagedelivery.net/AHcX2l0hfeTsnvkojY22Eg/artzero/preview/1024",
            image
          );
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
        if (!result?.length)
          return res.redirect(
            ["https://", req.get("Host"), "/marketplace"].join("")
          );
        const project = result[0];
        // get post info
        // inject meta tags
        let image = "";
        if (project?.headerImage) {
          image = await getCloudFlareImage(project.headerImage);
        }
        htmlData = htmlData
          .replaceAll(
            "ArtZero.io - NFT Marketplace for Aleph Zero Blockchain",
            project.name
          )
          .replaceAll(
            "Discover, create, collect and trade NFTs on Aleph Zero Blockchain with ArtZero.io",
            project.description
          )
          .replaceAll(
            "https://imagedelivery.net/AHcX2l0hfeTsnvkojY22Eg/artzero/preview/1024",
            image
          );
      }

      return res.send(htmlData);
    } catch (e) {
      return sendDefaut(req, res);
    }
  });
});

app.get("/nft/*", async (req, res, next) => {
  fs.readFile(indexPath, "utf8", async (err, htmlData) => {
    try {
      if (err) {
        console.error("Error during file reading", err);
        return res.status(404).end();
      }
      if (req.params?.[0]) {
        const arr = req.params[0].split("/");
        const result = await getNFTByID({
          collection_address: arr[0],
          token_id: arr[1],
        });
        if (!result?.length)
          return res.redirect(
            ["https://", req.get("Host"), "/marketplace"].join("")
          );
        const project = result[0];
        // get post info
        // inject meta tags
        let image = "";
        if (project?.avatar) {
          image = await getCloudFlareImage(project.avatar);
        }
        htmlData = htmlData
          .replaceAll(
            "ArtZero.io - NFT Marketplace for Aleph Zero Blockchain",
            project.nftName
          )
          .replaceAll(
            "Discover, create, collect and trade NFTs on Aleph Zero Blockchain with ArtZero.io",
            project.description
          )
          .replaceAll(
            "https://imagedelivery.net/AHcX2l0hfeTsnvkojY22Eg/artzero/preview/1024",
            image
          );
      }

      return res.send(htmlData);
    } catch (e) {
      return sendDefaut(req, res);
    }
  });
});

app.use(function (req, res, next) {
  var err = null;
  try {
    decodeURIComponent(req.path);
  } catch (e) {
    err = e;
  }
  if (err) {
    // console.log(err, req.url);
    return res.redirect(["https://", req.get("Host"), "/"].join(""));
  }
  next();
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
