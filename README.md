# setarco

This is a userscript that randomly inserts (or interjects) an additional instruction in a prompt on ChatGPT conversations (matching `https://chat.openai.com/*`). Setarco lets users **set engagement to automate randomizing custom orders**. The additional instructions are written to encourage questions from that LLM-system that are generative, though provoking, revealing, surprising, and perhaps even challenging.

## Warning

This has gone through minimal testing (for the code and for the benefit/harmlessness of the prompt interjection). This is shared largely as a speculative design.

There is currently no feedback mechanism (or logging) outside of GitHub issues.

## Installation

This only works in desktop browsers. It is not designed to work in the mobile app or mobile browsers.

I use [the Tampermonkey extension](https://www.tampermonkey.net/).

## Usage

- There is a toggle that starts in the on position. It appears in the lower left screen. The icon is an upside down owl.
- Interjections are currently only provided for prompts that are submitted via Cmd+Enter (you can edit this at `e.key === 'Enter' && e.metaKey`)
    - So you can effectively smoothly bypass by clicking the submission button, or (when permitted) pressing Enter alone.
- Interjections are silently added and then removed (removal may be buggy!). You can see activity in the console log.
    - To access the console log, press Command+Option+J (Mac) or Control+Shift+J (Windows, Linux, Chrome OS)).
- Users can adapt the set of possible instructions by editing the contents of `customOrders` or the code under "Additional questions"
- Users can adapt the frequency of interjections by editing `frequencyFactor` (a percentage between 1 and 100; randomly applied after keydown event)


## Default Questions

There are three types of default questions. They are compiled and one is randomly selected.

### customOrders

This is the initial list:

- "It's helpful to ask me questions, not just provide advice."
    - source [Michael Nielsen](https://twitter.com/michael_nielsen/status/1699531826233249970)
- "With Paulo Freire's pedagogy in mind, what question could encourage critical reflection? Note: DO NOT mention Paulo Freire's name. Do not simply respond with a question in quotation marks. Include the spirit of the question within your planned response."
- "Engage me with a Socratic-styled probing question."
- "Channel the spirit of an annoying but lovable consultant; what critical question would you ask?"
- "What's a deep, reflective question you can ask on this topic?"
- "Imagine you're a wise mentor; which question would you pose to draw out deeper insights?"
- "In the spirit of hypothetical scenarios, which question could widen my perspective?"
- "What question might challenge prevalent assumptions about this?"
- "Pose a query as a loving and probing teacher might, aiming for understanding."
- "With genuine curiosity, what would you inquire about my viewpoint?"

### actorListInterjection

A broad `actorList` is provided. Names are randomly selected from it and then combined with this prompt:

```
    const actorListInterjection = `Pretend that ${selectedActors.slice(0, -1).join(', ')} and ${selectedActors.slice(-1)} work together with you to develop an approach to responding
    to this in a way that is generative, though provoking, revealing, surprising, and perhaps even challenging. What is that question?
    DO NOT EXPLAIN THE QUESTION OR MENTION THE NAMES OF THE PEOPLE. Just respond normally. Instead, simply incorporate the approach developed into the flow of your response.`;
```

### assumptionsPrompt

Adapted (slightly) from https://smith.langchain.com/hub/smithing-gold/assumption-checker

## Motivation

This script is loosely inspired by [a Michael Nielsen tweet](https://twitter.com/michael_nielsen/status/1703095654787231996):

> A really annoying LLM named Socrates that never answers your questions, just reflects them back to you, and asks what you think

- HT: [withheld at the moment]

Setarco is the string "Socrates" reversed, without the final S.

### Related

A variety of chatbots are aimed at this sort of task (at least in part). See, for example: [bloombot.ai](https://bloombot.ai/). 

Notably: [Character.ai][https://beta.character.ai/] returns 100 characters named Socrates in a search for that name.