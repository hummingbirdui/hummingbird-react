"use client";

// Client boundary for the interactive form controls. The library ships its
// components without a bundled "use client" directive (it's framework-agnostic
// and tree-shakeable), so re-exporting the parts that use hooks/context through
// this "use client" module gives them a client boundary when composed into
// server-rendered MDX. Stateless controls (FormControl, Textarea, Select,
// Switch, InputGroup, …) don't need this and are imported straight from the
// package.
export { Checkbox } from "@hummingbirdui/react/checkbox";
export { Radio, RadioGroup } from "@hummingbirdui/react/radio";
