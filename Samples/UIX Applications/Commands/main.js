// NOTE! This code is for demonstration purposes only and does not contain any kind of
// 		 error handling. MUST be revised before using in production.
//		 Authored by: Craig Hawker / M-Files

"use strict";

function OnNewShellUI( shellUI )
{
	/// <summary>Executed by the UIX when a ShellUI module is started.</summary>
	/// <param name="shellUI" type="MFiles.ShellUI">The shell UI object which was created.</param>
 
	// This is the start point of a ShellUI module.
 
	// Register to be notified when a new shell frame (Event_NewShellFrame) is created.
	shellUI.Events.Register(
		Event_NewShellFrame,
		handleNewShellFrame );
}
 
function handleNewShellFrame(shellFrame)
{
	/// <summary>Handles the OnNewShellFrame event for an IShellUI.</summary>
	/// <param name="shellFrame" type="MFiles.ShellFrame">The shell frame object which was created.</param>
 
	// The shell frame was created but it cannot be used yet.
	// The following line would throw an exception ("The object cannot be accessed, because it is not ready."):
	// shellFrame.ShowMessage("A shell frame was created");
 
	// Register to be notified when the shell frame is started.
	// This time pass a reference to the function to call when the event is fired.
	shellFrame.Events.Register(
		Event_Started,
		getShellFrameStartedHandler(shellFrame));
}
 
function getShellFrameStartedHandler(shellFrame)
{
	/// <summary>Returns a function which handles the OnStarted event for an IShellFrame.</summary>
 
	// The shell frame is now started and can be used.
	// Note: we need to use the global-scope variable.

	return function() {

		// Create a command (button).  Note that it is not yet visible.
		// ref: https://www.m-files.com/UI_Extensibility_Framework/index.html#MFClientScript~ICommands~CreateCustomCommand.html
		var commandOneId = shellFrame.Commands.CreateCustomCommand( "My First Command" );

		// Create a command (button).  Note that it is not yet visible.
		// ref: https://www.m-files.com/UI_Extensibility_Framework/index.html#MFClientScript~ICommands~CreateCustomCommand.html
		var commandTwoId = shellFrame.Commands.CreateCustomCommand( "My Second Command" );

		// Hide the second command.
		// ref: https://www.m-files.com/UI_Extensibility_Framework/index.html#MFClientScript~ICommands~SetCommandState.html
		shellFrame.Commands.SetCommandState( commandTwoId, CommandLocation_All, CommandState_Hidden );

		// Set the icon for the command.
		shellFrame.Commands.SetIconFromPath( commandOneId, "icons/uparrow.ico" );

		// Add the first and second commands to the task area.
		// ref: https://www.m-files.com/UI_Extensibility_Framework/index.html#MFClientScript~ITaskPane~AddCustomCommandToGroup.html
		try {
			shellFrame.TaskPane.AddCustomCommandToGroup( commandOneId, TaskPaneGroup_Main, 1 );
			shellFrame.TaskPane.AddCustomCommandToGroup( commandTwoId, TaskPaneGroup_Main, 1 );
		}
		catch (e) {
			// This will except if the task pane is not ready (e.g. in a History view).
		}

		// Add the first and second commands to the context menu.
		// ref: https://www.m-files.com/UI_Extensibility_Framework/index.html#MFClientScript~ICommands~AddCustomCommandToMenu.html
		shellFrame.Commands.AddCustomCommandToMenu( commandOneId, MenuLocation_ContextMenu_Top, 1 );
		shellFrame.Commands.AddCustomCommandToMenu( commandTwoId, MenuLocation_ContextMenu_Top, 1 );

		// Register to be notified when a custom command is clicked.
		// Note: this will fire for ALL custom commands, so we need to filter out others.
		shellFrame.Commands.Events.Register(
			Event_CustomCommand,
			function(commandId) {
				// Branch depending on the Id of the command that was clicked.
				switch (commandId) {
					case commandOneId:
						// Our first command was clicked.
						shellFrame.Commands.SetCommandState(commandTwoId,
							CommandLocation_All,
							CommandState_Active);
						break;
					case commandTwoId:
						// Our second command was clicked.
						shellFrame.Commands.SetCommandState(commandTwoId,
							CommandLocation_All,
							CommandState_Inactive);
						break;
				}
			} );

	}

}
function handleFirstCommandClicked(shellFrame, commandOneId, commandTwoId)
{
	/// <summary>Handles the click of the first command.</summary>
	
	// Show the second command.
	
}
function handleSecondCommandClicked(shellFrame, commandOneId, commandTwoId)
{
	/// <summary>Handles the click of the first command.</summary>
	
	// Disable the second command.
	
}