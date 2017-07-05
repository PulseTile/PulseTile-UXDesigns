# PulseTile UX Designs

High fidelity wireframes of core functionality of the PulseTile UI Framework. Designs within all execpt the Legacy folder were produced using Photoshop CC. 

These designs are provided with the aim of aiding UX designers when developing new modules for the PulstTile platform. Further documentation on UX can be found within the [PulseTile Documentation Site](http://docs.pulsetile.com/index.html) or within the [UI Kit](http://showcase2.ripple.foundation/ui-kit.html)

Below is an overview of the top level folder structure:

## Pages Desktop

Contains all wireframes for desktop devices. Wireframes are produced at 1135 pixels wide, the minimum resolution for desktop devices. Sub folders are grouped by module i.e. Allergies, Appointments, Charts etc.

## Pages Mobile

Contains all wireframes for mobile devices. Wireframes are produced at 640 pixels wide, scaled x2 for retina displays.

## UI Kit Desktop

Contains smart object reference files used within by wireframes with /Pages Desktop. This includes headers, footers and and frequently re-used user interface elements such as form controls and tables.

## UI Kit Mobile

Contains smart object reference files used within by wireframes with /Pages Mobile. This includes headers, footers and and frequently re-used user interface elements such as form controls and tables.

## Legacy

Used to store old designs produced in Adobe Fireworks. Image files are stores as multi-page PNG files. A full breakdown of pages can be found within Ripple Wireframes Overview.xlsx within this folder.

Please note that designs within this folder may have been superseeded in design within the Pages Desktop or Pages Mobile folder.

If you have any queries, please raise as an issue or email info@ripple.foundation.

## Automation

A photoshop automation script is provided within the Automation folder. The script will export all PSD files within a selected sub folder to JPEGs.

### Instructions for use

1. Download the script (Automatic preview generation.jsx) from GitHub;
2. Open Photoshop, select File -> Scripts -> Browse, select downloaded JSX file. 
3. Prompt will ask for a input folder, where PSD files are located (or, folder with multiple folders containing PSD files)
4. Second prompt will ask for output folder - i.e. where the JPG files will be located (folder structure will be the same as input folder in case there are multiple folders with source files)
5. Script will automatically crawl through the folders (starting at the input folder), grab every single PSD file, and output the JPG file without any user interaction using input's folder hierarchy.

### Things to note: 

1. JSX script will be visible by PhotoShop only in case it's extension is .JSX or .jsx - PhotoShop will not be able to open file with extension .jsx.txt
2. All other files (not PSD) will be automatically skipped.
