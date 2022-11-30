export const styleVarsForRoot = (...args) => {
  const varValues = args[0];
  const varNames = Object.keys(varValues);

  if (!varNames.length) return <></>;

  let styles = `:root{`;
  varNames.forEach((varName) => (styles += `${varName}:${varValues[varName]};`));
  styles += "}";

  return <style>{styles}</style>;
};
