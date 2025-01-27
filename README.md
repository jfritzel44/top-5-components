Component Usage Scanner for Angular Projects

This script scans the src directory of your Angular project and outputs the top 5 most used components based on occurrences in .component.html files.

How to Use

Ensure your project structure follows this pattern:

/parent-directory
├── scan.js
└── root/
    └── src/

Run the script using the following command:

node scan.js root/src

scan.js should be placed in the parent directory of root.

root/src is the relative path to your Angular project's src directory.

Example Output

If the script finds the following component usages:

<app-header></app-header>
<app-footer></app-footer>
<app-footer></app-footer>

The script will output:

Searching for files containing '.component.html' in: /your/project/root/src
Component selectors found in /your/project/root/src/components/example.component.html:
 - app-header
 - app-footer
 - app-footer

Top 5 most used components:
app-footer: 2 occurrences
app-header: 1 occurrences

Notes

Ensure that Node.js is installed and available in your system's PATH.

The script processes files asynchronously, so results may take a few seconds to display.

If the specified directory does not exist, the script will exit with an error.
