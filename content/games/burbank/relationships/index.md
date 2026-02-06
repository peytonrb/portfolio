---
title: "Relationships and Character Memories"
showDate: false
weight: 3
params:
   displayDescription: "Defined the Relationship system between dynamic characters, which propogated into gameplay via Game Effects and further evolved the characters themselves by altering their memories and behavior." 
---

## Overview
Relationships are at the core of Project Burbank - they drive the player to make gameplay decisions, explore parasocially, and are a vessel to experience some of Burbank's most emotional moments. I was responsible for creating the base Relationship system that manages all 2-character relationships and the gameplay impact of the player character's choices in-game. All characters started at a base 'Acquaintance' Relationship, but were able to progress through a Map of possible relationships with any given NPC. Each Relationship affected the gameplay differently, and had different conditions to achieve. 

A small snippet of the Relationship Map in which the player's character could navigate:
<div style="display: flex; gap: 1rem;">
  <img src="/relationships/RelationshipGraph2.png" alt="Relationship Map"/>
</div>

## Relationship Design
<div style="display: flex; gap: 1rem;">
  <img src="/relationships/RelationshipGraph1.png" alt="Graph 1"/>
</div>

## System Architecture
Relationships systematically have 2 major components to them: a Relationship Data Asset and a Relationship State Actor. The team created the Relationship Data Assets during production and built them into the Relationship Map. The Relationship State Actors then navigate their character through these Relationships as the player interacts with the world and other characters. Only one StateActor is created per character-pair, and is the runtime representation of the Relationship between these two characters. The Properties defined by the Relationship Data Asset assigned to the State Actor are what dictate the relevant effects on the game.

### Relationship Data Asset
<div style="display: flex; gap: 1rem;">
  <img src="/relationships/RelationshipInfo.png" alt="Relationship Data Asset"/>
</div>

### Relationship State Actor

## Gameplay Outcome and Learnings