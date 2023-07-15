import './index.css';
import { observe } from "selector-observer";
import { createButtonGroup, createButtons, removeAllPredictions, replaceCodes } from "./utils.js";

/* Detect when the input is added to the DOM. This is necessary because
the router GitHub uses is funky & quirky and does not use the browser's
native navigation. This means the load event is not fired for the navigation
methods that lead to the pages we are interested in injecting into. */
observe("#summary", {
	// Called when the element is detected to have been added to the DOM.
	add(container) {
		const commitSummaryInput = document.getElementById('summary|input');
		const buttonGroup = createButtonGroup(container);

		commitSummaryInput.oninput = () => {
			// Remove the predictions from the last keystroke, ready for this one.
			removeAllPredictions(buttonGroup);

			createButtons(commitSummaryInput, buttonGroup);

			// Replace Gitmoji codes with the corresponding emoji, for example :bug: becomes 🐛.
			replaceCodes(commitSummaryInput, buttonGroup);
		};
	},
});

observe("#message-title", {
	// Called when the element is detected to have been added to the DOM.
	add(container) {
		const commitSummaryInput = document.getElementById('message-title|input');
		const buttonGroup = createButtonGroup(container);

		commitSummaryInput.oninput = () => {
			// Remove the predictions from the last keystroke, ready for this one.
			removeAllPredictions(buttonGroup);

			createButtons(commitSummaryInput, buttonGroup);

			// Replace Gitmoji codes with the corresponding emoji, for example :bug: becomes 🐛.
			replaceCodes(commitSummaryInput, buttonGroup);
		};
	},
});
