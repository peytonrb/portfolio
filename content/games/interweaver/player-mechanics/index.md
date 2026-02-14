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

![Weave Ability Demonstration Temp](/images/weave-demo.gif)

### System Architecture
Weaving was managed through a **Weaveable Manager**, a **custom GameObject** for all Weaveable objects, and a **Controller** script on the Weaver, separating logic to keep the system modular, easy to iterate on, and debug.

I want to call out a few aspects of this system that presented notable technical and design challenges, and discuss how they were resolved.

**Input-To-World Space Mapping**

The core challenge wasn't just mapping the mouse to world space - it was ensuring that every interaction made sense in both the player's and the Weaver's perspectives in an isometric environment, and was consistent across input devices. I accomplished this using a combination of raycasting and precise physics handling to achieve smooth and intuitive movement, and also ensured interactions with the environment were visually and functionally consistent. This was made further complex because Interweaver supports seamless transitions between controller and keyboard inputs, which had different contextual behaviors. I implemented a system that allowed both input methods to switch seamlessly as players connected or disconnected controllers, ensuring the mechanics adapted properly and the gameplay experience remained uninterrupted.

```
WeaveWithMouse()
{
  // Find the main camera
  ...

  Ray ray = mainCamera.ScreenPointToRay(Input.mousePosition);

  // If this object is able to be Woven..
  if (Physics.Raycast(ray, out RaycastHit hit, 100f, layersToHit))
  {
    // Speed and position constraints
    rb.velocity = new Vector3(raycastHit.point.x - rb.position.x, transform.position.y - rb.position.y, raycastHit.point.z - rb.position.z);
    rb.constraints = RigidbodyConstraints.FreezeRotationX | RigidbodyConstraints.FreezeRotationY | RigidbodyConstraints.FreezeRotationZ;
  }

  RaycastHit hitData;
  if (Physics.Raycast(ray, out hitData, 1000))
  {
    float rayDistance = Vector3.Distance(gameObject.transform.position, hitData.point);
    
    // If the rayDistance is longer than maxDistance, all Woven objects are automatically dropped
    ...
    else
    {
      // Cache the last valid world-space target position
      worldPosition = hitData.point;
    }
  }
}
```
```
WeaveWithController(Vector2 lookDir)
{
  // Raycast starts from initial look direction of Main Character rather than mouse point
  float targetAngle = Mathf.Atan2(lookDir.x, lookDir.y) * Mathf.Rad2Deg + mainCamera.transform.eulerAngles.y;

  TargetObject.transform.rotation = Quaternion.Euler(0, targetAngle, 0);
  Vector3 rayDirection = TargetObject.transform.forward;

  // If look direction exists and object can be Woven
  rb.velocity = rayDirection * 6;

  // Freezes the Y position so that the combined objects won't drag it down because of gravity and it freezes in all rotation so it won't droop because of the gravity  from the objects
  rb.constraints = RigidbodyConstraints.FreezeRotationX | RigidbodyConstraints.FreezeRotationY | RigidbodyConstraints.FreezeRotationZ;
  ...
}
```
The snippets above demonstrate the differences in functionailty between the two input systems. Weaving from the mouse requires raycasting based on screen position, while the controller relies on calculating movement based on the character's facing direction and applying it in world space. Both needed to interact with the same physics system, feel consistent to the player, and intuitively adapt as players swapped input devices. 

<!-- **Rotating Objects in Isometric Space**

Weaving also allowed players to rotate one or multiple objects, but this presented a few unique problems because of our isometric perspective. We had to ensure that [rotating objects made sense to the player, but technically we were bound by the camera angle and the player character, which may be offset from what makes sense visually]. [this is what i did to compensate for this] -->

**Combining Weaveables and Snapping Points**

Another part of the system that presented a bit of a technical challenge was the ability for the Player to organically combine objects using the Weave ability. This feature allowed players to manipulate and rotate any cluster of Weaveable objects, so they could be used in puzzles and platforming challenges uniquely by each individual.

The challenge here was ensuring that objects connected both visually and geometrically, so clusters of objects could be moved into precise areas without awkward or inconsistent geometry. To address this, I created **snapping points**, which were points in space that could be manually or automatically applied to Weaveable objects. This made it easy for designers to work with as we continued to added puzzles and iterated on their complexity, even as we worked with organically shaped objects.

```
Snapping()
{
  ...

  // Nearest-neighbor resolution to ensure geometric correctness
  foreach (GameObject point in transformPoints)
  {
    foreach (GameObject otherPoint in weaveableScript.transformPoints)
    {
      float distance = Vector3.Distance(point.transform.position, otherPoint.transform.position);

      if (distance < nearestDistance)
      {
        nearestDistance = distance;
        myClosestPoint = point;
        otherClosestPoint = otherPoint;
      }
    }
  }

  // Determined Coroutine to trigger to move objects visually
  StartCoroutine(MoveToPoint(this, transform, WeaveableToReach));
}
```
```
IEnumerator MoveToPoint(Weaveable source, Weaveable target, Transform transform)
{
  ...
  float timeSinceStarted = 0f;
  while (true)
  {
    timeSinceStarted += Time.deltaTime;
    movingWeaveableRef.transform.position = Vector3.Lerp(movingWeaveableRef.transform.position, targetTransform.position, timeSinceStarted);

    if (Vector3.Distance(movingWeaveableRef.transform.position, targetTransform.position) < 1f)
    {
      movingWeaveableRef.rb.transform.position = targetTransform.position;

      if (!TryGetComponent<FixedJoint>(out FixedJoint fJ))
      {
        // Systematically combines the objects and calls any additional visualizations or logic
        WeaveTogether(otherWeaveable.gameObject);
      }
                    
      yield break;
    }

    yield return null;
  }
}
```
I tried to illustrate in the snippets above how combining Weaveables utilized nearest-neighbor resolution were resolved and applied at runtime to ensure the mechanic felt smooth and enjoyable to play. Rather than relying on mesh bounds, the system finds the closest authored or generated snapping point on both objects and snaps to the most geometrically appropriate connection, ensuring the object's rotation and movement remained visually coherent within the game space. This helps the player predict the outcome of their actions while also enabling them to create unique solutions to the game's challenges and approach gameplay in their own way.

Once valid snap point pairings were found, I used a set of Coroutines to smoothly interpolate objects into position before finalizing the connection visually and systematically. These different Coroutines prescribed different movement types that objects would take in space to attach to the Woven objects, rules that I ensured were deterministic and easily configuable. By separating this logic, it was easy to identify bugs both visually and systematically, and it also ensured the interactions felt natural and fun for the player. 