---
title: "Shaders & VFX"
showDate: false
weight: 2
params:
   displayDescription: "Authored custom shaders, particle systems, and visual effects using Shader Graph, HLSL, and VFX Graph and integrated them directly with
                        gameplay and animation systems."
---

## Overview
A main goal that I had as Creative Director was to deliver an experience that was both fun to play but also visually appealing and whimsical, which immersed the player in the magical world Interweaver took place in. The Art Team and I settled on a **stylized, almost hand-drawn aesthetic** early into production, which was ideal for our smaller team of emerging artists. 

I personally played a key role in this initiative as the main Technical Artist, and was responsible for the majority of shaders, VFX, and post-production effects that shipped with the final product and helped define the game's visual identity. I was also responsible for ensuring they were seamlessly integrated into the game's systems and animations without causing any performance issues, including lag or frame drops. 

## Shaders/HLSL
I was responsible for authoring the vast majority of shaders used throughout Interweaver, which were applied to objects, the game environment, and supplemented visual effects. These shaders were crucial in defining the game's distinct visual aesthetic. I created most of my shadersk using **ShaderGraph** in Unity, with a few coupled with **HLSL** for more advanced effects and to optimize performance when necessary.

### Water Shader
One of the most challenging shaders I created for this project was our Water Shader. This involved a combination of **ShaderGraph** and **HLSL** and was not only challenging to conceptualize, but to translate into a functional shader that met both aesthetic and performance requirements.

[water shader photo here]

[water shader snippet here]

#### Ripple Shader
To compliment the Water Shader and to ensure the player's movement felt natural as they moved through the water, I created an accompanying Ripple shader that trailed the player in water. This was different because it [was not a light based shader and instead dealt with ___]. It also had to deal with the [water shader which was transparent and had oscillation in waves, which made layering anything on top difficult].

<div style="display: flex; gap: 1rem;">
  <img src="/interweaver/vfx/temp/ripple.gif" alt="Temp Ripple"/>
</div>

[ripple shader snippet here]

This shader is essentially a [custom Render Target] 

### Environment and Character Cel Shader
To achieve the intended hand-painted, stylized aesthetic, I created a csutom cel shader that defined the visual style of the game. It was really important that the shader _______.

[cel shader before and after]

[in game image]

[snippet here]

[While cel shaders are a fairly basic concept, we uniquely dealt with the challenge of _____].

## VFX Showcase
Along with the Shaders, I created 30+ VFX and particle systems for Interweaver to supporting the game's visual direction and providing players with meaningful feedback as they used mechanics and progressed through the game. These were mainly done in Unity's **VFX Graph** and involved custom 3D models, textures, and calculations for particle behavior. 

Here I will showcase most of the effects I made for Interweaver below. I tried to include the software used to create the effects as well as any additional interesting information:

(all of these are temp until i can grab better images tehe :)

<div style="display: flex; gap: 1rem;">
  <img src="/interweaver/vfx/temp/orb.gif" alt="Temp Orb"/>
</div>

<div style="display: flex; gap: 1rem;">
  <img src="/interweaver/vfx/temp/teleport.gif" alt="Teleport Temp" style="width: 60%;" />
  <img src="/interweaver/vfx/temp/teleport-ingame.gif" alt="Teleport In-Game Temp" style="width: 60%;" />
</div>

<div style="display: flex; gap: 1rem;">
  <img src="/interweaver/vfx/temp/butterflies.gif" alt="Temp Butterflies"/>
</div>

<div style="display: flex; gap: 1rem;">
  <img src="/interweaver/vfx/temp/dash.gif" alt="Temp Dash"/>
</div>

<div style="display: flex; gap: 1rem;">
  <img src="/interweaver/vfx/temp/stag-smash.gif" alt="Stag Smash Temp" style="width: 60%;" />
  <img src="/interweaver/vfx/temp/stag-smash-ingame.gif" alt="Stag Smash In-Game Temp" style="width: 60%;" />
</div>

<div style="display: flex; gap: 1rem;">
  <img src="/interweaver/vfx/temp/lightbeam.gif" alt="Temp Light Beam"/>
</div>

[stag teleport effect]

[clouds]