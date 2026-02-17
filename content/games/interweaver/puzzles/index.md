---
title: "Puzzle Systems"
showDate: false
weight: 3
params:
   displayDescription: "Designed and implemented puzzle systems and features in C#, ensuring their complexity and behavior visually and systematically
                        worked with our physics-based player mechanics and the world around them."
---

## Overview
Interweaver is an isometric puzzle-platformer that features systems designed to extend beyond individual puzzles or levels, making it so that we, as designers, could gradually increase the complexity of puzzles while also allowing players to retain and build upon learned skills as they progress. I was responsible for designing and authoring a few of the more foundational systems that other mechanics and puzzles were built upon. I did this modularly to reduce ongoing engineering maintenance as designers iterated on levels, making it easy for new mechanics to be added without reworking existing systems.

Below are a few examples of foundational game mechanics that I wrote that served to accentuate our puzzles and our core player abilities: 

## Sensor System
To avoid overcomplicating puzzles with excessive mechanics, we relied on reusable systems that could be layered and combined in ways to increase difficulty, complexity, and create more fun puzzles. One of the biggest components of this mindset is the **Sensor System**, a system that relied on pressure plates and other sensors that triggered or activated different puzzle elements.

![Sensors In-Game](/images/sensors-1.gif)

It is used heavily in all levels, mainly for driving puzzle logic and platforming progression. It solved the need for one-off mechanics with bespoke logic needing maintenance, and allowed us to build a wide range of puzzles using a single, consistent system.

![Sensor Demo](/images/sensor.gif)

This system was built around a centralized, event-driven **Controller** that decoupled the sensor state from individual object behavior. This allowed any gameplay elemeny to subscribe to sensor state changes without bespoke logic, which allowed designers to create complex puzzles using these systems as a basis to avoid backend dependency issues as we iterated. This separation kept puzzle logic readable, reduced maintenance overhead, and supported scalable puzzle design across the entire game. 

Some examples of gameplay elements that were triggered with sensors include:
- Doors
- Moving or appearing platforms
- Object spawners

![Sensor Demo](/images/sensor2.gif)

Through building this system, I implemented several key architectural patterns, including:
- **Event-Driven Logic**

  Sensors expose UnityEvents rather than directly referencing the GameObjects they affect. Designing the sensors as an event-driven system decoupled activation detection from puzzle logic, supporting creative puzzle design and solutions while maintaining backend stability and preventing softlocks.
- **Multi-Sensor Compatibility**

  Activated GameObjects can be powered or activated with multiple Sensors as part of the core system design, per designer setup. This further enabled them to scale puzzle complexity without requiring new logic.
- **Deterministic State Handling** 
 
  Deterministic state handling is acheived through explicit state flags, guarded Coroutine execution, and sensor state validation, ensuring objects and sensors respond correctly both logically and visually when sensor state changes mid-interaction.

## Light Energy System
To compliment the aforementioned Sensor system, Light became an important concept in the later Levels and was our way of building upon the more intuitive sensors. Light was a way to power other sensors and trigger energy beams, and occasionally even protected the player from hazards. The Light system heavily influenced how we built our later puzzles and platforming challenges as we were able to explore this venue of difficulty through our more intuitive/simple/average mechanic of sensors. 

![Beams In-Game](/images/sensors-2.gif)

This system also includes crystals that could refract or redirect light beams when activated, creating chained interactions that powered other crystals and created layered puzzles. When a crystal became active, its beam activates nearby crystals or sensors by updating centralized light state and triggering activation logic.

![Light Demo](/images/light.gif)

The system worked as a state-driven extension of the Sensor system, and worked in tandem with the sensors and other light crystals to create unique, collision-based puzzle interactions. Light crystals and beams communicated through a centralized state and via activation flags, which allowed light to power multiple systems, including itself. 

Activated crystals emitted focused light beams that detected and powered other crystals and sensors through ray-based collision checks and their shared light state. This allowed light to chain and bounce across multiple objects at runtime, forming dynamic power paths without hard-coded connections. This made light a flexible extension of the Sensor System, supporting more complex puzzles while remaining deterministic and easy to reason about.

![Light Demo](/images/sensor-and-light.gif)

This system supported our design policy of scaling puzzle complexity without increasing engineer workloads, using a small set of flexible mechanics that could be composed in a wide variety of ways. I personally enjoyed designing and coding this mechanic because of its endless potential in puzzle or other gameplay systems, and I wish we had the scope for all of the ideas we had for this mechanic come to life.