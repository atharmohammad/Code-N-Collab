import { ColorAssigner } from "@convergence/color-assigner";
import * as MonacoCollabExt from "@convergencelabs/monaco-collab-ext";
import "@convergencelabs/monaco-collab-ext/css/monaco-collab-ext.min.css";
class MonacoConvergenceAdapter {
  constructor(monacoEditor, realtimeString) {
    this._editor = monacoEditor;
    this._model = realtimeString;
    this._colorAssigner = ColorAssigner.Palettes.DEFAULT;
    this._randomNumber = Math.floor(Math.random() * 4);
  }

  bind() {
    this.shareData(); // to initialise the data shared
    this.shareRemoteCursor(); // to initialise the cursor position of both local and remote cursor
    this.shareSelection(); //to initialise the both remote and local selection
  }

  //////// Binding functions /////////
  shareData() {
    this._editor.setValue(this._model.value()); //set the inital model value for every one who joins the room
    this.contentManager = new MonacoCollabExt.EditorContentManager({
      editor: this._editor,
      onInsert: (index, text) => {
        this._model.insert(index, text); //insert text at given index
      },
      onReplace: (index, length, text) => {
        this._model.model().startBatch(); //to perform collection of operation startBatch
        this._model.remove(index, length); //remove
        this._model.insert(index, text); //insert
        this._model.model().completeBatch(); //call at end of batch operations
      },
      onDelete: (index, length) => {
        //delete text at given index
        this._model.remove(index, length);
      },
      remoteSourceId: "convergence",
    });

    this._model.events().subscribe((e) => {
      //subscribe event of models emitted
      switch (e.name) {
        case "insert": {
          this.contentManager.insert(e.index, e.value);
          break;
        }
        case "remove": {
          this.contentManager.delete(e.index, e.value.length);
          break;
        }
        case "replace": {
          this.contentManager.replace(e.index, e.value.length, e.value);
          break;
        }
        default:
          console.log("default event", e);
      }
    });
  }
  shareRemoteCursor() {
    this.remoteCursorManager = new MonacoCollabExt.RemoteCursorManager({
      editor: this._editor,
      tooltips: true,
      tooltipDuration: 2,
    });
    this.cursorReference = this._model.indexReference("cursor"); //sets the reference of local cursor
    const references = this._model.references({ key: "cursor" }); //gives references of every cursor in connection to this model
    references.forEach((reference) => {
      if (!reference.isLocal()) {
        this.addRemoteCursor(reference); //to add remote cursor position in the editor
      }
    });
    this.setLocalCursor(); //to set position of local cursor in the editor
    this.cursorReference.share(); //to share the reference of our local cursor to everybody in the connection

    this._editor.onDidChangeCursorPosition((e) => {
      //listen to event emitted when loacl cursor changes the position
      this.setLocalCursor();
    });

    this._model.on("reference", (e) => {
      if (e.reference.key() === "cursor") {
        this.addRemoteCursor(e.reference);
      }
    });
  }
  shareSelection() {
    this.remoteSelectionManager = new MonacoCollabExt.RemoteSelectionManager({
      editor: this._editor,
    });
    this.selectionReference = this._model.rangeReference("selection"); //bound a loaclrangereference to this object and local and remote changes updates automatically
    this.setLocalSelection();
    this.selectionReference.share(); //share the local selection with all other connections

    this._editor.onDidChangeCursorSelection((e) => {
      //listen to event emitted when selection change
      this.setLocalSelection();
    });
    const references = this._model.references({ key: "selection" }); //return array of reference of selection of connections
    references.forEach((reference) => {
      if (!reference.isLocal()) {
        this.addRemoteSelection(reference); //add selection for remote connection
      }
    });

    this._model.on("reference", (e) => {
      //reference event is fired when a new reference is created , so we listen and add the  selection for it if exist
      if (e.reference.key() === "selection") {
        this.addRemoteSelection(e.reference);
      }
    });
  }

  /////////// Helper function for Selection Binding ///////////////
  setLocalSelection() {
    const selection = this._editor.getSelection(); //gives selection of local Editor
    if (!selection.isEmpty()) {
      const start = this._editor
        .getModel()
        .getOffsetAt(selection.getStartPosition());
      const end = this._editor
        .getModel()
        .getOffsetAt(selection.getEndPosition());
      this.selectionReference.set({ start, end });
    } else if (this.selectionReference.isSet()) {
      //if Selection is already set in  editor
      this.selectionReference.clear(); //since selection is already set so we clear it on again selection
    }
  }
  addRemoteSelection(reference) {
    const color = this._colorAssigner[this._randomNumber];
    const remoteSelection = this.remoteSelectionManager.addSelection(
      reference.sessionId(),
      color
    );

    if (reference.isSet()) {
      const selection = reference.value();
      remoteSelection.setOffsets(selection.start, selection.end);
    }
    reference.on("cleared", () => remoteSelection.hide());
    reference.on("disposed", () => remoteSelection.dispose());
    reference.on("set", () => {
      const selection = reference.value();
      remoteSelection.setOffsets(selection.start, selection.end);
    });
  }

  //////////////// Helper functions for Cursor Binding //////////////
  setLocalCursor() {
    const position = this._editor.getPosition();
    const offset = this._editor.getModel().getOffsetAt(position);
    this.cursorReference.set(offset);
  }
  addRemoteCursor(reference) {
    const color = this._colorAssigner[this._randomNumber];
    const remoteCursor = this.remoteCursorManager.addCursor(
      reference.sessionId(),
      color,
      reference.user().displayName
    );
    reference.on("cleared", () => remoteCursor.hide()); //when remote cursor is cleared
    reference.on("disposed", () => remoteCursor.dispose()); //when remote cursor is disposed
    reference.on("set", () => {
      //when remote cursor is set
      const cursorIndex = reference.value();
      remoteCursor.setOffset(cursorIndex);
    });
  }
}
export default MonacoConvergenceAdapter;
