import React from "react";
import MonacoEditor, { MonacoDiffEditor } from "../editor";
import { languageOptions, themeOptons } from "./constant";
import { examples, diffExamples } from "./example";
import "./style.less";

export interface BaseProps {
  [key: string]: unknown;
}

interface BaseState {
  theme: string;
  language: string;
  width: number;
  height: number;
}

export default class Demo extends React.PureComponent<BaseProps, BaseState> {
  constructor(props: BaseProps) {
    super(props);
    this.state = {
      theme: "vs",
      language: "javascript",
      width: 1000,
      height: 400,
    };
  }

  componentDidMount(): void {
    const langSelect = document.getElementById("lang") as HTMLSelectElement;
    langSelect.value = "javascript";
  }

  handleThemeChange = () => {
    const tSelect = document.getElementById("theme") as HTMLSelectElement;
    const t = tSelect.value;
    this.setState({ theme: t });
  };

  handleLanguageChange = () => {
    const lSelect = document.getElementById("lang") as HTMLSelectElement;
    const l = lSelect.value;
    this.setState({ language: l });
  };

  render() {
    const { theme, language, width, height } = this.state;
    return (
      <>
        <nav className="header">
          <span className="nav-item">
            <a href="/">Home</a>
          </span>
          <span>
            <a href="https://github.com/lyove/monaco-editor-react/blob/master/README.md">
              Documentation
            </a>
          </span>
          <span className="nav-item">
            <a href="https://github.com/lyove/monaco-editor-react">Github</a>
          </span>
        </nav>

        <div className="feature">
          <h1>Monaco-Editor-React</h1>
          <div className="desc">
            React component for MonacoEditor without needing to use webpack plugins
          </div>
        </div>

        <div className="base-editor">
          <h2>Base example</h2>
          <div className="label-box">
            <label>
              Language:
              <select id="lang" className="form-select" onChange={this.handleLanguageChange}>
                {languageOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Theme:
              <select id="theme" className="form-select" onChange={this.handleThemeChange}>
                {themeOptons.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <MonacoEditor
            // width={width}
            height={height}
            language={language}
            value={examples[language]}
            theme={theme}
            supportFullScreen={true}
            options={{
              fontSize: 13,
              fontFamily: 'Menlo, Monaco, "Courier New", monospace',
              minimap: {
                enabled: true,
              },
              automaticLayout: true,
              formatOnPaste: true,
              scrollbar: {
                useShadows: false,
                verticalScrollbarSize: 10,
                horizontalScrollbarSize: 10,
              },
            }}
            monacoWillMount={(monaco) => {
              console.log("monaco：", monaco);
            }}
            editorDidMount={(editor, monaco) => {
              console.log("editor：", editor);
            }}
            onChange={(value: string | null) => {
              console.log("editor value:===========================\n", value);
            }}
            // cdnConfig={{
            //   monacoPath: "https://g.alicdn.com/code/lib/monaco-editor/0.36.1/min/vs",
            // }}
          />
        </div>

        <div className="diff-editor">
          <h2>Diff example</h2>
          <MonacoDiffEditor
            // width={600}
            height={400}
            original={diffExamples.original}
            modified={diffExamples.modified}
            language="markdown"
            options={{
              scrollbar: {
                useShadows: false,
                verticalScrollbarSize: 10,
                horizontalScrollbarSize: 10,
              },
            }}
          />
        </div>
      </>
    );
  }
}