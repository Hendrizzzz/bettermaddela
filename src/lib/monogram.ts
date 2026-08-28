export function monogramInitials(name: string) {
  const tokens = name.split(/\s+/).filter((token) => !/^(JR|SR|II|III|IV)$/i.test(token));
  const first = tokens[0]?.charAt(0) ?? "?";
  const last =
    tokens.length > 1
      ? tokens[tokens.length - 1].charAt(0)
      : (tokens[0]?.charAt(1) ?? "");
  return `${first}${last}`;
}
