# Lustful Void Edits
This is a patch-mod for Stellaris, updating the [Lustful Void|https://www.loverslab.com/topic/119724-mod-stellaris-lustful-void-wip] mod with some personal tweaks. All credit to Lithia<3, I claim none.

## What's in here
This mod depends on Lustful Void - it won't work without it.

With that said, this mod:
- Removes the Brothel, Bordello, Sex Market and Sex City buildings
- Adds a new technology, Sex Trade Policy, which unlocks a policy to replace some cleric jobs in Commercial Zones with sex work.
- Adds the Sexuality tradition tree, which culminates by giving sex work jobs to every world.

In short, rather than a brand new building chains (which duplicated Commercial Zones and Holo Theaters), sex work is integrated more closely with Stellaris base game content.

Because the Traditions screen isn't dynamic, this mod is incompatible with any other mod that adds more Tradition trees. Sorry.

## Compiling
Because of the number of traits Lustful Void adds, there ended up being a *ton* of duplication in the jobs file. Thus, I pulled it out and added templating. To build your own release, you'll now need node.js. This is free and available for all platforms.

```
# Installs the dependencies. You only need to do this once.
npm install

# Builds the 'mod' folder from 'src', then watches src/ for any changes.
npm start

# Builds a zip file, ready for uploading to github as a release
npm run release
```
