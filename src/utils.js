import gitmojis from "./gitmojis.js";

const BUTTONGROUP_ID = 'vbstudio-gitmoji-BtnGroup';

// Creates the parent element into which the prediction buttons will be added to.
export function createButtonGroup(commitSummaryInput) {
	let buttonGroup = document.getElementById(BUTTONGROUP_ID);
	if(!buttonGroup) {
		buttonGroup = document.createElement("div");
		buttonGroup.id = BUTTONGROUP_ID;
		const container = document.createElement('div');
		container.classList.add('BtnGroup', 'oj-flex-bar', 'oj-buttonset');
		buttonGroup.appendChild(container);
		commitSummaryInput
			.insertAdjacentElement("beforebegin", buttonGroup); // Insert the button group at the start of the group
	}

	if(window.getComputedStyle(buttonGroup.parentNode).display === 'flex') {
		buttonGroup.parentNode.style.flexWrap = 'wrap';
		buttonGroup.style.position = 'absolute';
	} else {
		buttonGroup.style.position = 'static';
	}

	return buttonGroup;
}

export function replaceCodes(commitSummaryInput) {
	const replacement = gitmojis.find(el =>
		commitSummaryInput.value.includes(el.code),
	);
	if (replacement) {
		commitSummaryInput.value = commitSummaryInput.value.replace(
			replacement.code,
			replacement.emoji + " ",
		);
	}
}

export function removeAllPredictions(buttonGroup) {
	buttonGroup.firstChild.textContent = '';
}

export function createButtons(commitSummaryInput, buttonGroup) {
	const commitMsg = commitSummaryInput.value.trim();

	let predictiveCount = 0;

	// Predictively create a button for each emoji
	gitmojis.every(el => {
		// All the Gitmoji descriptions include spaces somewhere; break the loop if the input doesn't include meaningful content.
		if (!commitMsg || commitMsg == "" || commitMsg == " ") return false;

		// Displaying every single match would not be good UX.
		if (predictiveCount > 5) return false;

		// Convert both to lowercase; it wouldn't make sense to not match "Fix" with "fix", for example.
		if (el.description.toLowerCase().includes(commitMsg.toLowerCase())) {
			const predictive = document.createElement("button");

			// Use the existing GitHub CSS classes for the button.
			predictive.classList.add(
				"oj-button-sm",
				"oj-button-icon-only",
				"BtnGroup-item",
				"ghmoji-predictive",
			);

			// Add the predicted emoji to the button
			predictive.innerHTML = el.emoji;

			// When the button is clicked, replace the input with the emoji, along with a space.
			predictive.onclick = event => {
				event.preventDefault();
				commitSummaryInput.value = el.emoji + " ";

				// Regain focus on the input so that the user can continue typing.
				commitSummaryInput.focus();

				// Remove the predictions, as the user has selected one.
				removeAllPredictions(buttonGroup);
			};

			// Add this button after the others.
			buttonGroup.firstChild.insertAdjacentElement("beforeend", predictive);

			// Increment the count to stop displaying too many predictions.
			predictiveCount++;
		}

		// Continue to the next array element.
		return true;
	});
}
