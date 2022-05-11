<div id="top"></div>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="">
    <img src="images/WTW.png" alt="Logo" width="180" height="180">
  </a>

<h3 align="center">A JS script that automates icon export processes in Adobe Illustrator</h3>

  <p align="center">
    Useful links 
    <br />
    <a href="https://github.com/Artchibald/WTW-illustrator-script"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    ·
    <a href="https://github.com/Artchibald/WTW-illustrator-script/issues">Report Bug</a>
    ·
    <a href="https://github.com/Artchibald/WTW-illustrator-script/issues">Request Feature</a>
        ·

  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
<ol>
   <li><a href="#WTF">Overview</a></li>
   <li><a href="#xxx">TBC</a></li>
      <li><a href="#Promises">TBC</a></li>
   <li>
      <a href="#Core-types">TBC</a>
      <ul>
         <li><a href="#Type-assignment-and-type-inference">TBC</a></li>
         <li><a href="#The-core-job-of-typescript">TBC</a></li>
      </ul>
   </li>
</ol>
</details>

# Overview

This script automates exports from Illustrator.

<p align="right">(<a href="#top">back to top</a>)</p>

# Useful links.

<a href="https://ai-scripting.docsforadobe.dev/">Adobe Illustrator API documentation</a> > This is where all the commands are referenced for re-use.

# How to use this script?

1. Open Adobe illustrator
2. Open the icons template in Illustrator that you will find in this repository (no others, just this one).
3. Go to File > Scripts > Other Scripts...
4. Select the JS file from this repo called XXXXXXXX.js, it will run automatically.
5. View the exported assets in your folder XXXXXX.

<p align="right">(<a href="#top">back to top</a>)</p>

# Brief from client to be implemented

- Take an established artboard (provided by WTW in Illustrator format)
- Set up a script that takes any icon on this artboard and exports it in the prescribed sizes, colors, and file formats —
- the attached Illustrator file sample has layers for each prescribed color for the background and layers for the two color options for the icon that sits - on the square background to demonstrate the options needed.
- PNG - 24, 32, 48, 64, 512 (this is for web, email ppt)
- PNG-300 (for PPT – needs to be grouped separately from the other sizes in above bullet)
- SVG and EPS - 64x64 (two file types)
- Leverage a naming convention (predetermined from WTW that includes icon color, background color, size for pngs)
- TBD
- Possible examples:
- Accuracy-black-UV-64, Accuracy-black-submarine-64, Accuracy-black-mandarin-64, etc.
- Accuracy-dkUV-UV-24, Accuracy-dkUV-submarine-24, Accuracy-dkUV-mandarin-24, etc.
- Set up a script to read files and export a contact sheet
- Automate a process by which files can be stored in one place, wrapped up with contact sheet and Zipped?
- TBD:
- Grouped in folders by Category and by filetype, for example Business Communication SVG, Business Communication EPS, Business Communication PNG (all sizes except 300), Business Communication PPT (300 size only)

# Timescale breakdown

## Day 1

Github repo set up. Review.
Typescript implementation into repo.
