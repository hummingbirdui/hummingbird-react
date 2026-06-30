"use client";

// Client boundary for Tabs. The library ships its components without a bundled
// "use client" directive, and Tabs holds a top-level `React.createContext`, so
// re-exporting through this "use client" module keeps it out of the server graph
// (mirrors components/accordion.tsx and components/dropdown.tsx).
export { Tabs, TabsList, TabsTrigger, TabsContent } from "@hummingbirdui/react";
