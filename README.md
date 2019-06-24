# Lustful Void Edits
This is an adult mod for Stellaris, inspired by [Lustful Void](https://www.loverslab.com/topic/119724-mod-stellaris-lustful-void-wip). It patches some of LV's errors, tweaks how it works, and adds new content. All credit to Lithia<3 for the Cow buildings and traits.

## What's in here
This mod is strongly compatible with Lustful Void - it will load without errors if LV isn't installed, but you'll be missing out on a lot if you don't use them together.

With that said, this mod:
- Adds the Sexuality tradition tree, which culminates by giving sex work jobs to every planet.
- Adds a new technology, Sex Trade Policy, which unlocks a policy to replace some clerk jobs in Commercial Zones with sex work.
- Adds a new building tree, the Dairy Farm where you can milk your pops, and a related policy. This is partly copied from Lustful Void, but with improved descriptions and fixed bonus stacking.
- Adds several dozen new sexy species traits, originally from Lustful Void but with changed balance, more accurate descriptions, and fewer bugs (they now stack properly).
- Removes the Brothel, Bordello, Sex Market and Sex City buildings that Lustful Void adds. Also removes about 1/3rd of LV’s traits, mostly those that feel redundant or unbalanced to me.

In short, rather than a brand new building chains (which duplicated Commercial Zones and Holo Theaters), sex work is integrated more closely with Stellaris base game content.

Because the Traditions screen isn't dynamic, this mod is incompatible with any other mod that adds more Tradition trees. Sorry.

## Compiling
Because of the number of traits Lustful Void adds, there ended up being a *ton* of duplication in the jobs file. Thus, I pulled it out and added templating. To build your own release, you'll now need [node.js](https://nodejs.org/en/). This is free and available for all platforms. You'll also need [imagemagick](http://www.imagemagick.org/script/index.php) installed for the `convert` program, which this mod uses to change its png assets into dds. I've only tested compilation on Linux, but there's no reason it shouldn't work on Windows or Mac as well.

```
# Installs the dependencies. You only need to do this once.
npm install

# Builds the 'mod' folder from 'src', then watches src/ for any changes.
npm start

# Builds a zip file, ready for uploading to github as a release
npm run release
```
