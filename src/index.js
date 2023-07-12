import { createButtonGroup, createButtons, replaceCodes } from "./utils.js";


// select the target node
var target = document.getElementsByTagName('body')[0];

// create an observer instance
var observer = new MutationObserver(function() {
	const commitSummaryInput = document.getElementById('summary|input') || document.getElementById('message-title|input');
	if(commitSummaryInput) {
		const buttonGroup = createButtonGroup(commitSummaryInput);
		commitSummaryInput.oninput = () => {
			// Remove the predictions from the last keystroke, ready for this one.
			buttonGroup.textContent = "";

			createButtons(commitSummaryInput, buttonGroup);

			// Replace Gitmoji codes with the corresponding emoji, for example :bug: becomes 🐛.
			replaceCodes(commitSummaryInput);
		};
	}
});

// configuration of the observer:
var config = { attributes: false, childList: true, subtree: false }

// pass in the target node, as well as the observer options
observer.observe(target, config);
