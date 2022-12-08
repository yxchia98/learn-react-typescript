import "./code-editor.css";
import { useRef } from "react";
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import codeShift from "jscodeshift";
import Highlighter from "monaco-jsx-highlighter";

interface CodeEditorProps {
    initialValue: string;
    onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
    const editorRef = useRef<any>();

    const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
        editorRef.current = monacoEditor;
        monacoEditor.onDidChangeModelContent(() => {
            onChange(getValue());
        });
        monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

        const highlighter = new Highlighter(
            // @ts-ignore
            window.monaco,
            codeShift,
            monacoEditor
        );

        highlighter.highLightOnDidChangeModelContent(
            () => {},
            () => {},
            undefined,
            () => {}
        );
    };

    const onFormatClick = () => {
        console.log(editorRef.current);
        // get current value from editor
        const unformatted = editorRef.current.getModel().getValue();

        // format value
        const formatted = prettier
            .format(unformatted, {
                parser: "babel",
                plugins: [parser],
                useTabs: false,
                semi: true,
                singleQuote: true,
            })
            .replace(/\n$/, "");

        // set formatted value back in editor
        editorRef.current.setValue(formatted);
    };

    return (
        <div className="editor-wrapper">
            <button
                className="button button-format is-primary is-small"
                onClick={onFormatClick}
            >
                Format
            </button>
            <MonacoEditor
                editorDidMount={onEditorDidMount}
                value={initialValue}
                height="250px"
                width="500px"
                language="javascript"
                theme="dark"
                options={{
                    wordWrap: "on",
                    minimap: { enabled: false },
                    showUnusued: false,
                    folding: false,
                    lineNumberMinChars: 3,
                    fontSize: 12,
                    scrollBeyondLastLane: false,
                    automaticLayout: true,
                }}
            />
        </div>
    );
};
export default CodeEditor;
