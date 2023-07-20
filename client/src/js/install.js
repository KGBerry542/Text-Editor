let deferredPrompt;

const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  // Prevent the default behavior to delay the prompt
  event.preventDefault();

  // Store the event so that you can trigger the prompt later
  deferredPrompt = event;

  // Show a custom "Install" button or UI to the user
  butInstall.style.display = "block";
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
    if (deferredPrompt) {
        // Show the installation prompt
        deferredPrompt.prompt();
    
        // Wait for the user to respond to the prompt
        const choiceResult = await deferredPrompt.userChoice;
    
        // Log the user's choice (accepted or dismissed)
        console.log('User choice:', choiceResult.outcome);
    
        // Clear the deferredPrompt variable
        deferredPrompt = null;
    
        // Hide the custom "Install" button or UI
        butInstall.style.display = 'none';
      }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  console.log('App successfully installed!', event);
});
