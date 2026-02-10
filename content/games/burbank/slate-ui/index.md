---
title: "Slate Tooling"
showDate: false
weight: 5
params:
   displayDescription: "Expedited design and iteration time by writing supporting tools and custom Editors for gameplay systems in Slate."
---

## Overview
Due to our small team size and rapid iteration time, it was imperative we spent the least amount of time creating and organizing Assets in mass as we were building our Levels. To support this, I integrated creating gameplay systems with Slate tools and editors as part of my regular workflow to expedite the process of asset creation and setup. This was exemplified throughout the project but I will highlight bigger editors and tools below.

## Relationship Editor
One of the most utilized editors I created for Project Burbank is the Relationship Editor and related tools. The need for this editor arose when we were building out the Relationship Map, and it became hard to keep track of how the various Relationships were able to progress. We needed a way for our designers to visualize how each Stage of the Relationship Map was able to evolve and easily compare the effects and constraints of them all. 

<div style="display: flex; gap: 1rem;">
  <img src="/slate/RelationshipEditor.png" alt="Relationship Editor"/>
</div>

This graph shows _____. I based it off of the Reference Viewer built into UE, and utilized _____. 

```
EdGraph
EdGraph_Node
CreateGraph() snippet
```

[Discuss view model/widgets method and why it is strong]

### Tools
<div style="display: flex; gap: 1rem;">
  <img src="/slate/TransitionTool.png" alt="Relationship Editor"/>
</div>

## Embedded Text Editor
Another complication I had to solve working on this project was managing the amount of asynchronous processes that occured both at runtime and, more importantly here, during editor-time. These non-latent functions occasionally allowed designers to close the editor while processes were still running, which led to crashes or unsaved changes. I created a custom Property for all Assets that used the problematic interface that informed designers when their data was still processing, overrode the default Unreal Asset save behavior, and included a button to manually trigger the asynchronous process. 

<div style="display: flex; gap: 1rem;">
  <img src="/slate/Embeddings_unsaved.png" alt="Embeddings Unsaved"/>
</div>

[discuss delayed save behavior]

<div style="display: flex; gap: 1rem;">
  <img src="/slate/Embeddings_saved.png" alt="Embeddings Saved"/>
</div>