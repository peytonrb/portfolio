---
title: "Player Mechanics"
showDate: false
weight: 1
params:
   displayDescription: "Implemented core player mechanics, including physics-based abilities, platforming movement, and more in C#, ensuring that
                        navigating the main character did not just work well systematically but also felt good to play."   
---

## Overview
Interweaver's gameplay was unique in that the player's main character swapped between two different characters with unique mechanics per level: the Weaver, our main character, and a Familar that was unique to each Level. The Weaver has two core player mechanics that were the root of all gameplay and drove the majority of interactions, a **Weave** ability and a **Possession** ability. 

As part of my role as an Engineer, I was responsible for developing the entire **Weave** ability and its components. This involved a game system that allowed the Player to manipulate objects in the game world by translating, rotating, and linking other objects together to solve physics-based puzzles and platforming challenges. I also was responsible for a variety of features relating to both the Weaver and the Familiars, which will also be discussed below.

## Weave Ability
The Weaver's **Weave** ability is a physics-based interaction mechanic that allows players to manipulate objects in game space using the mouse. Weaving has two main functions: moving objects around the space and combining multiple to solve puzzles or progress through platforming sections. Players were also allowed to rotate objects as needed when Weaving.

<div style="display: flex; gap: 1rem;">
  <img src="/interweaver/player-mechanics/weave-demo.gif" alt="Weave Ability Demonstration Temp"/>
</div>

### System Architecture
Weaving was managed through a **Weaveable Manager**, a **custom GameObject** for all Weaveable objects, and a **Controller** script on the Weaver, separating logic to keep the system modular, easy to iterate on, and debug.

I want to call out a few aspects of this system that presented notable technical and design challenges, and discuss how they were resolved.

**Mouse-To-World Space Mapping**

The core challenge wasn't just mapping the mouse to world space - it was ensuring that every interaction made sense in both the player's and the Weaver's perspectives in an isometric environment, and was consistent across input devices. I accomplished this using a combination of raycasting and precise physics handling to achieve smooth and intuitive movement, and also ensure interactions with the environment were visually and functionally consistent.

```
```

**Snapping Points on Weaveables**

[dealt with snapping points on objects and setting them by default to make easy for designers, even on organically shaped objects]