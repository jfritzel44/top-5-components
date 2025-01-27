#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Object to store component occurrences
const componentCount = {};

// Function to recursively scan directories
function findComponentFiles(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${directory}:`, err.message);
      return;
    }

    files.forEach((file) => {
      const fullPath = path.join(directory, file);

      fs.stat(fullPath, (err, stats) => {
        if (err) {
          console.error(`Error accessing file ${fullPath}:`, err.message);
          return;
        }

        if (stats.isDirectory()) {
          // Recursively search in subdirectories
          findComponentFiles(fullPath);
        } else if (file.includes(".component.html")) {
          // Process the file if it matches the pattern
          processHtmlFile(fullPath);
        }
      });
    });
  });
}

// Function to read and search component selectors in an HTML file
function processHtmlFile(filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file ${filePath}:`, err.message);
      return;
    }

    // Regular expression to find component selectors (app-*)
    const componentRegex = /app-[a-zA-Z0-9-]+/g;
    const matches = data.match(componentRegex);

    if (matches) {
      console.log(`Component selectors found in ${filePath}:`);
      matches.forEach((match) => {
        console.log(` - ${match}`);

        // Increment count for each occurrence of a component
        if (componentCount[match]) {
          componentCount[match]++;
        } else {
          componentCount[match] = 1;
        }
      });
    }
  });
}

// Function to display the top 5 most used components
function printTopComponents() {
  const sortedComponents = Object.entries(componentCount)
    .sort((a, b) => b[1] - a[1]) // Sort by occurrences in descending order
    .slice(0, 5); // Get top 5 components

  console.log("\nTop 5 most used components:");
  sortedComponents.forEach(([component, count]) => {
    console.log(`${component}: ${count} occurrences`);
  });
}

// Get the directory from command-line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Please provide a directory to scan.");
  process.exit(1);
}

const startDirectory = path.resolve(args[0]);

// Check if the specified folder exists
if (!fs.existsSync(startDirectory)) {
  console.error(`The directory "${startDirectory}" does not exist.`);
  process.exit(1);
}

// Start the search in the specified directory
console.log(`Searching for files containing '.component.html' in: ${startDirectory}`);
findComponentFiles(startDirectory);

// Wait a bit to let asynchronous operations complete, then print results
setTimeout(printTopComponents, 5000);
