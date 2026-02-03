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

## Key Systems
- Procedural Content Generation (PCG)
- World Partition & Data Layers
- Choosers (RandTable?)
- Schemas and Socket Actors

## In-Game Representation
Each Level is constructed at design-time with base 3D models as a greybox to outline the general shape and orientation of objects in space. Each Level in UE is constructed with a variety of Data Layers containing different Socket Actors to hold contextual data and act as a base in order to preserve character pathfinding and Actor Slot requirements. The Decoration system then reads the Socket Actors and the current campaign information and chooses assets to sort and where to place them accordingly.

You can see 2 base Layout examples from our Apartment Level below: 
<div style="display: flex; gap: 1rem;">
  <img src="/set-deco/SocketLayer1.png" alt="Default Data Layer" style="width: 60%;" />
  <img src="/set-deco/SocketLayer2.png" alt="Watch Party Data Layer" style="width: 60%;" />
</div>

After the Decoration system finishes placing assets on the determined base layout, the final in-game Level now contextually fits the unique story being played out and also furthers player immersion:
<div style="display: flex; gap: 1rem;">
  <img src="/set-deco/DecoratedLevel.png" alt="Default Data Layer"/>
</div>

## Technical Spec
Below I've condensed the official Technical Design Document I wrote for this system to give an idea of how the system worked. 