import { Request, Response } from "express";
import { ethers } from "ethers";
import { MongoClient, ServerApiVersion } from "mongodb";
var fs = require("fs");
var path = require("path");

var abi = require("../../abi/Regsitry.json");

export default async (req: Request, res: Response) => {
  let uuid = req.body.payload.uuid;
  const uri = `mongodb+srv://plastic:${process.env.MONGO_PASS}@cluster0.jwwc53t.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri);
  await client.connect();

  // console.log(await client.db().admin().listDatabases());
  const database = client.db("plastic");
  const salts = database.collection("salts");
  const randomSalt = makeid(5);

  const doc = {
    uuid,
    randomSalt,
  };

  await salts.insertOne(doc);

  res.json({ message: "Success" });
};

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
