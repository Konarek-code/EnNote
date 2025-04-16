import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { db } from "./utils/firebase.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const saveWordToFirestore = async (collectionName, word, translations) => {
  if (!word || !translations) {
    throw new Error("Word and translation are required.");
  }

  await db.collection(collectionName).doc(word).set({ translations });
};

app.post("/translate", async (req, res) => {
  const { text, target_lang } = req.body;

  if (!text || !target_lang) {
    return res.status(400).json({ error: "Missing text or target language" });
  }

  try {
    const response = await fetch("https://api-free.deepl.com/v2/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `DeepL-Auth-Key ${process.env.DEEPL_AUTH_KEY}`,
      },
      body: new URLSearchParams({
        text,
        target_lang,
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error translating:", error);
    res.status(500).json({ error: "Translation failed" });
  }
});

const checkIfWordExists = async (word) => {
  const collections = ["words", "correctWords", "incorrectWords"];

  for (const collection of collections) {
    const doc = await db.collection(collection).doc(word).get();
    if (doc.exists) return true;
  }

  return false;
};

app.post("/save-word", async (req, res) => {
  const { word, translations } = req.body;

  if (!word || !translations) {
    return res
      .status(400)
      .json({ message: "Word and translation are required." });
  }

  try {
    const wordExists = await checkIfWordExists(word);
    if (wordExists) {
      return res
        .status(400)
        .json({ message: `"${word}" already exists in the database.` });
    }

    await saveWordToFirestore("words", word, translations);
    res.status(200).json({ message: `"${word}" has been successfully added.` });
  } catch (error) {
    console.error("Error saving word:", error);
    res.status(500).json({ message: "Error saving word" });
  }
});

app.post("/save-correct-word", async (req, res) => {
  const { word, translations } = req.body;

  if (!word) {
    return res.status(400).send("No word provided.");
  }

  try {
    await saveWordToFirestore("correctWords", word, translations);
    res.send("Correct word saved.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving correct word.");
  }
});

app.post("/save-incorrect-word", async (req, res) => {
  const { word, translations } = req.body;

  if (!word) {
    return res.status(400).send("No word provided.");
  }

  try {
    await saveWordToFirestore("incorrectWords", word, translations);
    res.send("Incorrect word saved.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving incorrect word.");
  }
});

app.get("/get-words", async (req, res) => {
  try {
    const snapshot = await db.collection("words").get();
    const words = snapshot.docs.map((doc) => ({
      word: doc.id,
      translations: doc.data().translations,
    }));
    res.status(200).json(words);
  } catch (error) {
    console.error("Error getting words:", error);
    res.status(500).json({ message: "Error getting words" });
  }
});

app.delete("/clear-words", async (req, res) => {
  try {
    const snapshot = await db.collection("words").get();

    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    res
      .status(200)
      .json({ message: "Words cleared successfully from Firebase!" });
  } catch (error) {
    console.error("Error clearing words:", error);
    res.status(500).json({ message: "Error clearing words" });
  }
});

app.get("/get-correct-words", async (req, res) => {
  try {
    const snapshot = await db.collection("correctWords").get();
    const words = snapshot.docs.map((doc) => ({
      word: doc.id,
      translations: doc.data().translations,
    }));
    res.status(200).json(words);
  } catch (error) {
    console.error("Error getting correct words:", error);
    res.status(500).json({ message: "Error getting correct words" });
  }
});

app.get("/get-incorrect-words", async (req, res) => {
  try {
    const snapshot = await db.collection("incorrectWords").get();
    const words = snapshot.docs.map((doc) => ({
      word: doc.id,
      translations: doc.data().translations,
    }));
    res.status(200).json(words);
  } catch (error) {
    console.error("Error getting incorrect words:", error);
    res.status(500).json({ message: "Error getting incorrect words" });
  }
});

app.patch("/promote-word", async (req, res) => {
  const { word, fromCollection } = req.body;

  if (!word || !fromCollection) {
    return res
      .status(400)
      .json({ message: "Word and fromCollection are required." });
  }

  const promotionMap = {
    incorrectWords: "correctWords",
    correctWords: "expertWords",
  };

  const toCollection = promotionMap[fromCollection];
  if (!toCollection) {
    return res
      .status(400)
      .json({ message: `Cannot promote from ${fromCollection}.` });
  }

  try {
    const docRef = db.collection(fromCollection).doc(word);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res
        .status(404)
        .json({ message: `"${word}" not found in ${fromCollection}` });
    }

    const data = doc.data();

    await db.collection(toCollection).doc(word).set(data);
    await docRef.delete();

    res.status(200).json({ message: `"${word}" promoted to ${toCollection}.` });
  } catch (error) {
    console.error("Error promoting word:", error);
    res.status(500).json({ message: "Error promoting word" });
  }
});
app.get("/get-weekly-words", async (req, res) => {
  const collections = ["incorrectWords", "correctWords"];
  const allWords = [];

  try {
    for (const collection of collections) {
      const snapshot = await db.collection(collection).get();
      const words = snapshot.docs.map((doc) => ({
        word: doc.id,
        translations: doc.data().translations,
        level: collection,
      }));

      allWords.push(...words);
    }

    res.status(200).json(allWords);
  } catch (error) {
    console.error("Error getting weekly words:", error);
    res.status(500).json({ message: "Error getting weekly words" });
  }
});

app.get("/get-monthly-words", async (req, res) => {
  try {
    const snapshot = await db.collection("expertWords").get();
    const words = snapshot.docs.map((doc) => ({
      word: doc.id,
      translations: doc.data().translations,
    }));
    res.status(200).json(words);
  } catch (error) {
    console.error("Error getting monthly words:", error);
    res.status(500).json({ message: "Error getting monthly words" });
  }
});
app.get("/expertWords", async (req, res) => {
  try {
    const snapshot = await db.collection("expertWords").get();
    const words = snapshot.docs.map((doc) => ({
      word: doc.id,
      translations: doc.data().translations,
    }));
    res.status(200).json(words);
  } catch (error) {
    console.error("Error getting expert words:", error);
    res.status(500).json({ message: "Error getting expert words" });
  }
});

// Uruchomienie serwera
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
