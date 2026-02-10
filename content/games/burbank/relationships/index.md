---
title: "Character Relationship System"
showDate: false
weight: 3
params:
   displayDescription: "Defined the Relationship system between dynamic characters, which propogated into gameplay via Game Effects and further evolved the characters themselves by altering their memories and behavior." 
---

## Overview
Character relationships are at the core of Burbank - they drive the player to make gameplay decisions, explore parasocially, and are a vessel to experience some of Burbank's most emotional moments. I was responsible for creating the base Relationship system that manages all 2-character relationships and the gameplay impact of the player character's choices in-game. All characters started at a base 'Acquaintance' Relationship, but were able to progress through a Map of possible relationships with any given NPC. Each Relationship affected the gameplay differently, and had different conditions to achieve. 

## Relationship Design
As we were designing how Relationships would manifest in the game, we closely examined how people communicate in real life to pinpoint the most exciting moments to play out through our game. This led us to our current design, which involves the player character navigating through a 'Map' of different Relationship stages. All characters start at a default Acquaintance relationship, and depending on how the player interacts with other characters and the world around them, their relationships with individual characters can progress to different pre-prescribed Relationship Stages.

A small snippet of the Relationship Map in which the player's character could navigate:
<div style="display: flex; gap: 1rem;">
  <img src="/relationships/RelationshipGraph2.png" alt="Relationship Map"/>
</div>

For the player to change their character's Relationship with any given character in the Level, they must meet specific criteria tied to the next Stage. Each Stage requires the Player to complete certain actions or gameplay decisions in order to move forward in their relationship. For example, if the Player successfully pulls off a riskier romantic advancement on another character, their Relationship could progress straight to Dating, rather than Flirting. This created more dynamic gameplay not just between playthroughs, but also created complex inter-character relationships in game that drew the Player themselves in.

<div style="display: flex; gap: 1rem;">
  <img src="/relationships/RelationshipGraph1.png" alt="Graph 1"/>
</div>

Relationship Stages were also associated with their own Gameplay Modifiers, Effects, and more. If the Player tried flirting with a character while actively in a Romantic relationship, other NPCs would react accordingly (for better or worse) and the Player receives gameplay buffs and debuffs depending on their runtime choices.

## System Architecture
Relationships systematically have 2 major components to them: a Relationship Data Asset and a Relationship State Actor. The team created the Data Assets during production, and they contributed to the systematic representation of the Relationship Map. Each Relationship pair has an owning State Actor, which is responsible for the involved characters and is the runtime representation of a Relationship. These State Actors keep track of which Relationship the two characters have at any given time and maintain a reference to the relevant Relationship Data Asset. The Properties defined by this Asset dictates this Relationship's effect on the game.

### Relationship Data Asset
We utilized custom Data Assets heavily throughout Burbank to store game states and the Relationship system is no different. The custom Relationship Asset I made is the systematic representation of a Relationship Stage, such as 'Best Friend', 'Married', 'Rival', etc.  

<div style="display: flex; gap: 1rem;">
  <img src="/relationships/RelationshipInfo.png" alt="Relationship Data Asset"/>
</div>

Some of this Asset's Properties include:
- Context to be read during runtime for the involved characters
- Relationships that can be progressed to from this Relationship
- The criteria and gameplay requirements to progress this Relationship
- Effects and gameplay modifiers that occur when the Player character has this Relationship active

The Relationship State Actor holds a reference to one Relationship Data Asset at a time. It reads the Asset's Properties at runtime with gameplay context to determine how to progress throughout the Relationship Map.

### Relationship State Actor
Relationship State Actors are responsible for the relationship between 2 characters at runtime, and are created by the system automatically for all existing characters at a base 'Acquaintance' relationship to start the game. They listen for game state events and delegates to trigger Relationship events as well as applying relevant modifiers and Game Effects to the campaign. 

[talk about code strategies for the state actor here?]
- had to deal with a lot of async processes
- many game systems being managed and tracked, modular programming, event bus
- many delegates
- inventory value

## In-Game Representation
As Players developed their characters' Relationships, they were able to unlock narrative and cinematic moments with the other participant. While the exact Relationship Map is not player-facing, a lot of progression criteria and other relationship state data is able to be viewed in the UI. Any information not immediately clear to the player could be deduced from interactions with characters that the Player character has relationships with passively via gameplay. Environment interactions and gameplay reactions to the player's choices implicitly guided them towards narrative-rich interactions.

<div style="display: flex; gap: 1rem;">
  <img src="/relationships/RelationshipExample.png" alt="In-Game Photo"/>
</div>

[talk more about design reflection of relationships]

<div style="display: flex; gap: 1rem;">
  <img src="/relationships/RelationshipExample2.png" alt="In-Game Photo 2"/>
</div>

[more relationship design]

## Reflection
[code reflection here]