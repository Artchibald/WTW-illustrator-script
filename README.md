<div id="top"></div>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="">
    <img src="imagesInReadme/WTW.png" alt="Logo" width="180" height="180">
  </a>

<h3 align="center">A Typescript file that converts into ECMA 3 target JS file for use in Adobe Illustrator 2022. JS script that automates icon export processes in Adobe Illustrator</h3>

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

This script automates exports from a specific Illustrator template contained in this repo.

<p align="right">(<a href="#top">back to top</a>)</p>

# Useful links.

<a href="https://ai-scripting.docsforadobe.dev/">Adobe Illustrator API documentation</a> > This is where all the commands are referenced for re-use.
<a href="https://extendscript.docsforadobe.dev">Extend Script</a> 

# Built with

- VS code
- VS code extension extend script debugger by Adobe: faster load with play button and much better debugging. Extensions > Install  "ExtendScript Debugger". Follow instructions for better debugging, script stop break points and console returns achieved with this. This is not as good as the Extendscript toolkit that only works on Windows.
- Uses node js dependency types for adobe NPM https://registry.npmjs.org/types-for-adobe
- SOON Extendscript toolkit on Windows

# How to use

- Use VS code > Main Menu > Terminal > Run build Task > Choose Build or Watch to convert .TS to .JS

- Set up the Extendscript toolkit debugger VS extension

- You will need the Extendscript toolkit from Adobe. This only works on Windows since OS Catalina, so you'll probably need Windows for better debugging.


```

git pull... repo etc
node installed?
typescript installed?
npm i
open .ai in Illustrator
File > Scripts > Other Scripts > Add WTW_main_script.js


```

# Graphical representation

<img src="imagesInReadme/outline.png" alt="outline" width="400">

# Illustrator object  model

<img src="imagesInReadme/objectmodel.png" alt="outline" >

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

# Bugs

Be sure you allocate time for testing on MacOS and Windows

If all layers are on show only first

# To be done

GET Extendscript toolkit for Windows!

Time off half day tue 31 MAY, need afternoon off

Tuesday 7 June need day off please

Change functions to arrow functions

change all vars to lets

URGENT DISCREPANCY BETWEEN AI FILE AND THE ICON STYLE GRID PDF!!

if all layers on turn them off before running

ignore locked guides layer

if locked unlock

# Questions for client

Why are there 2 templates core and expressive?

# Timescale breakdown

## Day 1

Github repo set up. Review.
Typescript implementation into repo.
Implemented the latest Javascript tech stack, called Typescript. This is a language created by Microsoft recently, the typescript purpose is to make Javascript less error prone. It is working as expected and suggesting code snippets as it should in my code editor which is great. This will be very useful as we progress.
Reviewed the Javascript code supplied by the client and typescript has flagged some issues I need to address. Parts of the script are not working as expected. I want to re-use as much as I can to save time, this is on going. If I have any new breakthroughs here, I will let you know.
Started writing the new version of the script. Took a while to figure out how to declare the size of the exported pngs. Successfully managed to turn on and off multiple background color layers in the script, and automatically save a set of icons in the 512x512 category with different background colours. These include the color in the filename too. This has lead me to think about how to refactor my code to avoid unnecessary repetitions as I progress.
My next task for this afternoon is to sketch/draw out the functionality/requirements of this script based on the brief from the client. I think that will be useful to make sure we are on the same page. I will send over soon. I will add this to the repository on github.com too.

## Day 2

Nice breakthrough today.
Re-used some parts of the supplied scripts.
The script currently does:

1. show instructions dialog alert
2. creates a folder called 512x512 next to where the illustrator file is saved.
3. Loops through all the icons, however many there may be (12 currently), and saves them as 512x512 PNGS against the background colors (3 currently). 3 x 12 = 36 pngs created. If there were more, it would create more automatically thanks top the loop I created today.
   Now I just have to duplicate that script action for the other png sizes required which should be quite easy: 24x24, 32x32, 48x48, 64x64.
   Next I will write something similar to generate the svgs and EPS versions.
   Saving them with the correct filenames as per client request will be quite easy as it is working as expected.
   Then the client brief talks about a "Contact sheet". A kind of map of all the created assets I assume. I haven't got to this part yet.
   I think this is good progress for day 2.
   I have created an unlisted youtube video to show you the progress:
   https://www.youtube.com/watch?v=N26Mwt0gQoo
   Because I can't attach files to this chat.

## Day 3

Improved readme

Fixed a few major bugs this morning around showing and hiding layers

Successfully exported all correct pngs: 24, 32, 48, 64, 300, 512

Trying to get SVG and EPS to export but I am still trying to get these 2 to work. Hoping to have them ready before Monday.

Some bits we will need soon from the design team:

- Discuss the exact folder structure of the all assets
- Discuss the exact file naming convention
- Can I get an example of the 'Contact sheet' mentioned in the brief please?

[outline]: imagesInReadme/outline.png

[objectmodel]: imagesInReadme/objectmodel.png


## Day 4 Sat fustrated weekend free work

Got SVG and EPS JUST working 4 hours
Need to figure out MAJOR blocker folder export issue
Did lots of version checks, downgraded output from typescript to ECMA 3
Tried to get extendscript toolkit but it only works on windows because it si 32 bit and os catalina only supports 64 bit now. 