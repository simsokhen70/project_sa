import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const LogViewer = ({ logs }) => {
  const logString = logs.join('\n');

  return (
    <div className="logs-container">
      <h2>Build Logs</h2>
      <SyntaxHighlighter language="bash" style={materialDark}>
        {logString}
      </SyntaxHighlighter>
    </div>
  );
};

export default LogViewer;
