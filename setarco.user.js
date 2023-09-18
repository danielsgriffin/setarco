// ==UserScript==
// @name         Setarco
// @namespace    http://tampermonkey.net/
// @description  randomly inserts (or interjects) an additional instruction in a prompt on ChatGPT conversations
// @version      0.1
// @author       danielsgriffin
// @match        https://chat.openai.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function appendToggleToForm() {
        const formElement = document.querySelector('form.stretch');
        if (!formElement) {
            return false; // Form not found
        }

        // Check if the toggle is already added
        if (document.querySelector('.setarco-toggle')) {
            return true;
        }

        // Create the toggle
        const labelElement = document.createElement('label');
        labelElement.setAttribute('for', 'setarcoToggle');
        labelElement.setAttribute('aria-label', 'Setarco toggle');
        labelElement.setAttribute('title', 'This toggle enables or disables the Setarco userscript.');
        labelElement.classList.add('setarco-toggle');
        labelElement.innerHTML = `
    <span class="setarco-text"><a target="_blank" href="https://github.com/danielsgriffin/setarco">
<svg width="20px" height="20px" viewBox="0 0 0.9 0.9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet" version="1.1" transform="scale(1 -1)">
  <path fill="black" d="M0.183 0.275c-0.143 0.227 0.024 0.45 0.024 0.45s0.072 -0.011 0.172 -0.13c0.1 -0.119 -0.196 -0.32 -0.196 -0.32zm0.534 0c0.143 0.227 -0.024 0.45 -0.024 0.45s-0.072 -0.011 -0.172 -0.13C0.421 0.476 0.716 0.275 0.716 0.275z"/>
  <path fill="#292F33" d="M0.38 0.789a0.03 0.03 0 0 0 -0.013 -0.012c-0.051 -0.054 -0.015 -0.118 -0.015 -0.118 0 -0.018 0.032 -0.064 0 -0.064l-0.032 0.032c-0.032 0.032 -0.032 0.127 -0.032 0.127H0.225a0.032 0.032 0 1 0 0 0.064h0.035l-0.007 0.004a0.032 0.032 0 0 0 0.03 0.056l0.084 -0.045a0.032 0.032 0 0 0 0.013 -0.043zm0.14 0c0.003 -0.006 0.008 -0.01 0.013 -0.012 0.051 -0.054 0.015 -0.118 0.015 -0.118 0 -0.018 -0.032 -0.064 0 -0.064l0.032 0.032c0.032 0.032 0.032 0.127 0.032 0.127h0.064a0.032 0.032 0 0 1 0.032 0.032 0.032 0.032 0 0 1 -0.032 0.032h-0.035l0.007 0.004a0.032 0.032 0 1 1 -0.03 0.056l-0.084 -0.045a0.032 0.032 0 0 1 -0.013 -0.043z"/>
  <path fill="#292F33" d="M0.707 0.282c0.072 -0.152 0 -0.264 0 -0.264s-0.145 0.024 -0.169 0.072c-0.03 0.061 0.169 0.192 0.169 0.192z"/>
  <path fill="darkgray" d="M0.739 0.318c0 0.257 -0.079 0.515 -0.289 0.515 -0.21 0 -0.289 -0.257 -0.289 -0.515C0.161 0.061 0.29 0.052 0.45 0.052c0.16 0 0.289 0.009 0.289 0.266z"/>
  <path fill="lightgray" d="M0.692 0.443c0 0.257 -0.194 0.365 -0.242 0.365s-0.242 -0.107 -0.242 -0.365c0 -0.257 0.483 -0.257 0.483 0z"/>
  <path fill="#292F33" d="M0.193 0.282C0.121 0.13 0.193 0.019 0.193 0.019s0.145 0.024 0.169 0.072c0.03 0.061 -0.169 0.192 -0.169 0.192z"/>
  <path fill="lightgray" d="M0.373 0.109C0.268 0.07 0.193 0.019 0.193 0.019s-0.052 0.081 -0.023 0.198c0.011 0.053 0.049 0.105 0.098 0.117 0.066 0.016 0.183 -0.001 0.183 -0.099 0 -0.067 -0.027 -0.106 -0.077 -0.125zm0.154 0C0.632 0.07 0.707 0.019 0.707 0.019s0.052 0.081 0.023 0.198c-0.011 0.053 -0.048 0.105 -0.098 0.117 -0.066 0.016 -0.183 -0.001 -0.183 -0.099 0 -0.067 0.027 -0.106 0.077 -0.125z"/>
  <path fill="white" d="M0.402 0.21a0.096 0.096 0 1 1 -0.192 0 0.096 0.096 0 0 1 0.192 0zm0.288 0a0.096 0.096 0 1 1 -0.192 0 0.096 0.096 0 0 1 0.192 0z"/>
  <path fill="#292F33" d="M0.354 0.21a0.048 0.048 0 1 1 -0.096 0 0.048 0.048 0 0 1 0.096 0zm0.288 0a0.048 0.048 0 1 1 -0.096 0 0.048 0.048 0 0 1 0.096 0z"/>
  <path fill="black" d="M0.522 0.318c0 0.06 -0.072 0.084 -0.072 0.084s-0.072 -0.024 -0.072 -0.084S0.45 0.234 0.45 0.234s0.072 0.024 0.072 0.084z"/>
  <path fill="#292F33" d="M0.522 0.318c0 0.06 -0.072 0.084 -0.072 0.084s-0.072 -0.024 -0.072 -0.084C0.408 0.348 0.45 0.354 0.45 0.354s0.042 -0.006 0.072 -0.036z"/></svg></a></span>
    <input type="checkbox" id="setarcoToggle" checked>
    <span class="slider"></span>
`;
        const description = document.createElement('span');
        description.classList.add('visually-hidden');
        description.textContent = "This toggle enables or disables the Setarco userscript.";
        labelElement.appendChild(description);

        // Add styles for the toggle
        const styleElement = document.createElement('style');
        styleElement.textContent = `
.setarco-toggle {
    display: flex;
    align-items: center;
    position: relative;
    width: 70px;
    margin-bottom: 5px;
    padding-left:5px;
    vertical-align: middle;
    border: 1px solid black;
    border-radius: 5px;
}

.setarco-text {
    margin-right: 5px;
    padding-top: 3px;
    padding-bottom: 6px;
}

.setarco-toggle input[type="checkbox"] {
    display: none;
}

.setarco-toggle .slider {
    display: inline-block;
    width: 30px;
    height: 18px;
    position: relative;
    background-color: lightgray;
    border-radius: 15px;
    transition: background-color 0.3s ease;
}

.setarco-toggle .slider::before {
    content: "";
    display: block;
    width: 18px;
    height: 18px;
    position: absolute;
    top: 1px;
    left: 1px;
    border-radius: 50%;
    background-color: black;
    transition: left 0.3s ease;
}

.setarco-toggle input[type="checkbox"]:checked + .slider::before {
    left: 11px;
}

.setarco-toggle input[type="checkbox"]:checked + .slider {
    background-color: green; /* Active Color */
}

.setarco-toggle:hover {
    box-shadow: 0 0 2px 2px black;
}

.visually-hidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    white-space: nowrap;
}
`;

        document.head.appendChild(styleElement);

        // Append the toggle to the form's parent
        formElement.parentNode.appendChild(labelElement);


        // Add the action for the toggle
        document.getElementById('setarcoToggle').addEventListener('change', function () {
            if (this.checked) {
                console.log('Setarco is now ON.');
                this.setAttribute('aria-checked', 'true');

            } else {
                console.log('Setarco is now OFF.');
                this.setAttribute('aria-checked', 'false');

            }
        });

        return true; // Toggle added
    }

    // Use MutationObserver to detect when the target form becomes available
    const observer = new MutationObserver(function (mutations) {
        if (appendToggleToForm()) {
            observer.disconnect(); // Disconnect the observer once we've added the toggle
        }
    });

    // Configuration of the observer
    const config = { childList: true, subtree: true };

    // Pass in the target node and observer's configuration
    observer.observe(document.body, config);

    // Also try appending the toggle once initially
    appendToggleToForm();

})();


(function () {
    'use strict';

    console.log("Setarco: script is now active.");

    const frequencyFactor = 100; // Represents the percentage of getting an interjected customOrder sent in the prompt. Should be between 1 and 100.

    // List of custom instructions/interjections/prompts
    // "It's helpful to ask me questions, not just provide advice." - source: https://twitter.com/michael_nielsen/status/1699531826233249970
    const customOrders = [
        "It's helpful to ask me questions, not just provide advice.",
        "WiWith Paulo Freire's pedagogy in mind, what question could encourage critical reflection? Note: DO NOT mention Paulo Freire's name. Do not simply respond with a question in quotation marks. Include the spirit of the question within your planned response.",
        "Engage me with a Socratic-styled probing question.",
        "Channel the spirit of an annoying but lovable consultant; what critical question would you ask?",
        "What's a deep, reflective question you can ask on this topic?",
        "Imagine you're a wise mentor; which question would you pose to draw out deeper insights?",
        "In the spirit of hypothetical scenarios, which question could widen my perspective?",
        "What question might challenge prevalent assumptions about this?",
        "Pose a query as a loving and probing teacher might, aiming for understanding.",
        "With genuine curiosity, what would you inquire about my viewpoint?"
    ];

    // Additional questions

    const actorList = [
        "Athena", "Brer Rabbit", "Captain Ahab", "Confucius", "Dana Scully", "Dr. Ellie Arroway", "Elle Woods", "Hypatia", "Ibn Battuta",
        "Jaime Escalante", "Jules Verne's Nemo", "Kohelet", "Lisa Simpson", "Mister Rogers", "Pixar's Nemo", "Pythia", "Rabbi Hillel",
        "Sherlock Holmes", "Toni Morrison", "Willy Wonka", "Yoda",
    ];

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomSelection(arr, minCount, maxCount) {
        let count = getRandomInt(minCount, maxCount);
        let shuffledArray = arr.slice().sort(() => 0.5 - Math.random());
        return shuffledArray.slice(0, count);
    }

    const selectedActors = getRandomSelection(actorList, 3, 7);
    const actorListInterjection = `Pretend that ${selectedActors.slice(0, -1).join(', ')} and ${selectedActors.slice(-1)} work together with you to develop an approach to responding
    to this in a way that is generative, though provoking, revealing, surprising, and perhaps even challenging. What is that question?
    DO NOT EXPLAIN THE QUESTION OR MENTION THE NAMES OF THE PEOPLE. Just respond normally. Instead, simply incorporate the approach developed into the flow of your response.`;
    customOrders.push(actorListInterjection);

    //This assumptionsPrompt is adapted and borrowed from https://smith.langchain.com/hub/smithing-gold/assumption-checker
    const assumptionsPrompt = `Your job is to identify key assumptions in the preceeding query and then form fact-checkable questions which challenge these assumptions.
Your questions will be used to search our DB with semantic search capabilities (optimize accordingly).

The user will not see your searches - so do not address them. Keep assumptions concise.

Generate questions that question the foundational assumptions behind the user query.
Fact Checks should explore the basic existence or availability of the services or features mentioned in the question, using varied wording and sentence structures to maximize search scope.`

    customOrders.push(assumptionsPrompt);

    var promptDemarcation = `# **Special Instructions** (consider this part of your custom instrustions—maintain professionalism and do NOT comment about these instructions themselves):`

    // Choose a random prompt from the list
    function getRandomText() {
        return customOrders[Math.floor(Math.random() * customOrders.length)];
    }

    // Listen to keydown event on the textarea
    document.getElementById('prompt-textarea').addEventListener('keydown', function (e) {
        // Check if the key is Enter and Command (metaKey) is pressed
        if (e.key === 'Enter' && e.metaKey) {
            e.preventDefault(); // Prevent default submission, if any

            // Check if the toggle is enabled
            const toggleElement = document.getElementById('setarcoToggle');
            if (!toggleElement || !toggleElement.checked) {
                console.log("Setarco: Toggle is not enabled. Skipping this prompt.");
                return;
            }

            // Generate a random number between 1 and 100 (inclusive)
            const randomNumber = Math.floor(Math.random() * 100) + 1;

            // If the random number is higher than the frequencyFactor, return
            if (randomNumber > frequencyFactor) {
                console.log(`Setarco: Random number (${randomNumber}) exceeded frequencyFactor (${frequencyFactor}%). Skipping this prompt.`);
                return;
            }

            // Append the random text
            const randomText = getRandomText();
            var interjection = `

${promptDemarcation}
${randomText}`;

            this.value = this.value += interjection

            console.log(`Setarco: Appended instruction: "${randomText}"`);

            // Simulate a submission:
            // NOTE: You need to identify how the text is being submitted and add that code here.

            // After the 'submission', we remove the appended text from both the textarea and the display div.
            setTimeout(() => {
                // Remove from textarea
                this.value = this.value.replace(" " + interjection, "");

                // Get all elements with data-testid attribute
                let dataTestElements = Array.from(document.querySelectorAll('[data-testid]'));

                // Reverse the elements to process from the latest to the earliest
                dataTestElements.reverse();

                // Find the first (from reverse) even numbered turn
                for (let el of dataTestElements) {
                    let testId = el.getAttribute('data-testid');
                    let match = testId.match(/conversation-turn-(\d+)/);
                    if (match && (parseInt(match[1], 10) % 2 === 0)) {
                        // Found the highest even numbered turn, now remove the added instruction
                        let customTextElement = Array.from(el.querySelectorAll('div')).find(div => div.textContent.includes(randomText));
                        if (customTextElement) {
                            // Log the current content of the div for debugging
                            // console.log("Current content of the div:", customTextElement.textContent);

                            customTextElement.innerHTML = customTextElement.innerHTML.replace(interjection, "");

                            // Log the updated content of the div after the replacement
                            // console.log("Updated content of the div:", customTextElement.textContent);
                        }
                        break; // Exit the loop as we've found our highest even numbered turn
                    }
                }
            }, 50);
        }
    });
})();