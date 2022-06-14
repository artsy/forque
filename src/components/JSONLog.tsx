export const JSONLog: React.FC = ({ children }) => {
  return <pre>{JSON.stringify(children, null, 2)}</pre>
}
