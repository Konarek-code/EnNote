import express from "express";
import cors from "cors";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";
import fetch from "node-fetch";

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const correctWordsFilePath = path.join(process.cwd(), "correctWords.json");
const incorrectWordsFilePath = path.join(process.cwd(), "incorrectWords.json");
const wordsFilePath = path.join(process.cwd(), "words.json");

// Funkcja do zapisu słowa w pliku JSON
const saveWordToFile = (filePath, word, translations) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      const words = err || !data ? [] : JSON.parse(data);

      if (!word || !translations) {
        reject(new Error("Word and translation are required."));
        return;
      }
      const existingWordIndex = words.findIndex((entry) => entry.word === word);
      if (existingWordIndex === -1) {
        words.push({ word, translations });
      } else {
        // Jeśli słowo już istnieje, zaktualizuj tłumaczenia
        words[existingWordIndex].translations = translations;
      }
      fs.writeFile(filePath, JSON.stringify(words, null, 2), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("Word saved successfully.");
        }
      });
    });
  });
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

// Endpoint do zapisywania słów w pliku JSON
app.post("/save-word", (req, res) => {
  const { word, translations } = req.body;

  if (!word || !translations) {
    return res
      .status(400)
      .json({ message: "Word and translation are required." });
  }

  saveWordToFile(wordsFilePath, word, translations)
    .then((message) => res.status(200).json({ message }))
    .catch((error) => {
      console.error("Error saving word:", error);
      res.status(500).json({ message: "Error saving word" });
    });
});

// Endpoint do zapisywania poprawnych słów
app.post("/save-correct-word", async (req, res) => {
  const { word, translations } = req.body;
  if (!word) {
    return res.status(400).send("No word provided.");
  }
  saveWordToFile(correctWordsFilePath, word, translations);
  res.send("Correct word saved.");
});

// Endpoint do zapisywania błędnych słów
app.post("/save-incorrect-word", async (req, res) => {
  const { word, translations } = req.body;
  if (!word) {
    return res.status(400).send("No word provided.");
  }
  saveWordToFile(incorrectWordsFilePath, word, translations);
  res.send("Incorrect word saved.");
});

// Endpoint do pobierania słów do testu
app.get("/get-words", (req, res) => {
  fs.readFile(wordsFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading file" });
    }

    const words = data ? JSON.parse(data) : [];
    res.status(200).json(words);
  });
});

// Endpoint do czyszczenia słów w pliku
app.delete("/clear-words", (req, res) => {
  fs.writeFile(wordsFilePath, JSON.stringify([], null, 2), (err) => {
    if (err) {
      console.error("Error clearing file:", err);
      return res.status(500).json({ message: "Error clearing file" });
    }

    res.status(200).json({ message: "Words cleared successfully!" });
  });
});

app.get("/get-correct-words", (req, res) => {
  fs.readFile(correctWordsFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading file" });
    }

    const words = data ? JSON.parse(data) : [];
    res.status(200).json(words);
  });
});
// Uruchomienie serwera
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
