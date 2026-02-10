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

This custom Asset Editor shows a graph visualizing the Relationship Stages that can be progressed to from the Relationship Asset being viewed currently. I based it off of the Reference Viewer built into UE, and utilized custom **EdGraph** and **EdGraphNode** classes to build the progression Map. 

[Discuss using EdGraph and other details]

```
SRelationshipEditor::Construct(const FArguments& InArgs, TSharedPtr<FMidRelationshipEditorViewModel> InViewModel)
{
  RelationshipEditorViewModel = InViewModel;

  GraphObj = NewObject<UEdGraph_RelationshipEditor>();
	GraphObj->Schema = UMidRelationshipEditorSchema::StaticClass();
	GraphObj->AddToRoot();
	GraphObj->SetRelationshipEditor(StaticCastSharedRef<SMidRelationshipEditorWidget>(AsShared()));

	GraphObj->ConstructGraph(InViewModel);
	
	// Create the Graph Editor
	GraphEditorPtr = SNew(SGraphEditor)
		.GraphToEdit(GraphObj);
	
	ChildSlot
	[
		SNew(SOverlay)
		+ SOverlay::Slot()
		[
			GraphEditorPtr.ToSharedRef()
		]

		+ SOverlay::Slot()
		.VAlign(VAlign_Top)
		.HAlign(HAlign_Left)
		.Padding(FMargin(10))
		[
			SNew(SBorder)
			.BorderImage(FAppStyle::GetBrush("ToolPanel.GroupBorder"))
			[
				SAssignNew(ContextPanel, SMidRelationshipContextPanelWidget)
				.Visibility(this, &SMidRelationshipEditorWidget::GetContextPanelVisibility)
			]
		]
	];
}

UEdGraph_RelationshipEditor::ConstructGraph()
{
  // Use ViewModel information to determine which node is focused/should be centered
  UEdGraphNode_Relationship* CenterNode = SpawnNode(ViewModel, FVector2D(0.0f, 0.0f));

  ...

  // Create incoming and outgoing Nodes based on stored Relationship in ViewModel
  // ViewModel->GetFocusedRelationshipInfo()

  ...
  ViewModel->GraphEditor = this;

}

```


[Discuss view model + Slate method]. [why is this method strong]

**Create New Transition Tool**

I wanted it to be as easy for designers as possible to interact with and edit Relationships via the graph, so I also included tools within the editor to walk designers through setting up more complex Properties, like adding new Stages to progress to. 

<div style="display: flex; gap: 1rem;">
  <img src="/slate/TransitionTool.png" alt="Default Data Layer" style="width: 60%;" />
  <img src="/slate/TransitionTool2.png" alt="Watch Party Data Layer" style="width: 60%;" />
</div>

[talk about creating tool].

## Embedded Text Editor
Another complication I had to solve working on this project was managing the amount of asynchronous processes that occured both at runtime and, more importantly here, during editor-time. These non-latent functions occasionally allowed designers to close the editor while processes were still running, which led to crashes or unsaved changes. I created a custom Property for all Assets that used the problematic interface that informed designers when their data was still processing, overrode the default Unreal Asset save behavior, and included a button to manually trigger the asynchronous process. 

<div style="display: flex; gap: 1rem;">
  <img src="/slate/Embeddings_unsaved.png" alt="Embeddings Unsaved"/>
</div>

[discuss delayed save behavior]

<div style="display: flex; gap: 1rem;">
  <img src="/slate/Embeddings_saved.png" alt="Embeddings Saved"/>
</div>