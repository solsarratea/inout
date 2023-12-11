// content.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "replace") {
    const findText = new RegExp(`(${request.find}|${request.replace})`, "gi");

    // Function to handle symmetric replacement
    function handleSymmetricReplacement(match) {
      const matchLowerCase = match.toLowerCase();
      const findLowerCase = request.find.toLowerCase();
      const replaceLowerCase = request.replace.toLowerCase();

      console.log("lookatme" + match);

      if (
        matchLowerCase.includes(findLowerCase) &&
        matchLowerCase.includes(replaceLowerCase)
      ) {
        // Handle case where match contains both request.find and request.replace
        return match.replace(new RegExp(findLowerCase, "gi"), request.replace);
      } else if (matchLowerCase === findLowerCase) {
        return request.replace;
      } else if (matchLowerCase === replaceLowerCase) {
        return request.find;
      }

      // If none of the above conditions match, return the original match
      return match;
    }

    document.querySelectorAll("*:not(script, style)").forEach((element) => {
      for (let node of element.childNodes) {
        if (node.nodeType === 3) {
          // Text node
          node.nodeValue = node.nodeValue.replace(
            findText,
            handleSymmetricReplacement
          );
        }
      }
    });
  }
});
