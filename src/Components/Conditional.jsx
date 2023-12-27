function Conditional({ condition, onTrue, onFalse }) {
  if (!onTrue) {
    return condition ? condition : onFalse;
  }
  if (!onFalse) {
    return condition ? onTrue : null;
  }
  if (!onFalse && !onTrue) {
    return condition ? condition : null;
  }
  return condition ? onTrue : onFalse;
}

export default Conditional;
