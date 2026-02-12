---
title: "Procedural Interior Decoration"
showDate: false
weight: 2
params:
   displayDescription: "Created a custom Unreal Engine plugin that procedurally decorates interior gameplay space at runtime based on the unique story being followed by the player using World Partition, PCG, and custom Socket Actors."
---

## Overview
Project Burbank is a storytelling platform for players to immerse themselves in any narrative imaginable - it takes players' decisions and alters the campaign at hand to create surprising, one-of-a-kind gameplay experiences. I supported this characteristic by creating a procedural interior decoration system that intakes information about the player's campaign at runtime and filling subsequent Levels with contextually appropriate assets, while also maintaining navigable space and realistic orientations.

This system was not only instrumental in establishing the mood and feel of a Level in game, but it was also visually and mechanically obvious if there were any logical flaws. It also had to handle external systems like lighting, BP Actors in the Level, player-placed objects, cameras, and more. It was imperative that I ensured this system was able to handle not only our technical limitations, but also uplifted the player's experience. 

This system was built in **C++** with **Blueprint**, and utilized **World Partition**, **PCG**, and more.

## In-Game Representation
Each Level is constructed at design-time with base 3D models as a greybox to outline the general shape and orientation of objects in space. Each Level in UE is constructed with a variety of Data Layers containing different Socket Actors to hold contextual data and act as a base in order to preserve character pathfinding and Actor Slot requirements. The Decoration system then reads the Socket Actors and the current campaign information and chooses assets to sort and where to place them accordingly.

You can see 2 base Layout examples from our Apartment Level below: 
<div style="display: flex; gap: 1rem;">
  <img src="/burbank/set-deco/SocketLayer1.png" alt="Default Data Layer" style="width: 60%;" />
  <img src="/burbank/set-deco/SocketLayer2.png" alt="Watch Party Data Layer" style="width: 60%;" />
</div>

After the Decoration system finishes placing assets on the determined base layout, the final in-game Level now contextually fits the unique story being played out and also furthers player immersion:
<div style="display: flex; gap: 1rem;">
  <img src="/burbank/set-deco/DecoratedLevel.png" alt="Default Data Layer"/>
</div>

## Technical Spec
As players progressed through their narrative campaigns, it was important that the Levels their characters spawned into visually complimented and matched the aesthetic of the story being played out. This procedural interior Level decoration system intakes data about the active Story, available Assets to populate the space, and more to produce an accurately dressed Level.

Below I've summarized the official Technical Design Document I wrote for this system to give an idea of how it worked.

### Summary
Each World Partition Level was built as a greyboxed space using templated Data Layers instead of fixed Assets. Designers constructed these Layers with Sockets, which were Assets embedded with metadata and natural language descriptions responsible for holding space for NavMesh and cinematic cameras. The Decoration system queried the Sockets in the space once it chose the most relevant Data Layer and populated them with Assets relevant to the runtime narrative. From there, designer and auto-placed Inclusion Volumes marked up where PCG spawns non-blocking decorative clutter, ensuring the space appeared engaging, immersive, and relevant to the story at the end. 

All of this logic exists in a **Plugin** and includes an **Editor Module** for custom property, detail, and editor customizations to support designers as they construct each Level.

### Custom Classes
**DecoDataLayer**

The need for **DecoDataLayers** arose when I realized that a full procedually decorated interior space, also because the player is able to edit their space, would cause too much instability between character navigation, cinematic cameras, and more. **DecoDataLayers** are extended from the base **DataLayerAsset** class and are used to create all Data Layers that can be evaluated by the Decoration system.

Some Properties include:
- A natural language FText description of the space and example use-cases
- Gameplay Tag container for relevant context tags

**DecoSocketComponent**

The **DecoSocketComponent** was added in-editor to any Actor in a DecoDataLayer to greybox the space. This component dictates what Actors and what properties about them are swappable. These Components subscribe to policies that dictate what about the Actor they are on can be affected by the system. Example policies are:
- Blueprint: the entire BP Actor can be changed
- Static Mesh: the Mesh of the Actor can be changed
- Material: certain Materials can be changed
- Group: the Actor is changed exactly the same as another Socket

These Components allowed us to build more modular Data Layers because we could nest Components with varying degrees of complexity for a more unique space each playthrough (ie. a Couch with a Material Component policy could be placed by the Deco system in an Component that allows BP subtitution). These Sockets are responsible for applying their own customizations once they are given narrative details by the DecoActor. It is also possible to override query behavior on Sockets for different Assets, so not all Sockets evaluate the Asset Libraries the same as well.

Some Properties on the Socket Components include:
- The policy to follow
- A natural language FText description of the expected object
- Gameplay Tag container for relevant context tags

It is also important to note here that the Transforms and orientations of Assets is a major constraint here. To account for this, the Asset Libraries themselves reject Assets that would not fit in the expected Sockets to avoid hard-to-follow bugs down the line.

**DecoActor**

The **DecoActor** is responsible for centralizing most of the logic pertaining to the Decoration System. A single **DecoActor** is spawned automatically the first time a Level is loaded into a Show for a particular interior Set at runtime. It is important to mention that a Level can get used for multiple different Set types (ie. the 'Bedroom' level could get separate Decorations for 'Character A's Bedroom' and 'Chararacter B's Bedroom'). Therefore, one Level may have multiple different runtime occurences of DecoActors as the player progresses in their campaign. 

**DecoActors** handle the decoration of a Set when they get initialized and are also responsible for polishing existing Decorations as Sets are revisited. If the player revisits a Set with an existing **DecoActor**, a new one is not created and the existing one redecorates the room. 

Some other responsibilities include:
- Maintaining Sockets
- Querying Asset Libraries
- Activating proper Data Layers (including non-Deco Layers like Weather, etc.)
- Validate Decoration placements

I also made it possible to subclass the **DecoActor** to customize behavior for different Level types. For example, the default Decoration logic did not satisfy outdoor Levels the way it did indoor Levels. Designers were able to configure what schema was followed during runtime. I also supported Editor-only testing by exposing **DecoActor** functionality to the editor, allowing designers to test the Decorations without needing to run the game.

**DecoVolume**

This system heavily utilized Procedural Content Generation (PCG) to decorate the space once all navigation-blocking objects have been placed. I created custom **DecoVolumes** for designers and marked objects to spawn, and are the area in which PCG utilizes to decorate. These Volumes get sampled and their relevant PCG Graphs complete the final layer of decoration. 

Designers can specify on the Volume which PCG Graphs will be used to decorate the space within. These Volumes respect existing Decorations, player-placed objects, and cameras. Multiple graphs can apply to each Volume, and a hierarchy of importance between graphs is established in order of appearance in the Property to determine which graph's objects are prioritized. 

**DecoLibrary**

We utilized hierarchial, random containers built in-house similar to Unreal Choosers to store the Asset Libraries. These containers held entries that were able to be populated with the Assets and tag them with necessary metadata. Sockets queried these Libraries depending on what type of Asset they were expecting. These Libraries rejected Assets that fell outside Transform and Orientation requirements and also handled random choosing behavior. 

### System Architecture
There are two main processes that the Decoration system is responsible for: Decorating and Redecorating. The first time a Level is decorated is the most important, because Decorations persist as the Level gets reused in the same narrative, just updated. 

<div style="display: flex; gap: 1rem;">
  <img src="/burbank/set-deco/DecoDesign.png" alt="Default Data Layer"/>
</div>

Assets are selected from the queried Libraries based on both runtime narrative context and the metadata provided by the populated Sockets. The Decoration system collects this context and passes the Socket and Asset descriptions through a proprietary embeddings subsystem, which produces similarity scores based on natural-language semantics. These scores are evaluated alongside structured metadata constraints to determine the best match for each Socket. The highest-scoring Assets are then utilized for the Sockets.

Another concept that I utilized heavily in this system is the idea of **Pinned** objects. We did not want the system to entirely redecorate a Level every time a player revisted it. However, as to real life, it also would not make sense for a space to stay identical after the campaign and time have continued to progress. The Decoration system is responsible for systematically Pinning objects that are determined as characteristic to the scene, and these Pinned objects will persist with the Set until the campaign has finished. Pinned objects often included:
- Navigation-Blocking Furniture
- Narrative-important Assets
- Characteristic decorative pieces
- Player-placed Assets

## Reflection
This system was both technically involved and highly visible to players, which made correctness, flexibility, and iteration speed equally important. Building it shaped how I approach large-scale, player facing systems, and taught me some of these key learnings:
- **Policy-based design** decoupled configurations and schemas from core decoration logic, allowing the system to remain modular and free of dependencies.
- **Early Asset validation** at the library level prevented subtle runtime issues and shifted focus from many small, reactive fixes and towards a more proactive, intentional approach to data authoring. 
- Implementing Sockets using **component-based architecture** allowed us to build Levels with layered policies, creating more complex and varied results while still respecting gameplay requirements and narrative accuracy.
- **Tag-driven Pipelines** streamlined Asset management and filtering, allowing designers to mark up assets as needed while integrating cleanly with the code backend without limiting variation.